import {
  InitializeResult,
  IPCMessageReader,
  IPCMessageWriter,
  IConnection,
  createConnection,
  TextDocuments,
  Position,
  TextDocumentSyncKind,
} from "vscode-languageserver";
import { fetchCssTriggers } from "./liveData";
import {
  SymbolResponse,
  CssTriggerSymbolRequestType,
  SymbolRequest,
} from "../common/protocol";
import { ICssTrigger } from "./csstriggers";

import { TextDocument } from "vscode-languageserver-textdocument";

let connection: IConnection = createConnection(
  new IPCMessageReader(process),
  new IPCMessageWriter(process)
);

let cssTriggersPromise = fetchCssTriggers();

console.log = connection.console.log.bind(connection.console);
console.error = connection.console.error.bind(connection.console);

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);
documents.listen(connection);

connection.onInitialize(
  (): InitializeResult => {
    return {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Full,
      },
    };
  }
);

connection.onRequest(CssTriggerSymbolRequestType, (request) => {
  let document = documents.get(request.uri);
  return cssTriggersPromise.then((triggers) =>
    decorateCssProperties(document, request, triggers)
  );
});

function camelCaseToDash(myStr) {
  return myStr.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function decorateCssProperties(
  document: TextDocument,
  request: SymbolRequest,
  cssTriggers: ICssTrigger
): SymbolResponse {
  var result: SymbolResponse = {
    symbols: [],
  };

  if (!document) {
    return;
  }

  const lines = document.getText().split(/\r\n|\r|\n/);
  for (const lineIndex of request.visibleLines) {
    const text = lines[lineIndex];
    var match;
    var regex = /([\-a-z])+\s*:/gi;
    while ((match = regex.exec(text))) {
      const capturingGroup = match[0].substr(0, match[0].length - 1).trim();
      const trigger =
        cssTriggers.data[capturingGroup] ||
        cssTriggers.data[camelCaseToDash(capturingGroup)];
      if (trigger) {
        var index = match.index;
        var start = Position.create(lineIndex, index);
        var previousNonWhiteSpaceChar = text
          .substr(0, match.index)
          .trim()
          .substr(-1);
        if (
          previousNonWhiteSpaceChar == "$" ||
          previousNonWhiteSpaceChar == "("
        ) {
          continue;
        }
        var end = Position.create(lineIndex, index + capturingGroup.length);
        result.symbols.push({
          range: { start: start, end: end },
          data: trigger,
        });
      }
    }
  }
  return result;
}

connection.listen();
