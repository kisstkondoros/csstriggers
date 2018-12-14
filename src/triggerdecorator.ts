import {
	window,
	workspace,
	DecorationOptions,
	TextDocument,
	TextEditor,
	CancellationToken,
	CancellationTokenSource,
	ExtensionContext,
	TextEditorDecorationType
} from "vscode";
import { LanguageClient } from "vscode-languageclient";
import { Symbol, SymbolResponse } from "./common/protocol";

interface PendingScan {
	token: CancellationTokenSource;
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
	const compositeImagePath = context.asAbsolutePath("images/composite_wide.svg");
	const compositeAndPaintImagePath = context.asAbsolutePath("images/composite_paint_wide.svg");
	const compositePaintAndLayoutImagePath = context.asAbsolutePath("images/composite_paint_layout_wide.svg");
	const compositeImagePathSmall = context.asAbsolutePath("images/composite.svg");
	const compositeAndPaintImagePathSmall = context.asAbsolutePath("images/paint.svg");
	const compositePaintAndLayoutImagePathSmall = context.asAbsolutePath("images/layout.svg");
	var hoveronly = window.createTextEditorDecorationType({});
	var composite = window.createTextEditorDecorationType({
		gutterIconPath: compositeImagePathSmall
	});
	var compositeAndPaint = window.createTextEditorDecorationType({
		gutterIconPath: compositeAndPaintImagePathSmall
	});
	var compositePaintAndLayout = window.createTextEditorDecorationType({
		gutterIconPath: compositePaintAndLayoutImagePathSmall
	});

	context.subscriptions.push(composite);
	context.subscriptions.push(compositeAndPaint);
	context.subscriptions.push(compositePaintAndLayout);

	context.subscriptions.push(
		workspace.onDidChangeTextDocument(e => {
			if (e) {
				throttledScan(e.document);
			}
		})
	);
	context.subscriptions.push(
		window.onDidChangeActiveTextEditor(e => {
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
		window.onDidChangeTextEditorVisibleRanges(event => {
			if (event && event.textEditor && event.textEditor.document) {
				const document = event.textEditor.document;
				throttledScan(document, 50);
			}
		})
	);
	context.subscriptions.push(
		workspace.onDidOpenTextDocument(e => {
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
			.map(p => p.document)
			.filter(p => p != null)
			.forEach(doc => throttledScan(doc));
	};

	function getPendingScan(document: TextDocument): PendingScan {
		const pendingScan = pendingScans[document.uri.toString()] || {
			token: new CancellationTokenSource()
		};
		pendingScan[document.uri.toString()] = pendingScan;
		return pendingScan;
	}

	function scan(document: TextDocument) {
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

			let isDecorationEnabled = workspace.getConfiguration("csstriggers").get("showDecoration", true) == true;

			const scanResult = getPendingScan(document);
			scanResult.token.cancel();
			scanResult.token = new CancellationTokenSource();
			decoratorProvider(document, visibleLines, scanResult.token.token).then(symbolResponse => {
				type kind = "composite" | "paint" | "layout";
				var mapper: (symbol: Symbol, type: kind) => DecorationOptions = (symbol: Symbol, type: kind) => {
					var range = client.protocol2CodeConverter.asRange(symbol.range);
					let path: string;
					let explanation: string;
					let titleAndCaption: string = type;
					switch (type) {
						case "composite": {
							path = compositeImagePath;
							explanation = "Changes will result only in `compositing`.";
							break;
						}
						case "paint": {
							path = compositeAndPaintImagePath;
							explanation = "The affected element will be `painted` and `composited`.";
							break;
						}
						case "layout": {
							path = compositePaintAndLayoutImagePath;
							explanation =
								"Any affected areas will need to be `layouted`, and the final `painted` elements will need to be `composited` back together.";
							break;
						}
					}

					// The markdown path parser under windows escapes the `userhome\.vscode` folder as `userhome.vscode`
					if (process.platform === "win32") {
						path = path.replace("\\.", "\\\\.");
					}

					return <DecorationOptions>{
						range: range,
						hoverMessage: `![${titleAndCaption}](${path}|height=16 '${titleAndCaption}')  \r\n` + explanation
					};
				};

				if (isDecorationEnabled) {
					setDecorationsForEditors(editors, hoveronly, []);

					setDecorationsForEditors(editors, composite, symbolResponse.composite.map(s => mapper(s, "composite")));
					setDecorationsForEditors(editors, compositeAndPaint, symbolResponse.paint.map(s => mapper(s, "paint")));
					setDecorationsForEditors(editors, compositePaintAndLayout, symbolResponse.layout.map(s => mapper(s, "layout")));
				} else {
					let allSymbols = [];
					allSymbols = allSymbols.concat(symbolResponse.composite.map(s => mapper(s, "composite")));
					allSymbols = allSymbols.concat(symbolResponse.paint.map(s => mapper(s, "paint")));
					allSymbols = allSymbols.concat(symbolResponse.layout.map(s => mapper(s, "layout")));
					setDecorationsForEditors(editors, hoveronly, allSymbols);

					setDecorationsForEditors(editors, composite, []);
					setDecorationsForEditors(editors, compositeAndPaint, []);
					setDecorationsForEditors(editors, compositePaintAndLayout, []);
				}
			});
		} else {
			setDecorationsForEditors(editors, composite, []);
			setDecorationsForEditors(editors, compositeAndPaint, []);
			setDecorationsForEditors(editors, compositePaintAndLayout, []);
		}
	}

	refreshAllVisibleEditors();
}

function setDecorationsForEditors(editors: TextEditor[], type: TextEditorDecorationType, options: DecorationOptions[]) {
	editors.forEach(editor => editor.setDecorations(type, options));
}

function findEditorsForDocument(document: TextDocument) {
	return window.visibleTextEditors.filter(p => p.document.uri === document.uri);
}
