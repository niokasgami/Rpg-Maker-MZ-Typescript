/**
 * The static class that handles JSON with object information.
 *
 * @namespace
 */
declare function JsonEx(): void;
declare namespace JsonEx {
    const maxDepth: number;
    function stringify(object: any): string;
    function parse(json: string): any;
    function makeDeepCopy(object: any): any;
    function _encode(value: any, depth: any): any;
    function _decode(value: any): any;
}
