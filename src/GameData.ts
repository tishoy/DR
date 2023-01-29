/**
 * 
 */
class GameData {


    private _heart = 3;
    private _keys = 0;
    private _actions = [];
    public raisingTorch = false;

    public isRandomGame = false;
    public hasRandomedKeys = 0;
    public hasRandomedDoors = 0;
    private tempKeys = 0;

    constructor() {
        this._heart = 3;
        this._keys = 0;
        this._actions = [];
    }

    public revive() {
        if (GameController.getInstance().randomGame()) {
            this._keys = this.tempKeys;
        } else {
            this._keys = 0;
        }
        this.raisingTorch = false;
        this._actions = [];
        this.update();
    }

    public restartGame() {
        this._heart = 3;
        this._keys = 0;
        this.raisingTorch = false;
        this._actions = [];
        this.update();
    }

    public passGame() {
        console.log("pass game");
        SceneManager.getInstance().gameScene.updateStage();
        this._heart = 3;
        if (GameController.getInstance().randomGame()) {
            this.tempKeys = this._keys;
        } else {
            this._keys = 0;
        }
       
        this._actions = [];
        this.update();
    }

    public lossHeart() {
        if (this._heart == 0) {
            return;
        }
        this._heart--;
        this.update();
        if (this._heart == 0) {
            this.tempKeys = 0;
            GameController.getInstance().gameOver();
            SceneManager.getInstance().toStartScene();
            return false;
        }
        return true;
    }

    public update() {
        if (SceneManager.getInstance().gameScene) {
            SceneManager.getInstance().gameScene.updateHeart();
            SceneManager.getInstance().gameScene.updateKey();
        }

    }

    public gotKey() {
        this._keys++;
        console.log(this._keys);
        SceneManager.getInstance().gameScene.updateKey();
    }

    public useKey() {
        if (this._keys == 0) {
            return;
        }
        this._keys--;
        console.log(this._keys);
        SceneManager.getInstance().gameScene.updateKey();
    }

    public saveActions(point, time, type = "move") {
        this._actions.push({ p: point, t: time, type: type });
    }

    public getSavedAction() {
        return this._actions;
    }

    public gotFire() {
        this.raisingTorch = true;
        SceneManager.getInstance().gameScene.updateTorch();
    }

    public rainning() {
        this.raisingTorch = false;
        SceneManager.getInstance().gameScene.updateTorch();
    }

    public save() {

    }

    public get keys() {
        return this._keys;
    }

    public get heart() {
        return this._heart;
    }

}