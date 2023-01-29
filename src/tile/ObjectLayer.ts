/**
 * 
 */

class ObjectLayer extends egret.Sprite {
    private _draworder;
    private _id;
    private _name;
    private _objects;
    private _opacity;
    private _type;
    private _visible;
    private _x;
    private _y;
    public renderObject = [];

    constructor(data) {
        super();
        this.name = data.name;
        this._objects = data.objects;
        this._type = data.type;
    }

    public get objects() {
        return this._objects;
    }

    public get type() {
        return this._type;
    }
}