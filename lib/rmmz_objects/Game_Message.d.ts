
declare class Game_Message {

    private _texts: string[];
    private _choices: string[];
    private _speakerName: string;
    private _faceName: string;
    private _faceIndex: number;
    private _background: number;
    private _positionType: number;
    private _choiceDefaultType: number;
    private _choiceCancelType: number;
    private _choiceBackground: number;
    private _choicePositionType: number;
    private _numInputVariableId: number;
    private _numInputMaxDigits: number;
    private _itemChoiceVariableId: number;
    private _itemChoiceItypeId: number;
    private _scrollMode: boolean;
    private _scrollSpeed: number;
    private _scrollNoFast: boolean;
    // eslint-disable-next-line @typescript-eslint/ban-types
    private _choiceCallback: Function;

    constructor();

    public initialize(): void;
    public clear(): void;
    public choices(): string[]; // TODO is it the proper type?
    public speakerName(): string;
    public faceName(): string;
    public faceIndex(): number;
    public background(): number;
    public positionType(): number;
    public choiceDefaultType(): number;
    public choiceCancelType(): number;
    public choiceBackground(): number;
    public choicePositionType(): number;
    public numInputVariableId(): number;
    public numInputMaxDigits(): number;
    public itemChoiceVariableId(): number;
    public itemChoiceItypeId(): number;
    public scrollMode(): boolean;
    public scrollSpeed(): number;
    public scrollNoFast(): boolean;
    public add(text: string): void; 
    public setSpeakerName(speakerName: string): void;
    public setFaceImage(faceName, faceIndex): void;
    public setBackground(background: number): number
    public setPositionType(positionType: number): number
    public setChoices(choices: string[], defaultType: number, cancelType: number): void;
    public setChoiceBackground(background: number): void;
    public setChoicePositionType(positionType: number): void;
    public setNumberInput(variableId: number, maxDigits: number): void;
    public setItemChoice(variableId: number, itemType: number): void;
    public setScroll(speed: number, noFast: boolean): void;
    // eslint-disable-next-line @typescript-eslint/ban-types
    public setChoiceCallback(callback: Function): void;
    public onChoice(n: arguments): void;
    public hasText(): boolean
    public isChoice(): boolean;
    public isNumberInput(): boolean;
    public isItemChoice(): boolean;
    public isBusy(): boolean;
    public newPage(): void;
    public allText(): string;
    public isRTL(): boolean
}