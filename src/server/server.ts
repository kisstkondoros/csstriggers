/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as https from 'https';

import { InitializeResult, IPCMessageReader, IPCMessageWriter, IConnection, createConnection, Range, TextDocuments, TextDocument } from 'vscode-languageserver';
import { fetchCssTriggers } from './liveData';
import { Symbol, SymbolResponse, CssTriggerSymbolRequestType } from '../common/protocol';

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let cssTriggersPromise = fetchCssTriggers();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

connection.onInitialize((params): InitializeResult => {
	return {
		capabilities: {
			textDocumentSync: documents.syncKind,
		}
	}
});

connection.onRequest(CssTriggerSymbolRequestType, uri => {
	let document = documents.get(uri);
	return cssTriggersPromise.then(triggers => decorateCssProperties(document, triggers));
});

function decorateCssProperties(document: TextDocument, cssTriggers: any): SymbolResponse {
	var supportedLanguages = ["css", "less", "sass", "scss", "stylable"];
	var result = {
		composite: [],
		layout: [],
		paint: []
	};
	var diagnostics: SymbolResponse[] = [];

	if (!document || supportedLanguages.indexOf(document.languageId) == -1) {
		return;
	}

	var text = document.getText();
	var match;
	var regex = /([\-\w])*\s*:/g;
	while (match = regex.exec(text)) {
		var capturingGroup = match[0].substr(0, match[0].length - 1).trim();
		var trigger = cssTriggers.data[capturingGroup];
		if (trigger) {
			var change = trigger.change.blink;
			var index = match.index;
			var start = document.positionAt(index);
			var end = document.positionAt(index + capturingGroup.length);
			var hoverMessage = "Subsequent updates will cause: ";
			var causes = [];
			if (change.composite) {
				causes.push("composite");
			}
			if (change.paint) {
				causes.push("paint");
			}
			if (change.layout) {
				causes.push("layout");
			}

			hoverMessage += causes.join(", ");
			var decoration = { range: { start: start, end: end }, hoverMessage };

			if (change.layout) {
				result.layout.push(decoration);
			} else if (change.paint) {
				result.paint.push(decoration);
			} else if (change.composite) {
				result.composite.push(decoration);
			}
		}
	}
	return result;
}

connection.listen();