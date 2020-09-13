export declare const scriptUrls: string[];

export declare const effekseerWasmUrl: string;

export declare class Main {
    public xhrSucceeded: boolean;
    public loadCount: number;
    public error: unknown;

    public run(): void;

    public showLoadingSpinner(): void;
    public eraseLoadingSpinner(): void;

    public testXhr(): void;

    public loadMainScripts(): void

    public onScriptLoad(): void;
    public onScriptError(e: Event): void;

    public printError(name: string, message: string): void;
    public makeErrorHtml(name: string, message: string): string;

    public onWindowLoad(): void;
    public onWindowError(e: ErrorEvent): void;

    public isPathRandomized(): boolean;

    public initEffekseerRuntime(): void;

    public onEffekseerLoad(): void;
    public onEffekseerError(): void;
}

export const main: Main;
