declare namespace RPG {

    export interface Data {
        id: number;
        name: string;
        note: string;
    }

    export interface DataActor extends Data {
        battlerName: string;
        characterIndex: number;
        characterName: string;
        classId: number;
        equips: number[];
        faceIndex: number;
        faceName: string;
        traits: Trait[];
        initialLevel: number;
        maxLevel: number;
        nickname: string;
        profile: string;
    }

    export interface DataItemBase extends Data {
        description: string;
        iconIndex: number;
    }

    export interface DataEquipItem extends DataItemBase {
        etypeId: number;
        traits: Trait[];
        params: number[];
        price: number;
    }

    export interface DataWeapon extends DataEquipItem {
        animationId: number;
        wtypeId: number;
        etypeId: 1;
    }

    export interface DataArmor {
        atypeId: number;
        etypeId: 2 | 3 | 4 | 5;
    }

    export interface DataConsumable extends DataItemBase {
        animationId: number;
        damage: Damage;
        effects: Effect[];
        hitType: number;
        occasion: number;
        repeats: number;
        scope: number;
        speed: number;
        successRate: number;
        tpGain: number;
    }

    export interface DataSkill extends Data {
        message1: string;
        message2: string;
        messageType: number;
        mpCost: number;
        requiredWtypeId1: number;
        requiredWtypeId2: number;
        stypeId: number;
        tpCost: number;
    }

    export interface DataItem extends Data {
        itypeId: number;
        price: number;
    }

    export interface DataClass extends Data {
        expParams: number[];
        traits: Trait[];
        learnings: Learning[];
        params: Array<number[]>;
    }

    export interface DataEnemy extends Data {
        id: number;
        actions: Action[];
        battlerHue: number;
        battlerName: string;
        dropItems: DropItem[];
        exp: number;
        traits: Trait[];
        gold: number;
        name: string;
        note: string;
        params: number[];
    }

    export interface DataTroop extends Data {
        id: number;
        members: Member[];
        name: string;
        pages: Page[];
    }

    export interface DataState extends Data {
        id: number;
        autoRemovalTiming: number;
        chanceByDamage: number;
        iconIndex: number;
        maxTurns: number;
        message1: string;
        message2: string;
        message3: string;
        message4: string;
        messageType: number;
        minTurns: number;
        motion: number;
        name: string;
        note: string;
        overlay: number;
        priority: number;
        releaseByDamage: boolean;
        removeAtBattleEnd: boolean;
        removeByDamage: boolean;
        removeByRestriction: boolean;
        removeByWalking: boolean;
        restriction: number;
        stepsToRemove: number;
        traits: Trait[];
    }
    
    export interface DataAnimation {
        id: number;
        displayType: number;
        effectName: string;
        flashTimings: FlashTiming[];
        name: string;
        offsetX: number;
        offsetY: number;
        rotation: Rotation;
        scale: number;
        soundTimings: SoundTiming[];
        speed: number;
    }

    export interface DataTileset extends Data {
        id: number;
        flags: number[];
        mode: number;
        name: string;
        note: string;
        tilesetNames: string[];
    }

    export interface DataCommonEvent {
        id: number;
        list: DataCommonEventList[];
        name: string;
        switchId: number;
        trigger: number;
    }

    // TODO : improve the notation for this?
    export interface DataCommonEventList {
        code: number;
        indent: number;
        parameters: Array<number[] | boolean | ParameterClass | number | string>;
    }

    export interface DataSystem {
        advanced: Advanced;
        airship: Airship;
        armorTypes: string[];
        attackMotions: AttackMotion[];
        battleBgm: BattleBgm;
        battleback1Name: string;
        battleback2Name: string;
        battlerHue: number;
        battlerName: string;
        battleSystem: number;
        boat: Airship;
        currencyUnit: string;
        defeatMe: BattleBgm;
        editMapId: number;
        elements: string[];
        equipTypes: string[];
        gameTitle: string;
        gameoverMe: BattleBgm;
        itemCategories: boolean[];
        locale: string;
        magicSkills: number[];
        menuCommands: boolean[];
        optAutosave: boolean;
        optDisplayTp: boolean;
        optDrawTitle: boolean;
        optExtraExp: boolean;
        optFloorDeath: boolean;
        optFollowers: boolean;
        optKeyItemsNumber: boolean;
        optSideView: boolean;
        optSlipDeath: boolean;
        optTransparent: boolean;
        partyMembers: number[];
        ship: Airship;
        skillTypes: string[];
        sounds: BattleBgm[];
        startMapId: number;
        startX: number;
        startY: number;
        switches: string[];
        terms: Terms;
        testBattlers: TestBattler[];
        testTroopId: number;
        title1Name: string;
        title2Name: string;
        titleBgm: BattleBgm;
        titleCommandWindow: TitleCommandWindow;
        variables: string[];
        versionId: number;
        victoryMe: BattleBgm;
        weaponTypes: string[];
        windowTone: number[];
    }

    export interface DataMapInfo {
        id: number;
        expanded: boolean;
        name: string;
        order: number;
        parentId: number;
        scrollX: number;
        scrollY: number;
    }

    export interface DataMap {
        autoplayBgm: boolean;
        autoplayBgs: boolean;
        battleback1Name: string;
        battleback2Name: string;
        bgm: Bgm;
        bgs: Bgm;
        disableDashing: boolean;
        displayName: string;
        encounterList: unknown[];
        encounterStep: number;
        height: number;
        note: string;
        parallaxLoopX: boolean;
        parallaxLoopY: boolean;
        parallaxName: string;
        parallaxShow: boolean;
        parallaxSx: number;
        parallaxSy: number;
        scrollType: number;
        specifyBattleback: boolean;
        tilesetId: number;
        width: number;
        data: number[];
        events: Array<Event | null>;
    }

    export interface Bgm {
        name: string;
        pan: number;
        pitch: number;
        volume: number;
    }

    export interface Event extends Data {
        pages: Page[];
        x: number;
        y: number;
    }

    export interface Page {
        conditions: Conditions;
        directionFix: boolean;
        image: Image;
        list: PageList[];
        moveFrequency: number;
        moveRoute: MoveRoute;
        moveSpeed: number;
        moveType: number;
        priorityType: number;
        stepAnime: boolean;
        through: boolean;
        trigger: number;
        walkAnime: boolean;
    }

    export interface Conditions {
        actorId: number;
        actorValid: boolean;
        itemId: number;
        itemValid: boolean;
        selfSwitchCh: string;
        selfSwitchValid: boolean;
        switch1Id: number;
        switch1Valid: boolean;
        switch2Id: number;
        switch2Valid: boolean;
        variableId: number;
        variableValid: boolean;
        variableValue: number;
    }


    export interface Image {
        tileId: number;
        characterName: string
        direction: number;
        pattern: number;
        characterIndex: number;
    }


    export interface PageList {
        code: number;
        indent?: number | null;
        parameters?: Array<Array<number | string> | boolean | ParameterClass | number | string>;
    }


    export interface MoveRoute {
        list: PageList[];
        repeat: boolean;
        skippable: boolean;
        wait: boolean;
    }

    export interface Advanced {
        gameId: number;
        screenWidth: number;
        screenHeight: number;
        uiAreaWidth: number;
        uiAreaHeight: number;
        numberFontFilename: string;
        fallbackFonts: string;
        fontSize: number;
        mainFontFilename: string;
    }

    export interface Airship {
        bgm: BattleBgm;
        characterIndex: number;
        characterName: string;
        startMapId: number;
        startX: number;
        startY: number;
    }

    export interface BattleBgm {
        name: string;
        pan: number;
        pitch: number;
        volume: number;
    }

    export interface AttackMotion {
        type: number;
        weaponImageId: number;
    }

    export interface Terms {
        basic: string[];
        commands: Array<null | string>;
        params: string[];
        messages: { [key: string]: string };
    }

    export interface TestBattler {
        actorId: number;
        level: number;
        equips: number[];
    }

    export interface TitleCommandWindow {
        offsetX: number;
        offsetY: number;
        background: number;
    }
    export interface ParameterClass {
        name?: string;
        volume?: number;
        pitch?: number;
        pan?: number;
        list?: ParameterList[];
        repeat?: boolean;
        skippable?: boolean;
        wait?: boolean;
        code?: number;
        parameters?: Array<number | string>;
        indent?: null;
    }

    export interface ParameterList {
        code: number;
        parameters?: Array<number | string>;
        indent?: null;
    }


    export interface FlashTiming {
        frame: number;
        duration: number;
        color: number[];
    }

    export interface Rotation {
        x: number;
        y: number;
        z: number;
    }

    export interface SoundTiming {
        frame: number;
        se: SE;
    }

    export interface SE {
        name: string;
        pan: number;
        pitch: number;
        volume: number;
    }

    export interface Member {
        enemyId: number;
        x: number;
        y: number;
        hidden: boolean;
    }

    export interface Conditions {
        actorHp: number;
        actorId: number;
        actorValid: boolean;
        enemyHp: number;
        enemyIndex: number;
        enemyValid: boolean;
        switchId: number;
        switchValid: boolean;
        turnA: number;
        turnB: number;
        turnEnding: boolean;
        turnValid: boolean;
    }

    export interface List {
        code: number;
        indent: number;
        parameters: number[];
    }

    export interface Action {
        conditionParam1: number;
        conditionParam2: number;
        conditionType: number;
        rating: number;
        skillId: number;
    }

    export interface DropItem {
        kind: number;
        dataId: number;
        denominator: number;
    }

    export interface Learning {
        level: number;
        note: string;
        skillId: number;
    }

    export interface Trait {
        code: number;
        dataId: number;
        value: number;
    }

    export interface Damage {
        critical: boolean;
        elementId: number;
        formula: string;
        type: number;
        variance: number;
    }

    export interface Effect {
        code: number;
        dataId: number;
        value1: number;
        value2: number;
    }
}

export { RPG };
