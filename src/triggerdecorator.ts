import {
  window,
  workspace,
  DecorationOptions,
  TextDocument,
  TextEditor,
  CancellationToken,
  CancellationTokenSource,
  ExtensionContext,
  TextEditorDecorationType,
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { Symbol, SymbolResponse } from "./common/protocol";
import {
  ICssTriggerRenderData,
  ICssTriggerRenderPhaseData,
} from "./server/csstriggers";

interface PendingScan {
  token: CancellationTokenSource;
}
interface HoverMetadata {
  engines: string[];
  path: string;
  explanation: string;
  titleAndCaption: string;
}
export function activateColorDecorations(
  decoratorProvider: (
    document: TextDocument,
    visibleLines: number[],
    token: CancellationToken
  ) => Promise<SymbolResponse>,
  context: ExtensionContext,
  client: LanguageClient
) {
  const compositeImagePath = context.asAbsolutePath(
    "images/composite_wide.svg"
  );
  const compositeAndPaintImagePath = context.asAbsolutePath(
    "images/composite_paint_wide.svg"
  );
  const compositePaintAndLayoutImagePath = context.asAbsolutePath(
    "images/composite_paint_layout_wide.svg"
  );
  const compositeImagePathSmall = context.asAbsolutePath(
    "images/composite.svg"
  );
  const compositeAndPaintImagePathSmall = context.asAbsolutePath(
    "images/paint.svg"
  );
  const compositePaintAndLayoutImagePathSmall = context.asAbsolutePath(
    "images/layout.svg"
  );
  const validEngines = ["blink", "gecko", "webkit", "edgehtml"];
  const hoveronly = window.createTextEditorDecorationType({});
  const composite = window.createTextEditorDecorationType({
    gutterIconPath: compositeImagePathSmall,
  });
  const compositeAndPaint = window.createTextEditorDecorationType({
    gutterIconPath: compositeAndPaintImagePathSmall,
  });
  const compositePaintAndLayout = window.createTextEditorDecorationType({
    gutterIconPath: compositePaintAndLayoutImagePathSmall,
  });

  context.subscriptions.push(composite);
  context.subscriptions.push(compositeAndPaint);
  context.subscriptions.push(compositePaintAndLayout);

  const compositeInline = window.createTextEditorDecorationType({
    before: {
      contentIconPath: compositeImagePathSmall,
    },
  });
  const compositeAndPaintInline = window.createTextEditorDecorationType({
    before: {
      contentIconPath: compositeAndPaintImagePathSmall,
    },
  });
  const compositePaintAndLayoutInline = window.createTextEditorDecorationType({
    before: {
      contentIconPath: compositePaintAndLayoutImagePathSmall,
    },
  });

  context.subscriptions.push(compositeInline);
  context.subscriptions.push(compositeAndPaintInline);
  context.subscriptions.push(compositePaintAndLayoutInline);

  context.subscriptions.push(
    workspace.onDidChangeTextDocument((e) => {
      if (e) {
        throttledScan(e.document);
      }
    })
  );
  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((e) => {
      if (e) {
        throttledScan(e.document);
      }
    })
  );
  context.subscriptions.push(
    workspace.onDidChangeWorkspaceFolders(() => {
      refreshAllVisibleEditors();
    })
  );
  context.subscriptions.push(
    window.onDidChangeTextEditorVisibleRanges((event) => {
      if (event && event.textEditor && event.textEditor.document) {
        const document = event.textEditor.document;
        throttledScan(document, 50);
      }
    })
  );
  context.subscriptions.push(
    workspace.onDidOpenTextDocument((e) => {
      if (e) {
        throttledScan(e);
      }
    })
  );

  let pendingScans: { [uri: string]: PendingScan } = {};

  let throttleIds = {};
  let throttledScan = (document: TextDocument, timeout: number = 500) => {
    if (document && document.uri) {
      const lookupKey = document.uri.toString();
      if (throttleIds[lookupKey]) clearTimeout(throttleIds[lookupKey]);
      throttleIds[lookupKey] = setTimeout(() => {
        scan(document);
        delete throttleIds[lookupKey];
      }, timeout);
    }
  };

  const refreshAllVisibleEditors = () => {
    window.visibleTextEditors
      .map((p) => p.document)
      .filter((p) => p != null)
      .forEach((doc) => throttledScan(doc));
  };

  function getPendingScan(document: TextDocument): PendingScan {
    const pendingScan = pendingScans[document.uri.toString()] || {
      token: new CancellationTokenSource(),
    };
    pendingScan[document.uri.toString()] = pendingScan;
    return pendingScan;
  }

  function scan(document: TextDocument) {
    if (document.uri.scheme == "git") {
      return;
    }

    const editors = findEditorsForDocument(document);
    if (editors.length > 0) {
      const visibleLines = [];
      for (const editor of editors) {
        for (const range of editor.visibleRanges) {
          let lineIndex = range.start.line;
          while (lineIndex <= range.end.line) {
            visibleLines.push(lineIndex);
            lineIndex++;
          }
        }
      }

      let isDecorationEnabled =
        workspace
          .getConfiguration("csstriggers")
          .get<boolean>("showDecoration", true) == true;
      let isDecorationInline =
        workspace
          .getConfiguration("csstriggers")
          .get<boolean>("showDecorationInline", false) == true;

      const scanResult = getPendingScan(document);
      scanResult.token.cancel();
      scanResult.token = new CancellationTokenSource();
      decoratorProvider(document, visibleLines, scanResult.token.token).then(
        (symbolResponse) => {
          type kind = "composite" | "paint" | "layout";
          var mapper: (symbol: Symbol) => DecorationOptions = (
            symbol: Symbol
          ) => {
            var range = client.protocol2CodeConverter.asRange(symbol.range);

            const getHoverData = (data: ICssTriggerRenderPhaseData) => {
              let hoverData: Array<HoverMetadata> = [];
              let buckets = {
                composite: [],
                paint: [],
                layout: [],
              };
              for (const engine in data) {
                const phaseData = data[engine];
                const type: kind = isComposite(phaseData)
                  ? "composite"
                  : isCompositeAndPaint(phaseData)
                  ? "paint"
                  : "layout";
                buckets[type].push(engine);
              }
              for (const type in buckets) {
                if (["composite", "layout", "paint"].indexOf(type) == -1)
                  continue;

                let path: string;
                let explanation: string;
                let titleAndCaption: string = type;

                switch (type) {
                  case "composite": {
                    path = compositeImagePath;
                    explanation = "Will result only in `compositing`.";
                    break;
                  }
                  case "paint": {
                    path = compositeAndPaintImagePath;
                    explanation =
                      "The affected element will be `painted` and `composited`.";
                    break;
                  }
                  case "layout": {
                    path = compositePaintAndLayoutImagePath;
                    explanation =
                      "Any affected areas will need to be `layouted`, and the" +
                      forcedEol + //
                      "final `painted` elements will need to be `composited`" +
                      forcedEol + //
                      "back together.";
                    break;
                  }
                }

                // The markdown path parser under windows escapes the `userhome\.vscode` folder as `userhome.vscode`
                if (process.platform === "win32") {
                  path = path.replace("\\.", "\\\\.");
                }
                if (buckets[type].length) {
                  const engines = buckets[type];
                  hoverData.push({
                    engines,
                    titleAndCaption,
                    path,
                    explanation,
                  });
                }
              }
              return hoverData;
            };

            const forcedEol = "  \r\n";
            const emptyLine = forcedEol + forcedEol;

            const formatAsTable = (p: HoverMetadata) => {
              let hoverMessage;
              if (showLegend) {
                hoverMessage = //
                  `| ![${p.titleAndCaption}](${p.path} '${
                    p.titleAndCaption
                  }') ${p.engines.join(", ")} |${forcedEol}` + //
                  `| :--------- |${forcedEol}` + //
                  `| ${p.explanation} | ${emptyLine}`; //;
              } else {
                hoverMessage = `![${p.titleAndCaption}](${p.path} '${
                  p.titleAndCaption
                }') ${p.engines.join(", ")} ${emptyLine}`;
              }
              return hoverMessage;
            };

            let hoverMessage = "";
            let showExtendedInformation: boolean = workspace
              .getConfiguration("csstriggers")
              .get<boolean>("showExtendedInformation", false);
            let showLegend: boolean = workspace
              .getConfiguration("csstriggers")
              .get<boolean>("showLegend", true);

            if (showExtendedInformation) {
              hoverMessage += "*Change from default*" + emptyLine;
              hoverMessage += getHoverData(symbol.data.initial)
                .map((p) => formatAsTable(p))
                .join(forcedEol);
              hoverMessage += "------" + forcedEol;

              hoverMessage += "*Subsequent updates*" + emptyLine;
              hoverMessage += getHoverData(symbol.data.change)
                .map((p) => formatAsTable(p))
                .join(forcedEol);
              hoverMessage += "------" + forcedEol;
            } else {
              hoverMessage =
                getHoverData({
                  [defaultEngine]: symbol.data.change[defaultEngine],
                })
                  .map((p) => {
                    const explanation = showLegend
                      ? `${forcedEol}${p.explanation.replace(/\r\n/g, "")}`
                      : "";
                    const hoverMessage = `![${p.titleAndCaption}](${p.path} '${p.titleAndCaption}')${explanation}${emptyLine}`;
                    return hoverMessage;
                  })
                  .join("") + forcedEol;
            }
            return <DecorationOptions>{
              range,
              hoverMessage,
            };
          };

          let defaultEngine: string = workspace
            .getConfiguration("csstriggers")
            .get<string>("defaultEngine", "blink");
          if (validEngines.indexOf(defaultEngine) == -1) {
            defaultEngine = "blink";
          }

          const browserData = (p: Symbol): ICssTriggerRenderData => {
            return p.data.change[defaultEngine];
          };

          const isComposite = (data: ICssTriggerRenderData) =>
            data.composite && !data.paint && !data.layout;
          const isCompositeAndPaint = (data: ICssTriggerRenderData) =>
            data.composite && data.paint && !data.layout;
          const isCompositePaintAndLayout = (data: ICssTriggerRenderData) =>
            data.composite && data.paint && data.layout;

          const compositeTriggers = (response: SymbolResponse) =>
            response.symbols.filter((p) => isComposite(browserData(p)));
          const compositeAndPaintTriggers = (response: SymbolResponse) =>
            response.symbols.filter((p) => isCompositeAndPaint(browserData(p)));
          const compositePaintAndLayoutTriggers = (response: SymbolResponse) =>
            response.symbols.filter((p) =>
              isCompositePaintAndLayout(browserData(p))
            );

          if (isDecorationEnabled) {
            setDecorationsForEditors(editors, hoveronly, []);
            let compositeDecoration: TextEditorDecorationType;
            let compositeAndPaintDecoration: TextEditorDecorationType;
            let compositePaintAndLayoutDecoration: TextEditorDecorationType;
            if (isDecorationInline) {
              compositeDecoration = compositeInline;
              compositeAndPaintDecoration = compositeAndPaintInline;
              compositePaintAndLayoutDecoration = compositePaintAndLayoutInline;

              setDecorationsForEditors(editors, composite, []);
              setDecorationsForEditors(editors, compositeAndPaint, []);
              setDecorationsForEditors(editors, compositePaintAndLayout, []);
            } else {
              compositeDecoration = composite;
              compositeAndPaintDecoration = compositeAndPaint;
              compositePaintAndLayoutDecoration = compositePaintAndLayout;

              setDecorationsForEditors(editors, compositeInline, []);
              setDecorationsForEditors(editors, compositeAndPaintInline, []);
              setDecorationsForEditors(
                editors,
                compositePaintAndLayoutInline,
                []
              );
            }

            setDecorationsForEditors(
              editors,
              compositeDecoration,
              compositeTriggers(symbolResponse).map((s) => mapper(s))
            );
            setDecorationsForEditors(
              editors,
              compositeAndPaintDecoration,
              compositeAndPaintTriggers(symbolResponse).map((s) => mapper(s))
            );
            setDecorationsForEditors(
              editors,
              compositePaintAndLayoutDecoration,
              compositePaintAndLayoutTriggers(symbolResponse).map((s) =>
                mapper(s)
              )
            );
          } else {
            let allSymbols = [];
            allSymbols = allSymbols.concat(
              compositeTriggers(symbolResponse).map((s) => mapper(s))
            );
            allSymbols = allSymbols.concat(
              compositeAndPaintTriggers(symbolResponse).map((s) => mapper(s))
            );
            allSymbols = allSymbols.concat(
              compositePaintAndLayoutTriggers(symbolResponse).map((s) =>
                mapper(s)
              )
            );
            setDecorationsForEditors(editors, hoveronly, allSymbols);

            setDecorationsForEditors(editors, composite, []);
            setDecorationsForEditors(editors, compositeAndPaint, []);
            setDecorationsForEditors(editors, compositePaintAndLayout, []);

            setDecorationsForEditors(editors, compositeInline, []);
            setDecorationsForEditors(editors, compositeAndPaintInline, []);
            setDecorationsForEditors(
              editors,
              compositePaintAndLayoutInline,
              []
            );
          }
        }
      );
    } else {
      setDecorationsForEditors(editors, composite, []);
      setDecorationsForEditors(editors, compositeAndPaint, []);
      setDecorationsForEditors(editors, compositePaintAndLayout, []);

      setDecorationsForEditors(editors, compositeInline, []);
      setDecorationsForEditors(editors, compositeAndPaintInline, []);
      setDecorationsForEditors(editors, compositePaintAndLayoutInline, []);
    }
  }

  refreshAllVisibleEditors();
}

function setDecorationsForEditors(
  editors: TextEditor[],
  type: TextEditorDecorationType,
  options: DecorationOptions[]
) {
  editors.forEach((editor) => editor.setDecorations(type, options));
}

function findEditorsForDocument(document: TextDocument) {
  return window.visibleTextEditors.filter(
    (p) => p.document.uri === document.uri
  );
}
