/**
 * 
 */
class Fire extends egret.Sprite {
    private _id: number;
    private _sight: number;
    public name;
    public type = "fire";
    public got = false;
    public inRoom = false;

    private mc: egret.MovieClip;
    private view: egret.Bitmap;

    constructor(data) {
        super();
        this.name = data.name;
        this._id = data.id;

        this.got = false;


        this.mc = new egret.MovieClip(AnimateController.getInstance().getAnimate("fire"));
        this.mc.play(-1);
        this.addChild(this.mc);
        this.mc.x = 60;
        this.mc.y = -60;
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