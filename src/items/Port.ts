/**
 * 
 */
class Port extends egret.Sprite {

    private _id: number;
    private _toLayer: number;
    private _toPos: egret.Point;
    public name;
    public type = "port";

    constructor(data) {
        super();
        this.name = data.name;
        this._id = data.id;
        this.anchorOffsetY = this.height;
    }

    public get toPos() {
        return this._toPos;
    }
    
    public areaHitTest(x, y) {
        return false
    }
}