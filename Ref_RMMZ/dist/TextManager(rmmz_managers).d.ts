declare function TextManager(): void;
declare namespace TextManager {
    function basic(basicId: any): any;
    function param(paramId: any): any;
    function command(commandId: any): any;
    function message(messageId: any): any;
    function getter(method: any, param: any): {
        get: () => any;
        configurable: boolean;
    };
    const currencyUnit: any;
}
