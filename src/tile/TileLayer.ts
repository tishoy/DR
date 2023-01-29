/**
 * 
 */
class TileLayer extends egret.Sprite {

    private _data: Array<number> = [];
    private _height;
    private _id;
    private _locked;
    public name;
    private _opacity;
    private _type;
    // private _visible;
    private _width;
    private _x;
    private _y;
    public offsetx;
    public offsety;
    public _tiles: Array<Tile> = [];

    constructor(dataLayer) {
        super();
        this._height = dataLayer.heigth;
        this._width = dataLayer.width;
        this.visible = dataLayer.visible;
        this._type = dataLayer.type;
        this.name = dataLayer.name;
        this.offsetx = dataLayer.offsetx;
        this.offsety = dataLayer.offsety
        this._opacity = dataLayer.opacity;
        // this.x = dataLayer.x + this.offsetx;
        // this.y = dataLayer.y + this.offsety;
    }

    public get type() {
        return this._type;
    }

    public getTile(index) {
        return this._tiles[index];
    }

    public get id() {
        return this._id;
    }

    public cleanData() {
        this._data = [];
    }

    public unshiftInData(tile) {
        this._data.unshift(tile)
    }

    public get data() {
        return this._data;
    }

    getXOffset(value1, value2) {
        return value2 % this._height - value1 % this._height;
    }

    getYOffset(value1, value2) {
        return Math.floor(value2 / this._width) - Math.floor(value1 / this._width);
    }

    sameRow(value1, value2) {
        return Math.floor(value1 / this._width) === Math.floor(value2 / this._width)
    }

    sameCol(value1, value2) {
        return value1 % this._width === value2 % this._width;
    }

    getXYFromIndex(index) {
        let obj = {
            x: index % this._width,
            y: Math.floor(index / this._width)
        }
        return obj;
    }

    getIndexFromXY(x, y) {
        return y * this._width + x;
    }

}