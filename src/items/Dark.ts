/**
 * 
 */
class Dark extends egret.Sprite {
    public name;
    public type = "dark";
    private view: egret.Bitmap;

    public got = false;
    public inRoom = false;

    constructor(data) {
        super();
        this.name = data.name;

        this.view = new egret.Bitmap();
        this.view.texture = RES.getRes("map7-dark_png");
        this.view.visible = true;

        this.addChild(this.view);
        this.anchorOffsetY = this.height;
    }


    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return false
    }
}
