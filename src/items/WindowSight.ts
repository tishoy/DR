/**
 * 
 */
 class WindowSight extends egret.Sprite {
    public name;
    public type = "window";
    private view: egret.Bitmap;

    public _got = true;
    public inRoom = false;

    private image;

    constructor(data) {
        super();
        this.name = data.name;
        this.image = data.properties.image;

        this.view = new egret.Bitmap();
        this.view.texture = RES.getRes(this.image);
        this.addChild(this.view);
        // this.alpha = 0;
        this.anchorOffsetY = this.height;
    }

    public set got(value) {
        this._got = value;
    }

    public get got() {
        return this._got;
    }


    public reset() {
        this.got = true;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return false
    }
}