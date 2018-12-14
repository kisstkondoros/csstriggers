/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
"use strict";

import {
	InitializeResult,
	IPCMessageReader,
	IPCMessageWriter,
	IConnection,
	createConnection,
	Range,
	TextDocuments,
	TextDocument,
	Position
} from "vscode-languageserver";
import { fetchCssTriggers } from "./liveData";
import { SymbolResponse, CssTriggerSymbolRequestType, SymbolRequest } from "../common/protocol";
import { request } from "https";

let connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let cssTriggersPromise = fetchCssTriggers();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

let documents: TextDocuments = new TextDocuments();
documents.listen(connection);

connection.onInitialize(
	(): InitializeResult => {
		return {
			capabilities: {
				textDocumentSync: documents.syncKind
			}
		};
	}
);

connection.onRequest(CssTriggerSymbolRequestType, request => {
	let document = documents.get(request.uri);
	return cssTriggersPromise.then(triggers => decorateCssProperties(document, request, triggers));
});

function decorateCssProperties(document: TextDocument, request: SymbolRequest, cssTriggers: any): SymbolResponse {
	var result = {
		composite: [],
		layout: [],
		paint: []
	};

	if (!document) {
		return;
	}

	const lines = document.getText().split(/\r\n|\r|\n/);
	for (const lineIndex of request.visibleLines) {
		const text = lines[lineIndex];
		var match;
		const whiteSpace = /\s/;
		var regex = /([\-\w])*\s*:/g;
		while ((match = regex.exec(text))) {
			var capturingGroup = match[0].substr(0, match[0].length - 1).trim();
			var trigger = cssTriggers.data[capturingGroup];
			if (trigger) {
				var change = trigger.change.blink;
				var index = match.index;
				var start = Position.create(lineIndex, index);
				var whitespaceTestIndex = index - 1;
				var previousNonWhiteSpaceChar: string;

				while (
					whitespaceTestIndex > 0 &&
					((previousNonWhiteSpaceChar = text.charAt(whitespaceTestIndex)) && whiteSpace.test(previousNonWhiteSpaceChar))
				) {
					whitespaceTestIndex--;
				}

				if (previousNonWhiteSpaceChar == "$" || previousNonWhiteSpaceChar == "(") {
					continue;
				}
				var end = Position.create(lineIndex, index + capturingGroup.length);
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
	}
	return result;
}

connection.listen();
