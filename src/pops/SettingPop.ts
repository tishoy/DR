

class SettingPop extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private pop_container: egret.Bitmap;
    private setting_pop: egret.Bitmap;
    private title: egret.Bitmap;
    private view: egret.Sprite;
    private back_button: Button;
    private sound_switch: SwitchButton;
    private music_switch: SwitchButton;


    public initView() {
        this.pop_container = new egret.Bitmap();
        this.pop_container.texture = RES.getRes("pop_black_png");
        this.pop_container.width = AdaptManager.getDisplayWidth();
        this.pop_container.height = AdaptManager.getDisplayHeight();
        this.pop_container.touchEnabled = true;
        this.addChild(this.pop_container);

        this.view = new egret.Sprite();


        this.setting_pop = new egret.Bitmap();
        this.setting_pop.texture = RES.getRes("pop_bg_png");
        this.setting_pop.touchEnabled = true;
        this.view.addChild(this.setting_pop);

        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("setting_title_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.x = this.setting_pop.width / 2;
        this.title.y = 0;
        this.view.addChild(this.title);

        this.back_button = new Button("back_btn_png");
        this.back_button.x = 86;
        this.back_button.y = 235;
        this.back_button.touchEnabled = true;
        this.back_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackTouched, this);
        this.view.addChild(this.back_button);

        this.music_switch = new SwitchButton("music_on_png", "music_off_png");
        this.music_switch.x = 286;
        this.music_switch.y = 235;
        this.music_switch.touchEnabled = true;
        this.music_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMusicSwitch, this);
        this.view.addChild(this.music_switch);

        this.sound_switch = new SwitchButton("sound_on_png", "sound_off_png");
        this.sound_switch.x = 486;
        this.sound_switch.y = 235;
        this.sound_switch.touchEnabled = true;
        this.sound_switch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundSwitch, this);
        this.view.addChild(this.sound_switch);



        this.view.anchorOffsetX = this.view.width / 2;
        this.view.anchorOffsetY = this.view.height / 2;
        this.view.x = AdaptManager.centerX;
        this.view.y = AdaptManager.centerY;
        this.view.scaleX = this.view.scaleY = 0.2;
        this.addChild(this.view);




        egret.Tween.get(this.view).to({
            scaleX: 1, scaleY: 1
        }, 500, egret.Ease.backOut);
    }


    private onBackTouched(e) {
        UIManager.getInstance().closeSettingPop();
    }

    private onMusicSwitch(e) {
        SettingController.getInstance().BgmPlaying = !SettingController.getInstance().BgmPlaying;
        if (SettingController.getInstance().BgmPlaying) {
            this.music_switch.status = true;
        } else {
            this.music_switch.status = false;
        }

    }

    private onSoundSwitch(e) {
        SettingController.getInstance().SoundEffect = !SettingController.getInstance().SoundEffect;
        if (SettingController.getInstance().SoundEffect) {
            this.sound_switch.status = true;
        } else {
            this.sound_switch.status = false;
        }
    }


    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    play_loop() {

    }
}