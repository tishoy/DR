/**
 * 
 */
class Key extends egret.Sprite {
    private _id: number;

    private view;
    private mc: egret.MovieClip;
    private _got;
    public name;
    public type = "key";

    public inRoom = false;

    constructor(data) {
        super();
        console.log(data);
        this._id = data.id;
        this.name = data.name;
        this._got = false;


        this.mc = new egret.MovieClip(AnimateController.getInstance().getAnimate("key"));
        this.mc.play(-1);
        this.addChild(this.mc);
        this.mc.x = 60;
        this.mc.y = -60;

        // this.view = new egret.Bitmap();
        // this.view.texture = RES.getRes("keyw_png");
        // this.addChild(this.view);
        // this.anchorOffsetY = this.height;


    }

    public get id() {
        return this._id;
    }

    public get got() {
        return this._got;
    }

    public set got(value) {
        this._got = value;
    }

    public gotKey() {
        this._got = true;
    }


    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return this.mc.hitTestPoint(x, y)
    }
}