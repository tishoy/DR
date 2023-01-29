/**
 * 
 */
class Light extends egret.Sprite {
    private _id: number;
    private _sight: number;
    public name;
    public type = "light";
    public got = false;
    public inRoom = false;

    private mc: egret.MovieClip;
    private view: egret.Bitmap;

    constructor(data) {
        super();
        this.name = data.name;
        this._id = data.id;
        this._sight = data.properties.sight;

        this.got = false;

        this.mc = new egret.MovieClip(AnimateController.getInstance().getAnimate("light"));
        this.mc.play(-1);
        this.addChild(this.mc);
        this.mc.x = 60;
        this.mc.y = -60;

        // this.view = new egret.Bitmap();
        // this.view.texture = RES.getRes("light_png");
        // this.addChild(this.view);
        // this.anchorOffsetY = this.height;
    }

    public get id() {
        return this._id;
    }

    public get sight() {
        return this._sight;
    }


    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return this.mc.hitTestPoint(x, y)
    }
}