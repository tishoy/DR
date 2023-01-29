/**
 * 
 */
class Upstair extends egret.Sprite {
    public name;
    public type = "upstair";

    private view: egret.Bitmap;

    public got = false;
    public inRoom = false;

    public goto;
    public posx;
    public posy;

    constructor(data) {
        super();
        this.name = data.name;
        this.goto = data.properties.goto;
        this.posx = data.properties.posx;
        this.posy = data.properties.posy;

        this.view = new egret.Bitmap();
        this.view.texture = RES.getRes("channel_png")
        this.addChild(this.view);
        this.anchorOffsetY = this.height;
    }


    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return this.view.hitTestPoint(x, y)
    }
}