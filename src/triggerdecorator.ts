/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import { window, workspace, DecorationOptions, DecorationRenderOptions, Disposable, Range, TextDocument, TextEditor } from 'vscode';
import { Protocol2CodeConverter, LanguageClient } from 'vscode-languageclient';
import { Symbol, SymbolResponse } from './common/protocol';

export function activateColorDecorations(decoratorProvider: (uri: string) => Thenable<SymbolResponse>, asAbsolutePath: (relativePath: string) => string, supportedLanguages: { [id: string]: boolean }, client: LanguageClient): Disposable {

    let disposables: Disposable[] = [];
    const compositeImagePath = asAbsolutePath('images/composite_668.png');
    const compositeAndPaintImagePath = asAbsolutePath('images/compositeAndPaint_668.png');
    const compositePaintAndLayoutImagePath = asAbsolutePath('images/compositePaintAndLayout_668.png');
    const compositeImagePathSmall = asAbsolutePath('images/composite_12.png');
    const compositeAndPaintImagePathSmall = asAbsolutePath('images/compositeAndPaint_12.png');
    const compositePaintAndLayoutImagePathSmall = asAbsolutePath('images/compositePaintAndLayout_12.png');
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

    disposables.push(composite);
    disposables.push(compositeAndPaint);
    disposables.push(compositePaintAndLayout);

    let pendingUpdateRequests: { [key: string]: NodeJS.Timer; } = {};

    // we care about all visible editors
    window.visibleTextEditors.forEach(editor => {
        if (editor.document) {
            triggerUpdateDecorations(editor.document);
        }
    });
    // to get visible one has to become active
    window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            triggerUpdateDecorations(editor.document);
        }
    }, null, disposables);

    workspace.onDidChangeTextDocument(event => triggerUpdateDecorations(event.document), null, disposables);
    workspace.onDidOpenTextDocument(triggerUpdateDecorations, null, disposables);
    workspace.onDidCloseTextDocument(triggerUpdateDecorations, null, disposables);

    function triggerUpdateDecorations(document: TextDocument) {
        let triggerUpdate = supportedLanguages[document.languageId];
        let uri = document.uri.toString();
        let timeout = pendingUpdateRequests[uri];
        if (typeof timeout !== 'undefined') {
            clearTimeout(timeout);
            triggerUpdate = true; // force update, even if languageId is not supported (anymore)
        }
        if (triggerUpdate) {
            pendingUpdateRequests[uri] = setTimeout(() => {
                updateDecorations(uri);
                delete pendingUpdateRequests[uri];
            }, 500);
        }
    }

    function updateDecorations(uri: string) {
        window.visibleTextEditors.forEach(editor => {
            let document = editor.document;
            if (document && document.uri.toString() === uri) {
                updateDecorationForEditor(editor);
            }
        });
    }

    function updateDecorationForEditor(editor: TextEditor) {
        let document = editor.document;
        let isDecorationEnabled = workspace.getConfiguration('csstriggers').get('showDecoration', true) == true;
        if (supportedLanguages[document.languageId]) {
            decoratorProvider(document.uri.toString()).then(symbolResponse => {
                type kind = "composite" | "paint" | "layout";
                var mapper: (symbol: Symbol, type: kind) => DecorationOptions = (symbol: Symbol, type: kind) => {
                    var range = client.protocol2CodeConverter.asRange(symbol.range);
                    let color = document.getText(range);
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
                            explanation = "Any affected areas will need to be `layouted`, and the final `painted` elements will need to be `composited` back together.";
                            break;
                        }
                    }
                    return <DecorationOptions>{
                        range: range,
                        hoverMessage: `![${titleAndCaption}](${path}|height=100 '${titleAndCaption}')  \r\n` + explanation
                    };
                };

                if (isDecorationEnabled) {
                    editor.setDecorations(hoveronly, []);

                    editor.setDecorations(composite, symbolResponse.composite.map(s => mapper(s, "composite")));
                    editor.setDecorations(compositeAndPaint, symbolResponse.paint.map(s => mapper(s, "paint")));
                    editor.setDecorations(compositePaintAndLayout, symbolResponse.layout.map(s => mapper(s, "layout")));
                } else {
                    let allSymbols = [];
                    allSymbols = allSymbols.concat(symbolResponse.composite.map(s => mapper(s, "composite")));
                    allSymbols = allSymbols.concat(symbolResponse.paint.map(s => mapper(s, "paint")));
                    allSymbols = allSymbols.concat(symbolResponse.layout.map(s => mapper(s, "layout")));
                    editor.setDecorations(hoveronly, allSymbols);

                    editor.setDecorations(composite, []);
                    editor.setDecorations(compositeAndPaint, []);
                    editor.setDecorations(compositePaintAndLayout, []);
                }

            });
        } else {
            editor.setDecorations(composite, []);
            editor.setDecorations(compositeAndPaint, []);
            editor.setDecorations(compositePaintAndLayout, []);
        }
    }

    return Disposable.from(...disposables);
}
