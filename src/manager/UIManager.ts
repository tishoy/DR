class UIManager {

    // private static instance: SoundManager;
    static instance: UIManager = null;

    private gameLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private loadingLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private uiLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private popLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private tipLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();


    private egretStage: egret.Stage;


    private currentPop: PopBase;
    private clearPop: ClearPop;
    private settingPop: SettingPop;
    private menuPop: MenuPop;
    private failPop: FailPop;
    // private jumpStagePop: JumpStagePop;

    public isPopUp: boolean = false;

    private uiConfig;
    private popConfig;

    public uiList = [];

    public canMoveScene = true;

    constructor() {
    }

    public init(egretStage: egret.Stage): void {
        this.egretStage = egretStage;
        this.egretStage.addChild(this.gameLayer);
        this.egretStage.addChild(this.uiLayer);
        this.egretStage.addChild(this.popLayer);
        this.egretStage.addChild(this.loadingLayer);
        this.egretStage.addChild(this.tipLayer);
    }


    public initUI() {
        // 通过UI配置表读取UI

    }

    public static getInstance(): UIManager {
        if (this.instance === null) {
            this.instance = new UIManager();
        }
        return this.instance;
    }

    public show(ui) {
        this.uiLayer.addChild(ui);
    }

    public hide(ui) {
        if (this.uiLayer.contains(ui)) {
            this.uiLayer.removeChild(ui);
        }
    }





    setUIPosition(ui: egret.DisplayObject, posType: number, x = 0, y = 0) {
        switch (posType) {
            case PosTypeEnum.L_B:
                ui.x = x + ui.width / 2;
                ui.y = AdaptManager.getDisplayHeight() - ui.height / 2 - y - AdaptManager.fixedHeight;
                break;

            case PosTypeEnum.B:
                ui.x = AdaptManager.getDisplayWidth() / 2;
                ui.y = AdaptManager.getDisplayHeight() - ui.height / 2 - y - AdaptManager.fixedHeight;
                break;

            case PosTypeEnum.R_B:
                ui.x = AdaptManager.getDisplayWidth() - ui.width / 2 - x;
                ui.y = AdaptManager.getDisplayHeight() - ui.height / 2 - y - AdaptManager.fixedHeight;
                break;

            case PosTypeEnum.L:
                ui.x = x + ui.width / 2;
                ui.y = AdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.M:
                ui.x = AdaptManager.getDisplayWidth() / 2;
                ui.y = AdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.R:
                ui.x = AdaptManager.getDisplayWidth() - x - ui.width / 2;
                ui.y = AdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.L_T:
                ui.x = x + ui.width / 2;
                ui.y = ui.height + y + AdaptManager.fixedHeight;
                break;

            case PosTypeEnum.T:
                ui.x = AdaptManager.getDisplayWidth() / 2;
                ui.y = ui.height + y + AdaptManager.fixedHeight;
                break;

            case PosTypeEnum.R_T:
                ui.x = AdaptManager.getDisplayWidth() - x - ui.width / 2;
                ui.y = ui.height + y + AdaptManager.fixedHeight;
                break;
        }
    }

    setUIRelation(uiParent, uiChild, typeList, x = 0, y = 0) {
        let OorI = typeList[0];
        let posType = typeList[1];
        switch (posType) {
            case PosTypeEnum.L_B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.R_B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.L:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                }
                break;

            case PosTypeEnum.M:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x;
                    uiChild.y = uiParent.y + y;
                }
                break;

            case PosTypeEnum.R:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y;
                }
                break;

            case PosTypeEnum.L_T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;

            case PosTypeEnum.T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;

            case PosTypeEnum.R_T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;
        }
    }



    //--------------------------Pops--------------------------
    public setCurrentPop(pop) {
        this.currentPop = pop;
    }

    public getCurrentPop() {
        return this.currentPop;
    }



    /**
     * 打開過關彈窗
     * 打開關閉動畫 淡入淡出
     */
    public openClearPop(): void {
        this.closeAllPop();
        if (this.clearPop == null) {
            this.clearPop = new ClearPop();
            // this.clearPop.setCollections(card);
            this.getPopLayer().addChild(this.clearPop);
            this.currentPop = this.clearPop;
            this.isPopUp = true;
        }

    }

    public closeClearPop(): void {
        if (this.clearPop != null) {
            this.popLayer.removeChild(this.clearPop);
            this.clearPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }

    public openMenuPop(): void {
        this.closeAllPop();
        if (this.menuPop == null) {
            this.menuPop = new MenuPop();
            // this.clearPop.setCollections(card);
            this.getPopLayer().addChild(this.menuPop);
            this.currentPop = this.menuPop;
            this.isPopUp = true;
        }

    }

    public closeMenuPop(): void {
        if (this.menuPop != null) {
            this.popLayer.removeChild(this.menuPop);
            this.menuPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }



    public openSettingPop(): void {
        this.closeAllPop();
        if (this.settingPop == null) {
            this.isPopUp = true;
            this.settingPop = new SettingPop();
            // this.gameOverPop.setCollections(card);
            this.popLayer.addChild(this.settingPop);
            this.currentPop = this.settingPop;
        }
    }

    public closeSettingPop(): void {
        if (this.settingPop != null) {
            this.popLayer.removeChild(this.settingPop);
            this.settingPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }

    public openFailPop() {
        this.closeAllPop();
        if (this.menuPop == null) {
            this.menuPop = new MenuPop();
            // this.clearPop.setCollections(card);
            this.getPopLayer().addChild(this.menuPop);
            this.currentPop = this.menuPop;
            this.isPopUp = true;
        }
    }

    public closeFailPop() {
        if (this.settingPop != null) {
            this.popLayer.removeChild(this.failPop);
            this.settingPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }


    public closeAllPop(): void {
        this.closeClearPop();
        this.closeSettingPop();
        this.closeMenuPop();
        this.closeFailPop();
    }










    // ----------------------------Layers---------------------    

    public getGameLayer(): egret.DisplayObjectContainer {
        return this.gameLayer;
    }

    public getUILayer(): egret.DisplayObjectContainer {
        return this.uiLayer;
    }

    public getLoadingLayer(): egret.DisplayObjectContainer {
        return this.loadingLayer;
    }


    public getPopLayer(): egret.DisplayObjectContainer {
        return this.popLayer;
    }

    public getTipLayer(): egret.DisplayObjectContainer {
        return this.tipLayer;
    }





}