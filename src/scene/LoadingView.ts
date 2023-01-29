
class LoadingView extends egret.DisplayObjectContainer {

    private ladder: egret.Bitmap;
    private buoy: egret.Bitmap;

    private title: egret.Bitmap;


    private start_button: egret.Bitmap;


    constructor() {
        super();
        this.initView();
    }

    private initView() {


        this.title = new egret.Bitmap();
        this.title.texture = RES.getRes("title_png");
        this.title.anchorOffsetX = this.title.width / 2;
        this.title.anchorOffsetY = this.title.height / 2;
        this.title.x = AdaptManager.centerX;
        this.title.y = AdaptManager.centerY;
        this.addChild(this.title);

        this.buoy = new egret.Bitmap();
        this.buoy.texture = RES.getRes("buoy_png");
        this.buoy.x = AdaptManager.centerX + 110;
        this.buoy.y = AdaptManager.centerY - 970;
        this.addChild(this.buoy);

        this.ladder = new egret.Bitmap();
        this.ladder.texture = RES.getRes("ladder_png");
        this.ladder.x = AdaptManager.centerX - 442;
        this.ladder.y = AdaptManager.centerY - 520;
        this.addChild(this.ladder);

        this.start_button = new egret.Bitmap();
        this.start_button.texture = RES.getRes("start_button_png");
        this.start_button.x = AdaptManager.centerX + 152;
        this.start_button.y = AdaptManager.centerY + 290;
        this.start_button.anchorOffsetX = this.start_button.width / 2;
        this.start_button.anchorOffsetY = this.start_button.height / 2;
        this.start_button.touchEnabled = true;
        this.start_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchStart, this);
        this.addChild(this.start_button);

        let copyright = new egret.TextField();
        copyright.multiline = true;
        copyright.textAlign = egret.HorizontalAlign.LEFT;
        copyright.size = 20;
        copyright.textColor = ColorEnum.GRAY;
        copyright.text = "著作权人:北京奕吧科技有限公司";
        copyright.x = AdaptManager.centerX - copyright.width / 2;
        copyright.y = AdaptManager.getDisplayHeight() - 100;
        this.addChild(copyright);
    }

    public onShow(from = null) {
        egret.Tween.get(this.start_button, { loop: true }).to({
            scaleX: 1.2, scaleY: 1.2
        }, 800).to({
            scaleX: 1, scaleY: 1
        }, 800)
    }

    private onTouchStart() {
        // egret.Tween.get(this).to({ x: this.x - AdaptManager.getDisplayWidth() }, 300);


    }

    public onHide() {
        UIManager.getInstance().getLoadingLayer().removeChildren();
        return;
    }

}