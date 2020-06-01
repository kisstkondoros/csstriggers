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
  Disposable,
  Uri,
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
  uri: Uri;
  explanation: string;
  titleAndCaption: string;
}

class RenewableTextEditorDecorationType implements Disposable {
  current: TextEditorDecorationType;
  constructor(
    private create: () => TextEditorDecorationType,
    private teardown: (type: TextEditorDecorationType) => void
  ) {
    this.current = create();
  }

  renew() {
    this.teardown(this.current);
    this.current = this.create();
  }

  dispose() {
    if (this.current) {
      this.current.dispose();
      this.current = null;
    }
  }
}

function processSVGTemplate(
  templateString: string,
  templateVariables: Record<string, string>
): Uri {
  const decoration = templateString.replace(
    /\{\{(.+?)\}\}/g,
    (match, varName) => templateVariables[varName]
  );
  return Uri.parse(
    `data:image/svg+xml;base64,` + Buffer.from(decoration).toString("base64")
  );
}

function generateSVGFromSettings(
  settingsKey: string,
  variables: Record<string, string>
) {
  const config = workspace.getConfiguration("csstriggers");
  return processSVGTemplate(config.get(settingsKey), variables);
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
  const validEngines = ["blink", "gecko", "webkit", "edgehtml"];

  const templateVariables: Record<string, string> = {};

  const loadTemplateVariables = () => {
    const config = workspace.getConfiguration("csstriggers");
    templateVariables.inactivePhaseColor = config.get(
      "decorationInactivePhaseColor"
    );
    templateVariables.compositeColor = config.get("decorationCompositeColor");
    templateVariables.layoutColor = config.get("decorationLayoutColor");
    templateVariables.paintColor = config.get("decorationPaintColor");
    templateVariables.stroke = config.get("decorationStrokeColor");
    templateVariables.strokeWidth = config.get("decorationStrokeWidth");
  };

  loadTemplateVariables();

  const hoveronly = window.createTextEditorDecorationType({});

  const composite = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        gutterIconSize: "0.7em",
        gutterIconPath: generateSVGFromSettings(
          "compositeImageSmall",
          templateVariables
        ),
      });
    },
    (type) => clearDecorationFromEditors(type)
  );
  const compositeAndPaint = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        gutterIconSize: "0.7em",
        gutterIconPath: generateSVGFromSettings(
          "compositeAndPaintImageSmall",
          templateVariables
        ),
      });
    },
    (type) => clearDecorationFromEditors(type)
  );
  const compositePaintAndLayout = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        gutterIconSize: "0.7em",
        gutterIconPath: generateSVGFromSettings(
          "compositePaintAndLayoutImageSmall",
          templateVariables
        ),
      });
    },
    (type) => clearDecorationFromEditors(type)
  );

  context.subscriptions.push(composite);
  context.subscriptions.push(compositeAndPaint);
  context.subscriptions.push(compositePaintAndLayout);

  const compositeInline = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        before: {
          width: "0.7em",
          contentIconPath: generateSVGFromSettings(
            "compositeImageSmall",
            templateVariables
          ),
        },
      });
    },
    (type) => clearDecorationFromEditors(type)
  );
  const compositeAndPaintInline = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        before: {
          width: "0.7em",
          contentIconPath: generateSVGFromSettings(
            "compositeAndPaintImageSmall",
            templateVariables
          ),
        },
      });
    },
    (type) => clearDecorationFromEditors(type)
  );
  const compositePaintAndLayoutInline = new RenewableTextEditorDecorationType(
    () => {
      return window.createTextEditorDecorationType({
        before: {
          width: "0.7em",
          contentIconPath: generateSVGFromSettings(
            "compositePaintAndLayoutImageSmall",
            templateVariables
          ),
        },
      });
    },
    (type) => clearDecorationFromEditors(type)
  );

  context.subscriptions.push(compositeInline);
  context.subscriptions.push(compositeAndPaintInline);
  context.subscriptions.push(compositePaintAndLayoutInline);

  context.subscriptions.push(
    workspace.onDidChangeConfiguration(() => {
      loadTemplateVariables();
      composite.renew();
      compositeAndPaint.renew();
      compositePaintAndLayout.renew();
      compositeInline.renew();
      compositeAndPaintInline.renew();
      compositePaintAndLayoutInline.renew();
      refreshAllVisibleEditors();
    })
  );

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

  const clearDecorationFromEditors = (type: TextEditorDecorationType) => {
    setDecorationsForEditors(window.visibleTextEditors, type, []);
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

                let uri: Uri;
                let explanation: string;
                let titleAndCaption: string = type;

                switch (type) {
                  case "composite": {
                    uri = generateSVGFromSettings(
                      "compositeImage",
                      templateVariables
                    );
                    explanation = "Will result only in `compositing`.";
                    break;
                  }
                  case "paint": {
                    uri = generateSVGFromSettings(
                      "compositeAndPaintImage",
                      templateVariables
                    );
                    explanation =
                      "The affected element will be `painted` and `composited`.";
                    break;
                  }
                  case "layout": {
                    uri = generateSVGFromSettings(
                      "compositePaintAndLayoutImage",
                      templateVariables
                    );
                    explanation =
                      "Any affected areas will need to be `layouted`, and the" +
                      forcedEol + //
                      "final `painted` elements will need to be `composited`" +
                      forcedEol + //
                      "back together.";
                    break;
                  }
                }

                if (buckets[type].length) {
                  const engines = buckets[type];
                  hoverData.push({
                    engines,
                    titleAndCaption,
                    uri,
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
                  `| ![${p.titleAndCaption}](${p.uri.toString(true)} '${
                    p.titleAndCaption
                  }') ${p.engines.join(", ")} |${forcedEol}` + //
                  `| :--------- |${forcedEol}` + //
                  `| ${p.explanation} | ${emptyLine}`; //;
              } else {
                hoverMessage = `![${p.titleAndCaption}](${p.uri.toString(
                  true
                )} '${p.titleAndCaption}') ${p.engines.join(
                  ", "
                )} ${emptyLine}`;
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
                    const hoverMessage = `![${
                      p.titleAndCaption
                    }](${p.uri.toString(true)} '${
                      p.titleAndCaption
                    }')${explanation}${emptyLine}`;
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
              compositeDecoration = compositeInline.current;
              compositeAndPaintDecoration = compositeAndPaintInline.current;
              compositePaintAndLayoutDecoration =
                compositePaintAndLayoutInline.current;

              setDecorationsForEditors(editors, composite.current, []);
              setDecorationsForEditors(editors, compositeAndPaint.current, []);
              setDecorationsForEditors(
                editors,
                compositePaintAndLayout.current,
                []
              );
            } else {
              compositeDecoration = composite.current;
              compositeAndPaintDecoration = compositeAndPaint.current;
              compositePaintAndLayoutDecoration =
                compositePaintAndLayout.current;

              setDecorationsForEditors(editors, compositeInline.current, []);
              setDecorationsForEditors(
                editors,
                compositeAndPaintInline.current,
                []
              );
              setDecorationsForEditors(
                editors,
                compositePaintAndLayoutInline.current,
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

            setDecorationsForEditors(editors, composite.current, []);
            setDecorationsForEditors(editors, compositeAndPaint.current, []);
            setDecorationsForEditors(
              editors,
              compositePaintAndLayout.current,
              []
            );

            setDecorationsForEditors(editors, compositeInline.current, []);
            setDecorationsForEditors(
              editors,
              compositeAndPaintInline.current,
              []
            );
            setDecorationsForEditors(
              editors,
              compositePaintAndLayoutInline.current,
              []
            );
          }
        }
      );
    } else {
      setDecorationsForEditors(editors, composite.current, []);
      setDecorationsForEditors(editors, compositeAndPaint.current, []);
      setDecorationsForEditors(editors, compositePaintAndLayout.current, []);

      setDecorationsForEditors(editors, compositeInline.current, []);
      setDecorationsForEditors(editors, compositeAndPaintInline.current, []);
      setDecorationsForEditors(
        editors,
        compositePaintAndLayoutInline.current,
        []
      );
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
