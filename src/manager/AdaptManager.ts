/**
 * 屏幕适配管理器
 * create by 18tech
 * 
 * 2022.7.1
 */
class AdaptManager {

    private static instance: AdaptManager = null;
    private static egretStage: egret.Stage;

    private static _scaleMode;

    private static _fixedHeight = 0;
    private static _fixedWidth = 0;
    private static _fixed = 0;

    constructor() {
    }

    public init(egretStage: egret.Stage): void {
        AdaptManager.egretStage = egretStage;
        AdaptManager.gameScreenAdapt(egretStage);
    }

    public static getInstance(): AdaptManager {
        if (this.instance === null) {
            this.instance = new AdaptManager();
        }
        return this.instance;
    }

    /**
     * 手机宽度 像素
     */
    static getPixelWidth() {
        return platform.curWidth();
    }

    /**
     * 手机高度 像素
     */
    static getPixelHeight() {
        return platform.curHeight();
    }

    /**
     * 获取游戏实际展示的宽度 根据游戏不同动态调整
     */
    static getDisplayWidth() {
        return this.egretStage.stageWidth;
    }

    /**
     * 获取游戏实际展示的高度 根据游戏不同动态调整
     */
    static getDisplayHeight() {
        return this.egretStage.stageHeight;
    }

    static get scaleRate() {
        return this.getDisplayWidth() / this.GameWidth;
    }

    //游戏设计的宽度
    static get GameWidth() {
        return 980
        // return GameManager.getInstance().getGameConfig().stageWidth;
    }

    static get GameHeight() {
        return 1740
        // return GameManager.getInstance().getGameConfig().stageHeight;
    }

    /**
     * 实际宽高比
     */
    static getPixelRate() {
        return this.getPixelWidth() / this.getPixelHeight();
    }

    static getDisplayRate() {
        return this.getDisplayWidth() / this.getDisplayHeight();
    }

    /**
     * 游戏设计宽高比
     */
    static getGameRate() {
        return this.GameWidth / this.GameHeight;
    }


    static gameScreenAdapt(stage) {
        /**
         * 长宽适配方案
         */
        AdaptManager._fixed = (stage.stageHeight - this.GameHeight) != 0 ?
            (stage.stageHeight - this.GameHeight) / 2
            : (stage.stageWidth - this.GameWidth) / 2;
        if (this.getDisplayRate() < this.getGameRate()) {
            AdaptManager._scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            stage.scaleMode = AdaptManager.scaleMode;
            AdaptManager._fixedHeight = this._fixed;
            AdaptManager._fixedWidth = 0;
        } else {
            AdaptManager._scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
            stage.scaleMode = AdaptManager.scaleMode;
            AdaptManager._fixedWidth = this._fixed;
            AdaptManager._fixedHeight = 0;
        }

    }

    static get fixedHeight() {
        return this._fixedHeight;
    }

    static get fixedWidth() {
        return this._fixedWidth;
    }

    static get centerX() {
        return this.GameWidth / 2 + this._fixedWidth;
    }

    static get centerY() {
        return this.GameHeight / 2 + this._fixedHeight;
    }

    static get scaleMode() {
        return this._scaleMode;
    }

}