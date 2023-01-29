

class ClearPop extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private clear_pop_container: egret.Bitmap;
    private clear_pop: egret.Bitmap;
    private title: egret.Bitmap;
    private view: egret.Sprite;
    private retry_btn: Button;
    private select_btn: Button;
    private next_btn: Button;


    public initView() {

        this.clear_pop_container = new egret.Bitmap();
        this.clear_pop_container.texture = RES.getRes("pop_black_png");
        this.clear_pop_container.width = AdaptManager.getDisplayWidth();
        this.clear_pop_container.height = AdaptManager.getDisplayHeight();
        this.clear_pop_container.touchEnabled = true;
        this.addChild(this.clear_pop_container);

        this.view = new egret.Sprite();


        this.clear_pop = new egret.Bitmap();
        this.clear_pop.texture = RES.getRes("pop_bg_png");
        this.clear_pop.touchEnabled = true;
        this.view.addChild(this.clear_pop);

        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("clear_title_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.x = this.clear_pop.width / 2;
        this.title.y = 0;
        this.view.addChild(this.title);

        this.select_btn = new Button("back_btn_png");
        this.select_btn.x = 86;
        this.select_btn.y = 235;
        this.select_btn.touchEnabled = true;
        this.select_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSelectTouched, this);
        this.view.addChild(this.select_btn);


        this.next_btn = new Button("next_btn_png");
        this.next_btn.x = 286;
        this.next_btn.y = 235;
        this.next_btn.touchEnabled = true;
        this.next_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNextTouched, this);
        this.view.addChild(this.next_btn);

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
        // this.menu_pop_bg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBackGround, this);


    }


    private onSelectTouched(e) {
        // UIManager.getInstance().closeAllPop();
        // SceneManager.getInstance().gameScene.gameEnd();
    }

    private onNextTouched(e) {
        UIManager.getInstance().closeClearPop();
        // SceneManager.getInstance().gameScene.nextStage();

    }

    private onRetryTouched(e) {
        // SceneManager.getInstance().gameScene.currentStage.onRevive();
        // UIManager.getInstance().closeClearPop();
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