export declare const scriptUrls: string[];

export declare const effekseerWasmUrl: string;

export declare class Main {
    xhrSucceeded: boolean;
    loadCount: number;
    error: unknown;

    run(): void;

    showLoadingSpinner(): void;
    eraseLoadingSpinner(): void;

    testXhr(): void;

    loadMainScripts(): void

    onScriptLoad(): void;
    onScriptError(e: Event): void;

    printError(name: string, message: string): void;
    makeErrorHtml(name: string, message: string): string;

    onWindowLoad(): void;
    onWindowError(e: ErrorEvent): voi;

    isPathRandomized(): boolean;

    initEffekseerRuntime(): void;

    onEffekseerLoad(): void;
    onEffekseerError(): void;
}

export const main: Main;
