"use strict";

import * as vscode from "vscode";

import path = require("path");
import { TextDocument, CancellationToken } from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { activateColorDecorations } from "./triggerdecorator";
import { SymbolResponse, CssTriggerSymbolRequestType } from "./common/protocol";

export function activate(context: vscode.ExtensionContext) {
  let serverModule = context.asAbsolutePath(path.join("dist", "server.js"));

  let debugOptions = { execArgv: ["--nolazy", "--inspect=6004"] };

  let serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc,
      options: debugOptions,
    },
  };
  var output = vscode.window.createOutputChannel("CssTrigger");
  let clientOptions: LanguageClientOptions = {
    documentSelector: ["*"],
    errorHandler: {
      error: (_, message) => {
        output.appendLine(message.jsonrpc);
        return { action: undefined };
      },

      closed: () => {
        return undefined;
      },
    },
    synchronize: {
      configurationSection: "csstriggers",
    },
  };

  let client = new LanguageClient(
    "CssTrigger",
    "CssTrigger parser",
    serverOptions,
    clientOptions
  );
  const started = client.start();

  let symbolUpdater = (
    document: TextDocument,
    visibleLines: number[],
    token: CancellationToken
  ): Promise<SymbolResponse> => {
    return started
      .then(() => {
        return client.sendRequest(
          CssTriggerSymbolRequestType,
          {
            uri: document.uri.toString(),
            visibleLines: visibleLines,
            fileName: document.fileName,
          },
          token
        );
      })
      .catch(() => {
        console.warn(
          "Connection was not yet ready when requesting symbols for css trigger."
        );
        return {
          symbols: [],
        };
      });
  };

  activateColorDecorations(symbolUpdater, context, client);
}
