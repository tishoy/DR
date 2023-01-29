/**
 * 
 */
class Tileset {
    private _columns;
    private _grid;
    private _margin
    private _name;
    private _objectalignment;
    private _spacing;
    private _tilecount;
    private _tiledversion;
    private _tileheight;
    private _tiles = [];
    private _tilewidth;
    private _transformations;
    private _type;
    private _version;

    // 类型2
    private _image;
    private _imageheight;
    private _imagewidth;
    private _wangsets = [];

    private _firstgid

    constructor(source: string, firstgid = 0) {
        let path = source.split("/");
        let file = path[path.length - 1];
        let data = RES.getRes(file.replace(".", "_"));

        this._type = data.type;



        this._columns = data.columns;
        this._grid = data.grid;
        this._margin = data.margin;
        this._name = data.name;
        this._objectalignment = data.objectalignment;
        this._spacing = data.spacing;
        this._tilecount = data.tilecount;
        this._tiledversion = data.tiledversion;

        this._firstgid = firstgid;

        this._image = data.image;
        this._imageheight = data.imageheight;
        this._imagewidth = data.imagewidth;
        this._tilewidth = data.tilewidth;
        this._tileheight = data.tileheight;

        if (data.tiles != undefined) {
            this.initTiles(data.tiles);
        }
        if (data.wangsets != undefined) {
            this.initWangTiles();
        }

    }


    private initTiles(dataTiles) {
        if (dataTiles.length == undefined) {
            for (let key in dataTiles) {
                dataTiles[key]["id"] = key;
                dataTiles[key]["type"] = "tilesets";
                this._tiles.push(dataTiles[key]);
            }
        } else {
            for (let i = 0; i < this.tilecount; i++) {
                dataTiles[i]["type"] = "tilesets";
                this._tiles.push(dataTiles[i]);
            }
        }

    }

    private initWangTiles() {


        for (let i = 0; i < this._tilecount; i++) {
            let render_texture: egret.RenderTexture = new egret.RenderTexture();
            let wang_texture: egret.Texture = RES.getRes(this._image.replace(".", "_"));
            let bitmap = new egret.Bitmap(wang_texture);
            render_texture.drawToTexture(bitmap, new egret.Rectangle(this._tilewidth * (i % this._columns), this._tileheight * Math.floor(i / this._columns), this._tilewidth, this._tileheight))
            this._tiles.push({
                id: i, type: "wangsets",
                image: render_texture
            });
        }
    }

    public generateTileById(id) {
        for (let i = 0; i < this._tiles.length; i++) {
            if (this._tiles[i].id == id) {
                return new Tile(this._tiles[i]);
            }
        }
        throw new Error("id超出图集");
    }

    public get tilecount() {
        return this._tilecount;
    }

    public get firstgid() {
        return this._firstgid;
    }
}