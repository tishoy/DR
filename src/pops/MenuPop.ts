

class MenuPop extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private menu_pop_bg: egret.Bitmap;
    private menu_pop: egret.Bitmap;
    private select_btn: Button;
    private retry_btn: Button;
    private resume_btn: Button;
    private view: egret.Sprite;

    private title: egret.Bitmap;

    public initView() {

        this.menu_pop_bg = new egret.Bitmap();
        this.menu_pop_bg.texture = RES.getRes("pop_black_png");
        this.menu_pop_bg.width = AdaptManager.getDisplayWidth();
        this.menu_pop_bg.height = AdaptManager.getDisplayHeight();
        this.menu_pop_bg.touchEnabled = true;
        this.addChild(this.menu_pop_bg);


        this.view = new egret.Sprite();



        this.menu_pop = new egret.Bitmap();
        this.menu_pop.texture = RES.getRes("pop_bg_png");
        this.menu_pop.touchEnabled = true;
        this.view.addChild(this.menu_pop);

        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("pause_title_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.x = this.menu_pop.width / 2;
        this.title.y = 0;
        this.view.addChild(this.title);

        this.select_btn = new Button("back_btn_png");
        this.select_btn.x = 86;
        this.select_btn.y = 235;
        this.select_btn.touchEnabled = true;
        this.select_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectTouched, this);
        this.view.addChild(this.select_btn);


        this.resume_btn = new Button("resume_btn_png");
        this.resume_btn.x = 286;
        this.resume_btn.y = 235;
        this.resume_btn.touchEnabled = true;
        this.resume_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResumeTouched, this);
        this.view.addChild(this.resume_btn);

        this.retry_btn = new Button("restart_btn_png");
        this.retry_btn.x = 486;
        this.retry_btn.y = 235;
        this.retry_btn.touchEnabled = true;
        this.retry_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRetryTouched, this);
        this.view.addChild(this.retry_btn);

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

    private onTouchBackGround(e) {
    }



    private onSelectTouched(e) {
        UIManager.getInstance().closeAllPop();
    }

    private onResumeTouched(e) {
        UIManager.getInstance().closeMenuPop();
    }

    private onRetryTouched(e) {
        SceneManager.getInstance().gameScene.currentStage.onRevive();
        UIManager.getInstance().closeMenuPop();
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