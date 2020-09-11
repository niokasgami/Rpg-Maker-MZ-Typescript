declare function Window_EquipStatus(...args: any[]): void;
declare class Window_EquipStatus {
    constructor(...args: any[]);
    constructor: typeof Window_EquipStatus;
    initialize(rect: any): void;
    _actor: any;
    _tempActor: any;
    setActor(actor: any): void;
    colSpacing(): number;
    refresh(): void;
    setTempActor(tempActor: any): void;
    drawAllParams(): void;
    drawItem(x: any, y: any, paramId: any): void;
    drawParamName(x: any, y: any, paramId: any): void;
    drawCurrentParam(x: any, y: any, paramId: any): void;
    drawRightArrow(x: any, y: any): void;
    drawNewParam(x: any, y: any, paramId: any): void;
    rightArrowWidth(): number;
    paramWidth(): number;
    paramX(): number;
    paramY(index: any): number;
}
