/**
 * 
 */
class Tile extends egret.Bitmap {
    private _id;
    private type;

    constructor(data) {
        super();
        this.type = data.type;
        if (this.type == "wangsets") {
            this._id = data.tileid;
            this.texture = data.image;
        } else {
            this._id = data.id;
            this.urlToTexture(data.image);
            this.width = data.width;
            this.height = data.height;
        }

        this.anchorOffsetX = 0;
        this.anchorOffsetY = this.height;
        if (data.properties != undefined) {
            for (let i = 0; i < data.properties.length; i++) {

            }
        }
    }

    public get id() {
        return this._id;
    }

    private urlToTexture(url: string) {
        let path = url.split("/");
        let filename = path[path.length - 1];
        this.texture = RES.getRes(filename.replace(".", "_"));
    }
}