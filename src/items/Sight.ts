/**
 * 
 */
class Sight extends egret.Sprite {
    public name;
    public type = "sight";
    private view: egret.Bitmap;

    public _got = false;
    public inRoom = false;

    private image;

    constructor(data) {
        super();
        this.name = data.name;
        this.image = data.properties.image;

        this.view = new egret.Bitmap();
        this.view.texture = RES.getRes(this.image);
        this.alpha = 0;
        this.view.visible = false;
        this.addChild(this.view);
        this.anchorOffsetY = this.height;
    }

    public set got(value) {
        console.log(value);
        this._got = value;
        this.alpha = 1;
        this.view.visible = this._got;
    }

    public get got() {
        return this._got;
    }


    public reset() {
        this.got = false;
        this.view.visible = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return false
    }
}