class TorchIcon extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    private torch: egret.Bitmap;

    private initView() {
        this.torch = new egret.Bitmap();
        this.torch.texture = RES.getRes("torch_png");
        this.torch.x = 0;
        this.torch.y = 0;
        this.addChild(this.torch);


    }



    public updateView() {
        console.log(GameController.getInstance().getGameData().raisingTorch)
        if (GameController.getInstance().getGameData().raisingTorch) {
            this.alpha = 1;
        } else {
            this.alpha = 0.5;
        }

    }


}
