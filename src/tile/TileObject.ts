/**
 * 
 */
class TileObject extends egret.Sprite {
    private _id;
    private _gid;
    private _type;
    private _ellipse;
    private _properties = [];

    private bmp: egret.Bitmap;
    constructor(data) {
        super();
        this._gid = data.gid;
        if (this._gid !== undefined) {
        }
        this._ellipse = data.ellipse;
        if (this._ellipse != undefined) {

        }
        this._id = data.id;
        this._type = data.type;
        this.width = data.width;
        this.height = data.height;
        this.anchorOffsetX = 0;
        this.anchorOffsetY = this.height;
        this._properties = data.properties;
        if (data.properties != undefined) {
            for (let i = 0; i < data.properties.length; i++) {

            }
        }
    }

    public get id() {
        return this._id;
    }

    public get type() {
        return this._type;
    }

    public get properties() {
        return this._properties;
    }

    public set properties(value) {
        this._properties = value;
    }

    private urlToTexture(url: string) {
        let path = url.split("/");
        let filename = path[path.length - 1];
        this.bmp.texture = RES.getRes(filename.replace(".", "_"));
    }
}