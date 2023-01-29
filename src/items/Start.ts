/**
 * 
 */
class Start extends egret.Sprite {

    public type = "start";
    public name;

    public got = false;
    public inRoom = false;

    constructor(data) {
        super();
        this.name = data.name;
        this.alpha = 0;
    }

    public reset() {
        this.got = false;
        this.inRoom = false;
    }

    public areaHitTest(x, y) {
        return false
    }
}