class GameController {
    private static instance: GameController = null;


    constructor() {
        this.initSaveData();
        this.gameData = new GameData();
    }

    public static getInstance(): GameController {
        if (this.instance === null) {
            this.instance = new GameController();
        }
        return this.instance;
    }


    /**
     * 存档控制
     */
    private saveData = [];
    private _currentStage = 1;
    private isNew = false;
    private isOver = false;
    private gameData: GameData;
    public stageMap: TileMap;

    public initSaveData() {
        let data = egret.localStorage.getItem("saveData");
        if (data == undefined || data == "") {
            this.isNew = true;
            this.saveGameData();
        } else {
            this.saveData = JSON.parse(data);
        }
        this._currentStage = Number(data);
    }

    public hasWhiteMan() {
        if (this._currentStage < 13 || this._currentStage >= 17) {
            return true;
        }
        return false;
    }

    public isNewPlayer() {
        return this.isNew;
    }

    public gameOver() {
        if (this._currentStage >= 17) {
            this.isOver = false;
        } else {
            this._currentStage = 1;
            this.isNew = true;
            this.isOver = true;
            this.saveGameData();
        }
    }

    public isGameOver() {
        return this.isOver;
    }

    public getGameData() {
        return this.gameData;
    }

    public saveGameData() {
        egret.localStorage.setItem("saveData", this._currentStage.toString());
    }

    public getRandomStageMap() {
        return "darkroad-map17_json"
    }

    public getCurrentStageMap() {
        return "darkroad-map" + this._currentStage + "_json"
    }

    public currentStage() {
        return this._currentStage;
    }

    public continueGame() {
        this.gameData.restartGame();
    }

    public restartGame() {
        this._currentStage = 1;
        this.gameData.restartGame();
        this.saveGameData();
    }

    public passStage() {
        if (this._currentStage < 17) {
            this._currentStage++;
        }
        this.gameData.passGame();
        this.saveGameData();
    }

    public randomGame() {
        return this._currentStage > 16;
    }

    public isRainning() {
        if (this._currentStage == 11 || this._currentStage == 12) {
            return true;
        }
        return false;
    }
}