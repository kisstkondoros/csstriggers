import { RequestType, Range } from "vscode-languageserver";
import { ICssTriggerBrowserRenderData } from "../server/csstriggers";

export interface Symbol {
  data: ICssTriggerBrowserRenderData;
  range: Range;
}
export interface SymbolRequest {
  uri: string;
  fileName: string;
  visibleLines: number[];
}
export interface SymbolResponse {
  symbols: Symbol[];
}

export const CssTriggerSymbolRequestType: RequestType<
  SymbolRequest,
  SymbolResponse,
  any
> = new RequestType("csstrigger/cssTriggerSymbols");
