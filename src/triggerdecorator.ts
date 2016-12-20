/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

import {window, workspace, DecorationOptions, DecorationRenderOptions, Disposable, Range, TextDocument, TextEditor} from 'vscode';
import {Protocol2Code} from 'vscode-languageclient';
import {Symbol, SymbolResponse} from './common/protocol';

export function activateColorDecorations(decoratorProvider: (uri: string) => Thenable<SymbolResponse>, supportedLanguages: { [id: string]: boolean }): Disposable {

    let disposables: Disposable[] = [];
    var hoveronly = window.createTextEditorDecorationType({});
    var composite = window.createTextEditorDecorationType({
        before: {
            contentText: '\u29BF',
            color: '#455f15',
            margin: "4px"
        }
    });
    var compositeAndPaint = window.createTextEditorDecorationType({
        before: {
            contentText: '\u29BF',
            color: '#90aa65',
            margin: "4px"
        }
    });
    var compositePaintAndLayout = window.createTextEditorDecorationType({
        before: {
            contentText: '\u29BF',
            color: '#9089e4',
            margin: "4px"
        }
    });

    disposables.push(composite);
    disposables.push(compositeAndPaint);
    disposables.push(compositePaintAndLayout);

    let pendingUpdateRequests: { [key: string]: number; } = {};

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
                var mapper: (Symbol) => DecorationOptions = (symbol: Symbol) => {
                    var range = Protocol2Code.asRange(symbol.range);
                    let color = document.getText(range);
                    return <DecorationOptions>{
                        range: range,
                        hoverMessage: symbol.hoverMessage
                    };
                };

                if (isDecorationEnabled) {
                    editor.setDecorations(hoveronly, []);

                    editor.setDecorations(composite, symbolResponse.composite.map(mapper));
                    editor.setDecorations(compositeAndPaint, symbolResponse.paint.map(mapper));
                    editor.setDecorations(compositePaintAndLayout, symbolResponse.layout.map(mapper));
                } else {
                    const allSymbols = [].concat(symbolResponse.composite).concat(symbolResponse.paint).concat(symbolResponse.layout)
                    editor.setDecorations(hoveronly, allSymbols.map(mapper));

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
