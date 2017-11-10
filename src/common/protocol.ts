import { RequestType, Range } from 'vscode-languageserver';

export interface Symbol {
    hoverMessage: string,
    range: Range
}
export interface SymbolResponse {
    composite: Symbol[],
    layout: Symbol[],
    paint: Symbol[]
}

export const CssTriggerSymbolRequestType: RequestType<string, SymbolResponse, any, any> = new RequestType('csstrigger/cssTriggerSymbols');