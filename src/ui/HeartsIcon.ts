/**
 * 
 */
class HeartsIcon extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private heart: egret.Bitmap;
    private numView: DynamicNumber;
    private multiply: egret.Bitmap;

    private initView() {
        this.heart = new egret.Bitmap();
        this.heart.texture = RES.getRes("heart_icon_png");
        Util.setImageColor(this.heart, ColorEnum.WHITE);
        this.heart.x = 0;
        this.heart.y = 0;
        this.addChild(this.heart);

        this.multiply = new egret.Bitmap();
        this.multiply.texture = RES.getRes("x_png");
        this.multiply.x = this.heart.width;
        this.addChild(this.multiply);

        this.numView = new DynamicNumber("");
        this.addChild(this.numView);

    }


    public updateView() {
        let num = GameController.getInstance().getGameData().heart;
        this.numView.updateView(num);
        this.numView.x = this.heart.width + this.multiply.width;
    }


}
