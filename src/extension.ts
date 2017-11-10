'use strict';

import * as vscode from 'vscode';

import path = require('path');
import { workspace, Disposable, ExtensionContext } from 'vscode';
import { Message } from 'vscode-jsonrpc';
import { LanguageClient, LanguageClientOptions, ErrorAction, CloseAction, SettingMonitor, ServerOptions, TransportKind } from 'vscode-languageclient';
import { activateColorDecorations } from './triggerdecorator'
import { Symbol, SymbolResponse, CssTriggerSymbolRequestType } from './common/protocol';

export function activate(context: vscode.ExtensionContext) {

    let serverModule = context.asAbsolutePath(path.join('out', 'src', 'server', 'server.js'));

    let debugOptions = { execArgv: ["--nolazy", "--inspect=6004"] };

    let serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
    }
    var output = vscode.window.createOutputChannel("CssTrigger");
    let error: (error, message, count) => ErrorAction = (error: Error, message: Message, count: number) => {
        output.appendLine(message.jsonrpc);
        return undefined;
    };
    let clientOptions: LanguageClientOptions = {
        documentSelector: ["css", "less", "scss", "sass", "stylable"],
        errorHandler: {
            error: error,

            closed: () => {
                return undefined;
            }
        },
        synchronize: {
            configurationSection: 'csstriggers',
        }
    }

    let client = new LanguageClient('CssTrigger parser', serverOptions, clientOptions);
    let disposable = client.start();

    context.subscriptions.push(disposable);


    let triggerRequestor = (uri: string): Promise<SymbolResponse> => {
        return client.onReady().then(() => client.sendRequest(CssTriggerSymbolRequestType, uri)) as Promise<SymbolResponse>;
    };

    disposable = activateColorDecorations(triggerRequestor, context.asAbsolutePath, { css: true, scss: true, less: true, stylable: true }, client);
    vscode.window.onDidChangeActiveTextEditor((e) => {
        console.error(e.document.languageId);
    })
    context.subscriptions.push(disposable);

}