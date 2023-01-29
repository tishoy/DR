

class GameScene extends egret.DisplayObjectContainer {
    constructor() {
        super();
        this.initView();
    }



    private home_btn: egret.Bitmap;
    private share_btn: egret.Bitmap;
    private record_btn: egret.Bitmap;

    private heartsIcon: HeartsIcon;
    private keysIcon: KeysIcon;
    private torchIcon: TorchIcon;

    private gameStatus: number;

    private stage_sight: egret.Bitmap;

    public currentStage: StageView = null;

    private url = "";

    private initView() {

        this.stage_sight = new egret.Bitmap();
        this.stage_sight.texture = RES.getRes("sight00_png")
        this.stage_sight.anchorOffsetX = this.stage_sight.width / 2;
        this.stage_sight.anchorOffsetY = this.stage_sight.height / 2;
        this.stage_sight.x = AdaptManager.centerX;
        this.stage_sight.y = AdaptManager.centerY;
        this.addChild(this.stage_sight);


        this.home_btn = new egret.Bitmap();
        this.home_btn.texture = RES.getRes("back_home_btn_png");
        this.home_btn.x = AdaptManager.fixedWidth + 30;
        this.home_btn.y = AdaptManager.fixedHeight + 35;
        this.home_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHome, this);
        this.home_btn.touchEnabled = true;
        this.home_btn.visible = true;
        this.addChild(this.home_btn);

        this.share_btn = new egret.Bitmap();
        this.share_btn.texture = RES.getRes("share_btn_png");
        this.share_btn.x = AdaptManager.fixedWidth + 100;
        this.share_btn.y = AdaptManager.fixedHeight + 30;
        this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.share_btn.touchEnabled = true;
        this.addChild(this.share_btn);


        this.record_btn = new egret.Bitmap();
        this.record_btn.texture = RES.getRes("record_btn_png");
        this.record_btn.x = AdaptManager.fixedWidth + 250;
        this.record_btn.y = AdaptManager.fixedHeight + 30;
        this.record_btn.touchEnabled = true;
        this.record_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecordTouched, this);
        this.addChild(this.record_btn);



        this.heartsIcon = new HeartsIcon();
        this.heartsIcon.updateView();
        this.heartsIcon.x = AdaptManager.fixedWidth + 30;
        this.heartsIcon.y = AdaptManager.fixedHeight + 50 + this.home_btn.height;
        this.addChild(this.heartsIcon);


        this.keysIcon = new KeysIcon();
        this.keysIcon.updateView();
        this.keysIcon.y = this.heartsIcon.y;
        this.keysIcon.x = this.heartsIcon.width + 30;
        this.addChild(this.keysIcon);

        this.torchIcon = new TorchIcon();
        this.torchIcon.updateView();
        this.torchIcon.y = this.heartsIcon.y;
        this.torchIcon.x = this.keysIcon.width + this.keysIcon.width + 30;
        this.addChild(this.torchIcon);
    }

    public updateRoom(room, state, x = null, y = null) {
        this.currentStage.updateRoom(room, state, x, y);
    }

    public updateStage() {
        if (this.currentStage) {
            this.currentStage.removeTweens();
        }

        if (this.contains(this.currentStage)) {
            this.removeChild(this.currentStage);
        }
        if (this.currentStage) {
            if (this.currentStage.hasEventListener(egret.Event.ENTER_FRAME)) {
                this.currentStage.removeEventListener(egret.Event.ENTER_FRAME, this.currentStage.onEnterFrame, this.currentStage);
            }
        }
        this.currentStage = null;
        this.currentStage = new StageView();
        // this.currentStage.x = 70 + AdaptManager.fixedWidth / 2;
        // this.currentStage.y = 210 + AdaptManager.fixedHeight / 2;
        this.addChildAt(this.currentStage, 0);
    }

    public updateHeart() {
        this.heartsIcon.updateView();
    }

    public updateKey() {
        this.keysIcon.updateView();
    }

    public updateTorch() {
        this.torchIcon.updateView();
        if (GameController.getInstance().getGameData().raisingTorch) {
            this.currentStage.raiseTorch();
        } else {
            this.currentStage.outTorch();
        }
    }

    public onShare() {
        platform.share("邀请您的好友一起来挑战吧", "");
    }

    private onRecordTouched(e) {
        this.record_btn.texture = RES.getRes("recording_png");
        platform.startRecord();
    }

    public setButtonEnabled() {

    }

    public showButtons() {

    }

    public hideButtons() {

    }



    private onTouchHome(e) {
        SceneManager.getInstance().toStartScene();
    }

    public resumeGame() {
        this.showButtons();
    }



}