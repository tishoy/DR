/**
 * 
 */
class SwitchButton extends egret.Sprite {
    constructor(on_texture, off_texture, bg_texture = "") {
        super();
        this.bg_texture = bg_texture;
        this.on_texture = on_texture;
        this.off_texture = off_texture;
        this.initView();
    }
    private bg: egret.Bitmap;

    private view: egret.Bitmap;
    private _status: boolean;
    private bg_texture: string;
    private on_texture: string;
    private off_texture: string;

    private initView() {
        if (this.bg_texture != "") {
            this.bg = new egret.Bitmap;
            this.bg.texture = RES.getRes(this.bg_texture);
            this.addChild(this.bg);
        }

        this.view = new egret.Bitmap;
        this.view.texture = RES.getRes(this.on_texture);
        this.addChild(this.view);
    }

    public set status(value) {
        this._status = value;
        if (this._status) {
            this.view.texture = RES.getRes(this.on_texture);
        } else {
            this.view.texture = RES.getRes(this.off_texture);
        }
    }
}
