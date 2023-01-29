/**
 * 场景管理器
 * 
 */
class SceneManager {

    constructor() {
        this.gameLayer = UIManager.getInstance().getGameLayer();
        this.uiLayer = UIManager.getInstance().getUILayer();
        this.popLayer = UIManager.getInstance().getPopLayer();
        this.loadingLayer = UIManager.getInstance().getLoadingLayer();
        this.tipLayer = UIManager.getInstance().getTipLayer();
    }


    public static getInstance(): SceneManager {
        if (this.instance === null) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    private gameLayer: egret.DisplayObjectContainer;
    private loadingLayer: egret.DisplayObjectContainer;
    private uiLayer: egret.DisplayObjectContainer;
    private popLayer: egret.DisplayObjectContainer;
    private tipLayer: egret.DisplayObjectContainer;

    public egretStage = null;

    public currentScene = null;

    public gameScene: GameScene = null;
    public startScene: StartScene = null


    public toGameScene() {
        if (this.currentScene !== null) {
            this.gameLayer.removeChildren();
            this.currentScene = null;
        }
        if (this.gameScene === null) {
            this.gameScene = new GameScene()
        }
        this.gameLayer.addChild(this.gameScene);
        this.currentScene = this.gameScene;
    }

    public toStartScene() {
        if (this.currentScene !== null) {
            this.gameLayer.removeChildren();
            this.currentScene = null;
        }
        if (this.startScene === null) {
            this.startScene = new StartScene()
        }
        this.gameLayer.addChild(this.startScene);
        this.currentScene = this.startScene;
    }



    public static instance: SceneManager = null;
}