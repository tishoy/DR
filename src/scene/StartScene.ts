/**
 * 
 */

class StartScene extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.initView();
    }

    private background: egret.Bitmap;

    private start_btn: egret.Bitmap;
    private load_btn: egret.Bitmap;
    private setting_btn: egret.Bitmap;
    private music_switch: SwitchButton;
    private back_btn: egret.Bitmap;
    private sound_switch: SwitchButton;

    private initView() {

        this.background = new egret.Bitmap();
        this.background.texture = RES.getRes("background_png");
        this.background.anchorOffsetX = this.background.width / 2;
        this.background.anchorOffsetY = this.background.height / 2;
        this.background.x = AdaptManager.centerX;
        this.background.y = AdaptManager.centerY;
        this.addChild(this.background);

        this.start_btn = new egret.Bitmap();
        this.start_btn.texture = RES.getRes("start_btn_png");
        this.start_btn.anchorOffsetX = this.start_btn.width / 2;
        this.start_btn.anchorOffsetY = this.start_btn.height / 2;
        this.start_btn.x = AdaptManager.centerX;
        this.start_btn.y = AdaptManager.fixedHeight + 1260;
        this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStart, this);
        this.start_btn.visible = true;
        this.start_btn.touchEnabled = true;
        this.addChild(this.start_btn);

        let can_load_game = !GameController.getInstance().isNewPlayer() && !GameController.getInstance().isGameOver();
        console.log(can_load_game);

        this.load_btn = new egret.Bitmap();
        this.load_btn.texture = RES.getRes("load_btn_png");
        this.load_btn.anchorOffsetX = this.load_btn.width / 2;
        this.load_btn.anchorOffsetY = this.load_btn.height / 2;
        this.load_btn.x = AdaptManager.centerX;
        this.load_btn.y = this.start_btn.y + this.start_btn.height;
        this.load_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLoad, this);
        this.load_btn.visible = can_load_game;
        this.load_btn.touchEnabled = true;
        this.addChild(this.load_btn);

        this.setting_btn = new egret.Bitmap();
        this.setting_btn.texture = RES.getRes("setting_btn_png");
        this.setting_btn.anchorOffsetX = this.setting_btn.width / 2;
        this.setting_btn.anchorOffsetY = this.setting_btn.height / 2;
        this.setting_btn.x = AdaptManager.centerX;
        this.setting_btn.y = !can_load_game ? (this.start_btn.y + this.start_btn.height) : (this.load_btn.y + this.load_btn.height);
        this.setting_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSetting, this);
        this.setting_btn.visible = true;
        this.setting_btn.touchEnabled = true;
        this.addChild(this.setting_btn);

        this.music_switch = new SwitchButton("music_on_png", "music_off_png");
        this.music_switch.anchorOffsetX = this.music_switch.width / 2;
        this.music_switch.anchorOffsetY = this.music_switch.height / 2;
        this.music_switch.x = AdaptManager.centerX;
        this.music_switch.y = AdaptManager.fixedHeight + 1260;
        this.music_switch.status = SettingController.getInstance().BgmPlaying;
        this.music_switch.visible = false;
        this.music_switch.touchEnabled = true;
        this.music_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicSwitch, this);
        this.addChild(this.music_switch);

        this.sound_switch = new SwitchButton("sound_on_png", "sound_off_png");
        this.sound_switch.anchorOffsetX = this.sound_switch.width / 2;
        this.sound_switch.anchorOffsetY = this.sound_switch.height / 2;
        this.sound_switch.x = AdaptManager.centerX;
        this.sound_switch.y = this.music_switch.y + this.music_switch.height;
        this.sound_switch.status = SettingController.getInstance().SoundEffect;
        this.sound_switch.visible = false;
        this.sound_switch.touchEnabled = true;
        this.sound_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundSwitch, this);
        this.addChild(this.sound_switch);

        this.back_btn = new egret.Bitmap();
        this.back_btn.texture = RES.getRes("back_btn_png");
        this.back_btn.anchorOffsetX = this.back_btn.width / 2;
        this.back_btn.anchorOffsetY = this.back_btn.height / 2;
        this.back_btn.x = AdaptManager.centerX;
        this.back_btn.y = this.sound_switch.y + this.sound_switch.height;
        this.back_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        this.back_btn.visible = false;
        this.back_btn.touchEnabled = true;
        this.addChild(this.back_btn);

        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(e) {
        let can_load_game = !GameController.getInstance().isNewPlayer() && !GameController.getInstance().isGameOver();
        console.log(can_load_game);
        this.load_btn.visible = can_load_game;
        this.setting_btn.y = !can_load_game ? (this.start_btn.y + this.start_btn.height) : (this.load_btn.y + this.load_btn.height);
    }

    private onMusicSwitch(e) {
        SettingController.getInstance().BgmPlaying = !SettingController.getInstance().BgmPlaying;
        this.music_switch.status = SettingController.getInstance().BgmPlaying;
    }

    private onSoundSwitch(e) {
        SettingController.getInstance().SoundEffect = !SettingController.getInstance().SoundEffect;
        this.sound_switch.status = SettingController.getInstance().SoundEffect;
    }

    private onStart(e) {
        GameController.getInstance().restartGame();
        SceneManager.getInstance().toGameScene();
        SceneManager.getInstance().gameScene.updateStage();
    }

    private onLoad(e) {
        GameController.getInstance().continueGame();
        SceneManager.getInstance().toGameScene();
        SceneManager.getInstance().gameScene.updateStage();
    }

    private onSetting(e) {
        this.start_btn.visible = false;
        this.load_btn.visible = false;
        this.setting_btn.visible = false;
        this.music_switch.visible = true;
        this.sound_switch.visible = true;
        this.back_btn.visible = true;
    }

    private onBack(e) {
        let can_load_game = !GameController.getInstance().isNewPlayer() && !GameController.getInstance().isGameOver();

        this.start_btn.visible = true;
        this.load_btn.visible = true && can_load_game;
        this.setting_btn.visible = true;
        this.music_switch.visible = false;
        this.sound_switch.visible = false;
        this.back_btn.visible = false;
    }

}