/**
 * 锁住的门
 */
class Door extends egret.Sprite {

    static CLOSE = false;
    static OPEN = true;

    public area: egret.Bitmap;
    private view: egret.Bitmap;
    private _id;
    public ispass;
    public name;
    public openimage;
    public closeimage;
    public type = "door";

    public got = false;
    public inRoom = false;

    constructor(data) {
        super();
        this.name = data.name;
        this._id = data.id;

        // this.ispass = data.properties.ispass;
        console.log(data);
        this.ispass = false;
        this.openimage = data.properties.openimage;
        this.closeimage = data.properties.closeimage;

        this.area = new egret.Bitmap();
        this.area.texture = RES.getRes("keyw_png");
        this.area.alpha = 0;
        this.area.y = 120;
        this.addChild(this.area);

        this.view = new egret.Bitmap();

        this.addChild(this.view);
        this.updateStatus()
    }

    public get id() {
        return this._id;
    }

    public updateStatus() {
        if (this.ispass) {
            this.view.texture = RES.getRes(this.openimage);
            switch (this.openimage) {
                case "dec032_png":
                    this.view.x = -120;
                    this.view.y = 120;
                    break;

                case "dec141_png":
                    this.view.x = -120;
                    this.view.y = 120;
                    break;

                case "dec220_png":
                    this.view.x = -120;
                    this.view.y = 0;
                    break;

                case "dec221_png":
                    this.view.x = 0;
                    this.view.y = 120;
                    break;

                case "dec225_png":
                    this.view.x = 0;
                    this.view.y = 0;
                    break;

                case "dec228_png":
                    this.view.x = -120;
                    this.view.y = 0;
                    break;
            }
        } else {
            this.view.texture = RES.getRes(this.closeimage);
            switch (this.closeimage) {
                case "dec031_png":
                    this.view.x = -120;
                    this.view.y = 120;
                    break;

                case "dec142_png":
                    this.view.x = -120;
                    this.view.y = 120;
                    break;

                case "dec219_png":
                    this.view.x = -120;
                    this.view.y = 0;
                    break;

                case "dec222_png":
                    this.view.x = 0;
                    this.view.y = 120;
                    break;

                case "dec224_png":
                    this.view.x = 0;
                    this.view.y = 0;
                    break;

                case "dec227_png":
                    this.view.x = -120;
                    this.view.y = 0;
                    break;
            }
        }

        // "dec032"
        // // this.view.x = -120;
        // // this.view.y = 120;

        // dec142
        // // this.view.x = -120;
        // // this.view.y = 120;

        // dec219
        //     - 120 0
        // dec222
        // 0 120

        // dec224
        // 0 120

        // de227
        //     - 120 0

        this.anchorOffsetY = this.height;
    }


    public reset() {
        this.got = false;
        this.inRoom = false;
        this.ispass = false;
        this.updateStatus();
    }

    public areaHitTest(x, y) {
        return this.area.hitTestPoint(x, y)
    }
}