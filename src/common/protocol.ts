import { RequestType, Range } from 'vscode-languageserver';

export interface Symbol {
    hoverMessage: string,
    range: Range
}
export interface SymbolRequest {
    uri: string;
    fileName: string;
    visibleLines: number[];
}
export interface SymbolResponse {
    composite: Symbol[],
    layout: Symbol[],
    paint: Symbol[]
}

export const CssTriggerSymbolRequestType: RequestType<SymbolRequest, SymbolResponse, any, any> = new RequestType('csstrigger/cssTriggerSymbols');