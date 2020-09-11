declare function Scene_Name(...args: any[]): void;
declare class Scene_Name {
    constructor(...args: any[]);
    constructor: typeof Scene_Name;
    initialize(): void;
    prepare(actorId: any, maxLength: any): void;
    _actorId: any;
    _maxLength: any;
    create(): void;
    _actor: any;
    start(): void;
    createEditWindow(): void;
    _editWindow: Window_NameEdit;
    editWindowRect(): Rectangle;
    createInputWindow(): void;
    _inputWindow: Window_NameInput;
    inputWindowRect(): Rectangle;
    onInputOk(): void;
}
