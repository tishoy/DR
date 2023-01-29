/**
 * 
 */
class KeysIcon extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private keys: egret.Bitmap;
    private multiply: egret.Bitmap;
    private numView: DynamicNumber;

    private initView() {
        this.keys = new egret.Bitmap();
        this.keys.texture = RES.getRes("key_icon_png");
        Util.setImageColor(this.keys, ColorEnum.WHITE);
        this.keys.x = 0;
        this.keys.y = 0;
        this.addChild(this.keys);


        this.multiply = new egret.Bitmap();
        this.multiply.texture = RES.getRes("x_png");
        this.multiply.x = this.keys.width;
        this.addChild(this.multiply);

        this.numView = new DynamicNumber("");
        this.addChild(this.numView);
    }



    public updateView() {
        let num = GameController.getInstance().getGameData().keys;
        this.numView.updateView(num);
        this.numView.x = this.keys.width + this.multiply.width;
    }


}
