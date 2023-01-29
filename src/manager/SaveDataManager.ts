class SaveDataManager {

    private static instance: SaveDataManager = null;

    private _currentGame: number = 0;
    private saves = {};


    constructor() {
        if (SaveDataManager.instance !== null) {
            throw new Error("single instance error");
        }
    }


    public static getInstance(): SaveDataManager {
        if (this.instance === null) {
            this.instance = new SaveDataManager();
        }
        return this.instance;
    }

    /**
        * 声音存储
        * status: "1" playing "0" silence
        */
    public saveBgmStatus(status) {
        egret.localStorage.setItem("bgm", status);
    }

    public getBgmStatus() {
        return egret.localStorage.getItem("bgm");
    }

    /**
     * 声音存储
     * status: "1" playing "0" silence
     */
    public saveSoundStatus(status) {
        egret.localStorage.setItem("sound", status);
    }

    public getSoundStatus() {
        return egret.localStorage.getItem("sound");
    }

    /**
     * 语言设置
     */
    public getLang() {
        return egret.localStorage.getItem("lang")
    }

    public setLang(lang) {
        egret.localStorage.setItem("lang", lang);
    }


}