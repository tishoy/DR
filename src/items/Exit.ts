/**
 * 
 */
class Exit extends egret.Sprite {

    public name;
    private view;
    public type = "exit";


    public got = false;
    public inRoom = false;
    private mc: egret.MovieClip;

    constructor(data) {
        super();
        this.name = data.name;

        this.mc = new egret.MovieClip(AnimateController.getInstance().getAnimate("arrow"));
        this.mc.play(-1);
        this.addChild(this.mc);
        this.mc.x = 60;
        this.mc.y = -60;
        // this.view = new egret.Bitmap();
        // this.view.texture = RES.getRes("channel_png")
        // this.addChild(this.view);
        // this.anchorOffsetY = this.height;
    }

    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return this.mc.hitTestPoint(x, y)
    }
}