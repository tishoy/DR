class SettingController {

    static instance: SettingController = null;

    private _bgmPlaying: boolean;
    private _soundEffect: boolean;

    private _lang: string;

    constructor() {
        this.init();
    }

    init() {

    }

    public static getInstance(): SettingController {
        if (this.instance === null) {
            this.instance = new SettingController();
        }
        return this.instance;
    }

    get BgmPlaying() {
        if (this._bgmPlaying === undefined) {
            let bgmPlaying = SaveDataManager.getInstance().getBgmStatus();
            if (bgmPlaying === null || bgmPlaying === undefined || bgmPlaying === "" || bgmPlaying === "1") {
                this._bgmPlaying = true;
            } else {
                this._bgmPlaying = bgmPlaying === "1" ? true : false;
            }
        }
        return this._bgmPlaying
    }

    set BgmPlaying(playing: boolean) {
        this._bgmPlaying = playing;
        if (playing) {
            SaveDataManager.getInstance().saveBgmStatus("1");
            SoundManager.getInstance().playBGM();
        } else {
            SaveDataManager.getInstance().saveBgmStatus("0");
            SoundManager.getInstance().stopBGM();
        }
    }

    get SoundEffect() {
        if (this._soundEffect === undefined) {
            let soundEffect = SaveDataManager.getInstance().getSoundStatus();
            if (soundEffect === null || soundEffect === undefined || soundEffect === "" || soundEffect === "1") {
                this._soundEffect = true;
            } else {
                this._soundEffect = soundEffect === "1" ? true : false;
            }
        }
        return this._soundEffect
    }

    set SoundEffect(playing: boolean) {
        this._soundEffect = playing;
        if (playing) {
            SaveDataManager.getInstance().saveSoundStatus("1");
            SoundManager.getInstance().playSound(SoundEnum.TOUCH_CORRECT_MP3);
        } else {
            SaveDataManager.getInstance().saveSoundStatus("0");
        }
    }

    get Lang() {
        if (this._lang === undefined) {
            let lang = SaveDataManager.getInstance().getLang();
            if (lang === null || lang === undefined || lang === "") {
                this.Lang = "zh_CN"
            } else {
                this._lang = lang;
            }
        }
        return this._lang
    }

    set Lang(lang) {
        SaveDataManager.getInstance().setLang(lang);
        this._lang = lang;
    }

}