/**
 * 
 */

class Button extends egret.Sprite {
    constructor(texture) {
        super();
        this.initView(texture);
    }

    private bg: egret.Bitmap;

    private initView(texture) {
        this.bg = new egret.Bitmap;
        this.bg.texture = RES.getRes("button_bg_png");
        this.addChild(this.bg);

        let view = new egret.Bitmap;
        view.texture = RES.getRes(texture);
        this.addChild(view);

    }
}