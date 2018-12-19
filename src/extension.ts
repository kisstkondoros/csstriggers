"use strict";

import * as vscode from "vscode";

import path = require("path");
import { TextDocument, CancellationToken } from "vscode";
import { Message } from "vscode-jsonrpc";
import {
	LanguageClient,
	LanguageClientOptions,
	ErrorAction,
	ServerOptions,
	TransportKind
} from "vscode-languageclient";
import { activateColorDecorations } from "./triggerdecorator";
import { SymbolResponse, CssTriggerSymbolRequestType } from "./common/protocol";

export function activate(context: vscode.ExtensionContext) {
	let serverModule = context.asAbsolutePath(path.join("out", "src", "server", "server.js"));

	let debugOptions = { execArgv: ["--nolazy", "--inspect=6004"] };

	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
	};
	var output = vscode.window.createOutputChannel("CssTrigger");
	let error: (error, message, count) => ErrorAction = (error: Error, message: Message) => {
		output.appendLine(message.jsonrpc);
		return undefined;
	};
	let clientOptions: LanguageClientOptions = {
		documentSelector: ["*"],
		errorHandler: {
			error: error,

			closed: () => {
				return undefined;
			}
		},
		synchronize: {
			configurationSection: "csstriggers"
		}
	};

	let client = new LanguageClient("CssTrigger parser", serverOptions, clientOptions);
	let disposable = client.start();

	context.subscriptions.push(disposable);

	let symbolUpdater = (
		document: TextDocument,
		visibleLines: number[],
		token: CancellationToken
	): Promise<SymbolResponse> => {
		return client
			.onReady()
			.then(() => {
				return client.sendRequest(
					CssTriggerSymbolRequestType,
					{
						uri: document.uri.toString(),
						visibleLines: visibleLines,
						fileName: document.fileName
					},
					token
				);
			})
			.catch(() => {
				console.warn("Connection was not yet ready when requesting symbols for css trigger.");
				return {
					symbols: []
				};
			});
	};

	activateColorDecorations(symbolUpdater, context, client);
}
