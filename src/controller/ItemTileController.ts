/**
 * 
 */
class ItemTileController {
    private static instance: ItemTileController = null;
    private gameData: GameData;
    private itemData = [];


    private stage_view: StageView;

    constructor() {
        this.gameData = GameController.getInstance().getGameData();

    }

    public static getInstance(): ItemTileController {
        if (this.instance === null) {
            this.instance = new ItemTileController();
        }
        return this.instance;
    }

    public newItem(data) {
        switch (data.type) {
            case ItemTypeEnum.DOOR:
                return new Door(data);

            case ItemTypeEnum.KEY:
                return new Key(data);

            case ItemTypeEnum.LIGHT:
                return new Light(data);

            case ItemTypeEnum.PORT:
                return new Port(data);

            case ItemTypeEnum.ROADSWITCH:
                return new RoadSwitch(data);

            case ItemTypeEnum.STAIR:
                return new Upstair(data);

            case ItemTypeEnum.START:
                return new Start(data);

            case ItemTypeEnum.EXIT:
                return new Exit(data);

            case ItemTypeEnum.SIGHT:
                return new Sight(data);

            case ItemTypeEnum.DARK:
                return new Dark(data);

            case ItemTypeEnum.WINDOW:
                return new WindowSight(data);

            case ItemTypeEnum.FIRE:
                return new Fire(data);
        }
    }

    public resetInRoom() {
        for (let i = 0; i < this.itemData.length; i++) {
            this.itemData[i].inRoom = false;
        }
    }

    public reset() {
        for (let i = 0; i < this.itemData.length; i++) {
            this.itemData[i].reset();
        }
    }

    public getItemByName(name) {
        for (let i = 0; i < this.itemData.length; i++) {
            if (this.itemData[i].name == name) {
                return this.itemData[i];
            }
        }
        return null;
    }

    public getItem(id) {
        for (let i = 0; i < this.itemData.length; i++) {
            console.log(this.itemData);
            if (this.itemData[i].id == id) {
                return this.itemData[i];
            }
        }
        return null;
    }

    public initStage(stage_view) {
        this.stage_view = stage_view;
    }

    public initStageItemData(itemLayer) {
        this.itemData = [];
        let items = this.getItemData(itemLayer);
        for (let i = 0; i < items.length; i++) {
            if (this.getItemByName(items[i].name) == null) {
                this.itemData.push(this.newItem(items[i]));
            }
        }
    }

    public getItemData(layers) {
        let result = [];
        for (let i = 0; i < layers.length; i++) {
            if (layers[i].type == "objectgroup") {
                result = result.concat(layers[i].objects);
            } else if (layers[i].type == "group") {
                result = result.concat(this.getItemData(layers[i].layers))
            }
        }
        return result;
    }


    public itemHitTest(p) {
        for (let i = 0; i < this.itemData.length; i++) {
            if (this.itemData[i].parent != null && (this.itemData[i]).areaHitTest(p.x, p.y)) {
                switch (this.itemData[i].type) {
                    case "key":

                        this.itemData[i].parent.removeChild(this.itemData[i]);
                        this.gotKey(this.itemData[i]);
                        break;

                    case "light":
                        if (this.itemData[i].got) {
                            break;
                        }
                        console.log("获取了");
                        this.itemData[i].got = true;
                        let sight: Sight = this.getItemByName(this.itemData[i].sight);
                        sight.got = true;
                        // this.itemData[i].parent.removeChild(this.itemData[i]);
                        this.stage_view.addSight(sight);
                        break;

                    case "door":
                        if (this.itemData[i].ispass) {

                        } else {
                            if (GameController.getInstance().getGameData().keys > 0) {
                                this.openDoor(this.itemData[i]);
                            }
                            this.stage_view.headToWall();
                        }
                        break;


                    case "switch":
                        this.itemData[i].parent.removeChild(this.itemData[i]);
                        let rs = this.itemData[i] as RoadSwitch;
                        rs.status = !rs.status;
                        this.itemData[i].got = true;
                        let roomState = rs.getRoomStatus();
                        for (let i = 0; i < roomState.length; i++) {
                            this.stage_view.currentState[Number(roomState[i][0])] = Number(roomState[i][2]);
                            if (this.stage_view.currentRoom == Number(roomState[i][0])) {
                                SceneManager.getInstance().gameScene.updateRoom(this.stage_view.currentRoom, Number(roomState[0][2]));
                            }
                        }
                        break;

                    case ItemTypeEnum.STAIR:
                        let stair = this.itemData[i] as Upstair;
                        SceneManager.getInstance().gameScene.updateRoom(stair.goto, this.stage_view.currentState[stair.goto], stair.posx, stair.posy);

                        break;

                    case "exit":
                        console.log("应为好多exit")
                        this.itemData[i].parent.removeChild(this.itemData[i]);
                        GameController.getInstance().passStage();
                        break;

                    case "sight":

                        break;

                    case "window":
                        break;

                    case "fire":
                        this.itemData[i].parent.removeChild(this.itemData[i]);
                        this.gameData.gotFire();
                        break;

                }

            }
        }
    }

    public getStart() {
        for (let i = 0; i < this.itemData.length; i++) {
            if (this.itemData[i].type == "start") {
                return new egret.Point(this.itemData[i].x, this.itemData[i].y)
            }
        }
        return new egret.Point();
    }

    public gotKey(key: Key) {
        key.gotKey();
        this.gameData.gotKey();
    }

    public openDoor(door: Door) {
        door.ispass = true;
        door.updateStatus();
        this.gameData.useKey();
    }

    public switchRoad(roadSwitch: RoadSwitch, status) {
        roadSwitch.status = status;
    }

    public gotFire() {

    }

    public initDarkShadow() {

    }


    public parseTileMap() {

    }

    public resetItems() {
        for (let i = 0; i < this.itemData.length; i++) {
            // if (!this.itemData[i].inRoom) {
            switch (this.itemData[i].type) {
                case "key":
                    if (this.itemData[i].parent) {
                        this.itemData[i].parent.removeChild(this.itemData[i]);
                    }
                    break;

                case "light":

                    break;

                case "door":

                    break;


                case "switch":
                    if (this.itemData[i].parent) {
                        this.itemData[i].parent.removeChild(this.itemData[i]);
                    }
                    break;

                case ItemTypeEnum.STAIR:

                    break;

                case "exit":

                    break;

                case "sight":
                    this.stage_view.removeSight(this.itemData[i]);
                    break;

                case "dark":

                    break;

                case "window":

                    break;
            }
        }
    }
}