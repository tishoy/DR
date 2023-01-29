/**
 * 
 */
class RoadSwitch extends egret.Sprite {

    public static SWITCH_ON = true;;
    public static SWITCH_OFF = false;

    private _id: number;
    public name;
    public layer;

    private _status;
    private view;
    private on = [];
    private off = [];
    public type = "switch";

    public got = false;
    public inRoom = false;

    private mc: egret.MovieClip;
    constructor(data) {
        super();
        this.name = data.name;
        this._id = data.id
        this.layer = data.properties.layer;
        this.on = data.properties.on.split(",");
        this.off = data.properties.off.split(",");

        this.got = false;

        // this.view = new egret.Bitmap();
        // this.view.texture = RES.getRes("switch_png");
        // this.addChild(this.view);
        // this.anchorOffsetY = this.height;

        this.mc = new egret.MovieClip(AnimateController.getInstance().getAnimate("switch_off"));
        this.mc.play(-1);
        this.addChild(this.mc);
        this.mc.x = 60;
        this.mc.y = -60;


    }

    public set status(value) {
        this._status = value;
        if (this._status) {
            this.mc.movieClipData = AnimateController.getInstance().getAnimate("switch_on");
        } else {
            this.mc.movieClipData = AnimateController.getInstance().getAnimate("switch_off");
        }
    }

    public get status() {
        return this._status;
    }

    public getRoomStatus() {
        if (this._status) {
            return this.on;
        }
        return this.off;
    }

    public reset() {
        this.got = false;
        this.inRoom = false;
        this.status = false;
    }

    public setVisible(value) {
        if (!value) {
            this.view.alpha = 0;
        }
    }

    public areaHitTest(x, y) {
        return this.mc.hitTestPoint(x, y)
    }

}