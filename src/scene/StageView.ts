/**
 * 
 */
class StageView extends egret.Sprite {
    constructor() {
        super();
        this.initView();
    }

    public currentRoom = 0;
    public currentState = [];


    private stage_map: StageTileMap;
    private dark_sky: egret.Shape;
    private sight_container: egret.Sprite;

    private mask_sky: egret.Bitmap;
    private actor_sight;
    private shadow_sight;
    private light_timer;
    private mask_sprite: egret.DisplayObjectContainer;
    private lighting: egret.Bitmap;

    private decorate_map: StageTileMap;

    private actor_mc: egret.MovieClip;
    private shadow_mc: egret.MovieClip;

    private sight_texture: egret.RenderTexture;

    private actor_factory: egret.MovieClipDataFactory;
    private shadow_factory: egret.MovieClipDataFactory;

    private step = 1;

    private start_x;
    private start_y;
    private last_tile_x;
    private last_tile_y;
    private start_time = 0;

    private actions = [];

    private isDie = false;
    private isSlip = false;

    private itemLayer: egret.Sprite;
    private direction;

    private touchArea: egret.Shape;


    private hasWindow = false;

    private windows: egret.Sprite;

    private initView() {
        this.currentState = [0, 0, 0, 0, 0];
        let mapdata;
        if (GameController.getInstance().randomGame()) {
            mapdata = RES.getRes(GameController.getInstance().getRandomStageMap());
            let layers = MapGenerate.getMap();
            mapdata.layers = layers;
        } else {
            mapdata = RES.getRes(GameController.getInstance().getCurrentStageMap());
        }

        // this.keylist = layer.keylist;

        this.stage_map = new StageTileMap(mapdata);
        this.stage_map.stage_view = this;
        ItemTileController.getInstance().initStage(this);
        ItemTileController.getInstance().initStageItemData([this.stage_map.getLayerByName("init")]);

        // this.stage_map.renderLayer(0);
        // this.stage_map.renderDecLayer(0);
        this.stage_map.renderOtherLayers();
        this.stage_map.renderGroupGround(0);
        this.stage_map.x = 70 + AdaptManager.fixedWidth;
        this.stage_map.y = 210 + AdaptManager.fixedHeight;
        this.addChildAt(this.stage_map, 0);
        GameController.getInstance().stageMap = this.stage_map;



        this.sight_container = new egret.Sprite();
        this.addChild(this.sight_container);

        // this.addChild(this.sight_container);
        // this.sight_map.mask = this.sight_container;

        this.windows = new egret.Sprite();
        this.windows.name = "windows";
        this.addChild(this.windows);
        this.sight_container.addChild(this.windows);


        this.itemLayer = new egret.Sprite();
        this.addChild(this.itemLayer);


        this.shadow_mc = new egret.MovieClip();
        let data = RES.getRes("shadow_json");
        let texture = RES.getRes("shadow_png");
        this.shadow_factory = new egret.MovieClipDataFactory(data, texture);
        this.shadow_mc.movieClipData = this.shadow_factory.generateMovieClipData("walk");
        this.shadow_mc.gotoAndStop(1);
        this.shadow_mc.visible = false;
        this.addChild(this.shadow_mc);

        this.actor_mc = new egret.MovieClip();
        data = RES.getRes("actor_json");
        texture = RES.getRes("actor_png");
        this.actor_factory = new egret.MovieClipDataFactory(data, texture);
        this.actor_mc.movieClipData = this.actor_factory.generateMovieClipData("walk");
        this.actor_mc.gotoAndStop(1);
        // this.addChild(this.actor_mc);


        // this.stage_map.renderGroupObject(0);

        this.shadow_mc.x = ItemTileController.getInstance().getStart().x + 60;
        this.shadow_mc.y = ItemTileController.getInstance().getStart().y - 60

        // this.shadow_mc.x = this.keylist[0].x * 120 + this.stage_map.x + 40;
        // this.shadow_mc.y = this.keylist[0].y * 120 + this.stage_map.y - 40;
        // this.stageStart();
        // this.decorate_map = new StageTileMap(mapdata);
        // this.decorate_map.renderGroupSky(0);
        // this.decorate_map.x = 70;
        // this.decorate_map.y = 330;
        // this.decorate_map.currentLayerIndex = 0;
        // // this.decorate_map.alpha = 0;
        // this.addChild(this.decorate_map);
        if (GameController.getInstance().isRainning()) {
            let rain = new egret.MovieClip();
            rain.movieClipData = new egret.MovieClipDataFactory(RES.getRes("rain_json"), RES.getRes("rain_png")).generateMovieClipData();
            rain.x = AdaptManager.centerX;
            rain.y = AdaptManager.centerY;
            rain.scaleX = rain.scaleY = 2;
            rain.touchEnabled = false;
            this.addChild(rain);
            rain.play(-1);
        }


        this.dark_sky = new egret.Shape();
        this.dark_sky.graphics.beginFill(ColorEnum.BLACK);
        this.dark_sky.graphics.drawRect(0, 0, AdaptManager.getDisplayWidth(), AdaptManager.getDisplayHeight());
        this.dark_sky.graphics.endFill();
        this.sight_container.addChild(this.dark_sky);


        this.setupItems(0, 0);

        this.actor_sight = new egret.Bitmap();
        this.actor_sight.texture = RES.getRes("sight_png");
        this.actor_sight.anchorOffsetX = this.actor_sight.width / 2;
        this.actor_sight.anchorOffsetY = this.actor_sight.height / 2;
        this.actor_sight.x = this.actor_mc.x;
        this.actor_sight.y = this.actor_mc.y;

        // this.actor_sight.scaleX = this.actor_sight.scaleY = 2.4;
        this.sight_container.addChild(this.actor_sight);


        this.shadow_sight = new egret.Bitmap();
        this.shadow_sight.texture = RES.getRes("sight_png");
        this.shadow_sight.anchorOffsetX = this.shadow_sight.width / 2;
        this.shadow_sight.anchorOffsetY = this.shadow_sight.height / 2;
        this.shadow_sight.visible = false;
        // this.shadow_sight.scaleX = this.shadow_sight.scaleY = 2.4;
        this.sight_container.addChild(this.shadow_sight);

        if (GameController.getInstance().getGameData().raisingTorch) {
            this.raiseTorch();
        }
        this.actor_sight.blendMode = egret.BlendMode.ERASE;
        this.shadow_sight.blendMode = egret.BlendMode.ERASE;

        // this.removeChild(this.sight_container);
        this.sight_texture = new egret.RenderTexture();
        this.sight_texture.drawToTexture(this.sight_container);


        this.mask_sky = new egret.Bitmap(this.sight_texture);
        this.addChild(this.mask_sky);

        this.lighting = new egret.Bitmap();
        this.lighting.texture = RES.getRes("lighting_png");
        this.lighting.visible = false;
        this.addChild(this.lighting);


        this.touchArea = new egret.Shape();
        this.touchArea.graphics.beginFill(0x000000, 0);
        this.touchArea.graphics.drawRect(0, 0, 840, 1320);
        this.touchArea.graphics.endFill();
        this.touchArea.anchorOffsetX = this.touchArea.width / 2;
        this.touchArea.anchorOffsetY = this.touchArea.height / 2;
        this.touchArea.x = AdaptManager.centerX;
        this.touchArea.y = AdaptManager.centerY;
        // this.touchArea.x = this.stage_map.x;
        // this.touchArea.y = this.stage_map.y;
        this.addChild(this.touchArea);



        this.lightingSpark();

        this.actor_mc.x = ItemTileController.getInstance().getStart().x + 60;
        this.actor_mc.y = ItemTileController.getInstance().getStart().y - 60

        this.addChildAt(this.actor_mc, this.getChildIndex(this.itemLayer));

        this.touchArea.touchEnabled = true;
        this.touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddStageMap, this);


    }


    public onEnterFrame(e) {
        // this.anchorOffsetX = this.actor_mc.x;
        // this.anchorOffsetY = this.actor_mc.y;
        // this.x = AdaptManager.centerX;
        // this.y = AdaptManager.centerY;
        // for (let i = 0; i < this.sight_container.numChildren; i++) {
        //     console.log(this.sight_container.getChildAt(i).name)
        //     console.log(this.sight_container.getChildAt(i).visible);
        //     console.log(this.sight_container.getChildAt(i).alpha);
        // }
        this.sight_texture.drawToTexture(this.sight_container);
        this.mask_sky.texture = this.sight_texture;
        if (this.isDie) {
            return;
        }
        let frameX = this.actor_mc.x;
        let frameY = this.actor_mc.y;

        this.actor_sight.x = this.actor_mc.x;
        this.actor_sight.y = this.actor_mc.y;

        this.shadow_sight.x = this.shadow_mc.x;
        this.shadow_sight.y = this.shadow_mc.y;


        let position = this.stage_map.pixelToTile(new egret.Point(this.actor_mc.x - this.stage_map.x, this.actor_mc.y - this.stage_map.y));



        let layer = this.stage_map.getCurrentLayer() as TileLayer;

        ItemTileController.getInstance().itemHitTest(new egret.Point(this.actor_mc.x, this.actor_mc.y));
        ItemTileController.getInstance().itemHitTest(new egret.Point(this.shadow_mc.x, this.shadow_mc.y));
        if (layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.SLIPPERY_ROAD) {
            this.isSlip = true;
        } else {
            this.isSlip = false;
        }
        if (layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.WOODEN_ROAD) {
            if (position.x == this.last_tile_x && position.y == this.last_tile_y) {

            } else {
                egret.Tween.removeTweens(this.stage_map);
                this.brokenRoad(position.x, position.y);
            }
        } else if (layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.WOODEN_BROKEN_ROAD) {
            if (position.x == this.last_tile_x && position.y == this.last_tile_y) {

            } else {
                egret.Tween.removeTweens(this.stage_map);
                this.destroyRoad(position.x, position.y);
            }
        } else if (layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.ROAD
            || layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.COLUMN
            || layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.SLIPPERY_ROAD) {
            egret.Tween.removeTweens(this.stage_map);
        } else if (layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.WINDOW
            || layer.data[layer.getIndexFromXY(position.x, position.y)] == TileEnum.WALL) {
            this.headToWall();
        } else {
            this.isDie = true;
            this.touchArea.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

            this.removeTweens();

            let dieDistance = Math.sqrt(Math.pow(Math.abs(this.actor_mc.x - this.start_x), 2) + Math.pow(Math.abs(this.actor_mc.y - this.start_y), 2));
            GameController.getInstance().getGameData().saveActions(new egret.Point(this.actor_mc.x, this.actor_mc.y), dieDistance * 4);


            if (position.x > this.last_tile_x) {
                this.actor_mc.x += 30;

            } else if (position.x < this.last_tile_x) {
                this.actor_mc.x -= 30;
            }
            if (position.y > this.last_tile_y) {
                this.actor_mc.y += 30;
            } else if (position.y < this.last_tile_y) {
                this.actor_mc.y -= 10;
            }
            this.actor_sight.x = this.actor_mc.x;
            this.actor_sight.y = this.actor_mc.y;

            this.actor_mc.movieClipData = this.actor_factory.generateMovieClipData("drop");
            this.actor_mc.gotoAndPlay(1);

            // this.actor_sight.visible = false;
            egret.Tween.get(this.actor_sight).to({ scaleX: 0, scaleY: 0 }, 1000, egret.Ease.sineIn).call(() => {
                if (GameController.getInstance().getGameData().lossHeart()) {
                    this.onRevive();
                }
            });
            egret.Tween.get(this.actor_mc).to({ scaleX: 0, scaleY: 0 }, 1000, egret.Ease.sineIn);

            GameController.getInstance().getGameData().saveActions(new egret.Point(this.actor_mc.x, this.actor_mc.y), 0, "die");
        }
        this.last_tile_x = position.x;
        this.last_tile_y = position.y;

    }

    public getItem(id) {

    }

    public removeItems() {
        this.itemLayer.removeChildren();
        this.sight_container.removeChildren();

        this.sight_container.addChild(this.dark_sky);
    }

    public headToWall() {
        egret.Tween.removeTweens(this.actor_mc);
        // if (position.x > this.last_tile_x) {
        //     this.actor_mc.x -= 50;
        // } else if (position.x < this.last_tile_x) {
        //     this.actor_mc.x += 50;
        // }
        // if (position.y > this.last_tile_y) {
        //     this.actor_mc.y -= 50;
        // } else if (position.y < this.last_tile_y) {
        //     this.actor_mc.y += 50;
        // }
        let direction = this.oppoDirection(this.actor_mc.rotation)
        this.actor_mc.x = this.actor_mc.x - 20 * Math.sin(this.actor_mc.rotation / 180 * Math.PI);
        this.actor_mc.y = this.actor_mc.y + 20 * Math.cos(this.actor_mc.rotation / 180 * Math.PI);

        let stopDistance = Math.sqrt(Math.pow(Math.abs(this.actor_mc.x - this.start_x), 2) + Math.pow(Math.abs(this.actor_mc.y - this.start_y), 2));
        GameController.getInstance().getGameData().saveActions(new egret.Point(this.actor_mc.x, this.actor_mc.y), stopDistance * 4);

    }

    public setupItems(id, state) {
        let objects = this.stage_map.getGroupObject(id, state);
        for (let i = 0; i < objects.length; i++) {
            let item = ItemTileController.getInstance().getItemByName(objects[i].name);
            console.log(item);
            item.x = objects[i].x + this.stage_map.x;
            item.y = objects[i].y - 120 + this.stage_map.y;
            if (item.got && item.type == ItemTypeEnum.WINDOW) {
                this.addWindow(item);
            }
            if (item.got && item.type != ItemTypeEnum.SIGHT) {
                continue;
            }
            if (item.type == ItemTypeEnum.START) {
                continue;
            }
            item.inRoom = true;
            if (item.got && item.type == ItemTypeEnum.SIGHT) {
                this.addSight(item);
            } else if (item.type == ItemTypeEnum.DARK) {
                if (this.sight_container.contains(item)) {

                } else {
                    this.sight_container.addChild(item);
                }
            } else if (item.type == ItemTypeEnum.DOOR) {
                this.itemLayer.addChild(item);
            } else if (GameController.getInstance().randomGame() && item.got) {
                console.log("拿过钥匙了么")
                continue;
            } else {
                if (!objects[i].visible) {
                    item.alpha = 0;
                } else {
                    item.alpha = 1;
                }
                this.itemLayer.addChildAt(item, 0);
            }
        }
    }

    public updateRoom(room, state, x, y) {
        egret.Tween.removeTweens(this.actor_mc);
        this.removeChild(this.actor_mc);
        this.stage_map.toRoom(room, state);
        this.currentRoom = room;
        if (x != null) {
            this.setStart(x, y);
        } else {
            this.addChildAt(this.actor_mc, this.getChildIndex(this.itemLayer));
        }
        this.sight_container.addChild(this.actor_sight);
        this.sight_container.addChild(this.shadow_sight);
        this.setupItems(room, state);
    }

    public setStart(x, y) {
        this.actor_mc.x = this.stage_map.x + x * 120 + 60;
        this.actor_mc.y = this.stage_map.y + y * 120 + 60 - 120;
        this.addChild(this.actor_mc);
    }

    public onRestart() {

    }

    public lightingSpark() {
        this.sight_container.alpha = 0;
        egret.clearInterval(this.light_timer);
        egret.setTimeout(() => {
            this.lighting.x = Math.random() * 500 - 300;
            this.lighting.y = -Math.random() * 600 - 200;
            this.lighting.visible = true;
            if (this.hasWindow) {
                this.sight_container.addChild(this.windows);
                this.windows.alpha = 1;
                egret.Tween.get(this.windows).wait(300).call(() => {
                    this.lighting.visible = false;
                }).to({
                    alpha: 0
                }, 2000)
            } else {
                this.dark_sky.alpha = 0;
                this.start_time = new Date().getTime();
                egret.Tween.get(this.dark_sky).wait(300).call(() => {
                    this.lighting.visible = false;
                }).to({
                    alpha: 1
                }, 2000);
            }
        }, this, 500);
        this.light_timer = egret.setInterval(() => {
            this.lighting.x = Math.random() * 500 - 300;
            this.lighting.y = -Math.random() * 600 - 200;
            this.lighting.visible = true;
            if (this.hasWindow) {
                this.sight_container.addChild(this.windows);
                this.windows.alpha = 1;
                egret.Tween.get(this.windows).wait(300).call(() => {
                    this.lighting.visible = false;
                }).to({
                    alpha: 0
                }, 2000)
            } else {
                this.dark_sky.alpha = 0;
                egret.Tween.get(this.dark_sky).wait(300).call(() => {
                    this.lighting.visible = false;
                }).to({
                    alpha: 1
                }, 2000);
            }

        }, this, 8000 + Math.random() * 4000);
    }

    public onRevive() {
        this.currentState = [0, 0, 0, 0, 0];
        this.mask_sky.texture = null
        this.removeTweens();

        this.stage_map.resetMap();
        this.currentRoom = 0;

        // ItemTileController.getInstance().resetItems();
        this.setupItems(0, 0);
        GameController.getInstance().stageMap = this.stage_map;

        this.step = 1;
        this.lightingSpark();


        this.actor_mc.x = ItemTileController.getInstance().getStart().x + 60;
        this.actor_mc.y = ItemTileController.getInstance().getStart().y - 60;

        this.actor_mc.movieClipData = this.actor_factory.generateMovieClipData("walk");

        this.actor_sight.x = this.actor_mc.x;
        this.actor_sight.y = this.actor_mc.y;
        this.actor_mc.gotoAndStop(1);

        this.actor_mc.scaleX = this.actor_mc.scaleY = 1;
        this.actor_sight.visible = true;
        this.actor_sight.scaleX = this.actor_sight.scaleY = 1;

        this.sight_container.addChild(this.actor_sight);
        this.actor_sight.blendMode = egret.BlendMode.ERASE;


        if (GameController.getInstance().hasWhiteMan()) {

            this.shadow_mc.x = ItemTileController.getInstance().getStart().x + 60;
            this.shadow_mc.y = ItemTileController.getInstance().getStart().y - 60
            this.shadow_mc.movieClipData = this.shadow_factory.generateMovieClipData("walk");
            this.shadow_mc.play(-1);
            this.sight_container.addChild(this.shadow_sight);

            this.shadow_mc.visible = true;
            this.shadow_mc.scaleX = this.shadow_mc.scaleY = 1;

            this.shadow_sight.visible = true;
            this.shadow_sight.scaleX = this.shadow_sight.scaleY = 1;

            this.shadow_sight.blendMode = egret.BlendMode.ERASE;

            this.actions = GameController.getInstance().getGameData().getSavedAction();
            this.excuteAction();

        }


        this.touchArea.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);


        GameController.getInstance().getGameData().revive();
        this.isDie = false;


    }

    private excuteAction() {
        if (this.actions.length == 0) {
            return;
        }
        let x = this.actions[0].p.x;
        let y = this.actions[0].p.y;
        let r = this.getRotation(this.shadow_mc, new egret.Point(x, y));
        if (this.actions[0].type == "die") {
            this.shadow_mc.x = x;
            this.shadow_mc.y = y;

            this.shadow_mc.movieClipData = this.shadow_factory.generateMovieClipData("drop");
            this.shadow_mc.gotoAndPlay(1);

            egret.Tween.get(this.shadow_sight).to({ scaleX: 0, scaleY: 0 }, 1000, egret.Ease.sineIn);
            egret.Tween.get(this.shadow_mc).to({ scaleX: 0, scaleY: 0 }, 1000, egret.Ease.sineIn).call(() => {
                this.shadow_mc.stop();
            });

        } else {
            if (isNaN(r)) {
                r = this.shadow_mc.rotation;
            }
            this.shadow_mc.rotation = r;

            let t = this.actions[0].t;
            egret.Tween.get(this.shadow_mc).to({
                x: x, y: y
            }, t).call(() => {
                this.actions.shift();
                if (this.actions.length > 0) {
                    this.excuteAction();
                }
            })
        }

    }

    private touch_start_X;
    private touch_start_Y;
    private last_time;

    public onTouchTap(e: egret.TouchEvent) {
        egret.Tween.removeTweens(this.actor_mc);
        let lastDistance = Math.sqrt(Math.pow(Math.abs(this.actor_mc.x - this.touch_start_X), 2) + Math.pow(Math.abs(this.actor_mc.y - this.touch_start_Y), 2));
        GameController.getInstance().getGameData().saveActions(new egret.Point(this.actor_mc.x, this.actor_mc.y), lastDistance * 4);


        this.touch_start_X = this.actor_mc.x;
        this.touch_start_Y = this.actor_mc.y;

        let x = e.stageX;
        let y = e.stageY;

        this.direction = this.getRotation(this.actor_mc, new egret.Point(x, y));

        if (isNaN(this.direction)) {
            this.direction = this.actor_mc.rotation;
        }
        this.actor_mc.rotation = this.direction;

        let distance = Math.sqrt(Math.pow(Math.abs(this.actor_mc.x - x), 2) + Math.pow(Math.abs(this.actor_mc.y - y), 2));
        let x_distance = Math.abs(this.actor_mc.x - x);
        let y_distance = Math.abs(this.actor_mc.y - y);
        let slipX = x, slipY = y;
        if (this.actor_mc.x > x) {
            slipX = x - 120 * x_distance / distance;
        } else if (this.actor_mc.x < x) {
            slipX = x + 120 * x_distance / distance;
        }
        if (this.actor_mc.y > y) {
            slipY = y - 120 * y_distance / distance;
        } else if (this.actor_mc.y < y) {
            slipY = y + 120 * y_distance / distance;
        }
        if (slipX < this.stage_map.x) {
            slipX = this.stage_map.x;
        } else if (slipX > this.stage_map.x + 7 * 120) {
            slipX = this.stage_map.x + 7 * 120 - 10
        }
        // if (slipY < this.stage_map.y) {
        //     slipY = this.stage_map.y + 120;
        // } else if (slipY > this.stage_map.y + this.stage_map.height) {
        //     slipY = this.stage_map.y + 1440;
        // }

        this.actor_mc.play(-1);
        egret.Tween.get(this.actor_mc).to({
            x: x, y: y
        }, distance * 4).call(() => {
            this.actor_mc.gotoAndStop(0);
            GameController.getInstance().getGameData().saveActions(new egret.Point(x, y), distance);
            if (this.isSlip) {
                egret.Tween.get(this.actor_mc).to({
                    x: slipX, y: slipY
                }, 480);
            }
        });
    }

    public raiseTorch() {
        this.actor_sight.scaleX = this.actor_sight.scaleY = this.shadow_sight.scaleX =
            this.shadow_sight.scaleY = 2;
    }


    public outTorch() {
        this.actor_sight.scaleX = this.actor_sight.scaleY = this.shadow_sight.scaleX =
            this.shadow_sight.scaleY = 1;
    }

    public addSight(sight) {
        sight.blendMode = egret.BlendMode.ERASE;
        this.sight_container.addChild(sight);
    }

    public addWindow(windowSight) {
        this.hasWindow = true;
        windowSight.blendMode = egret.BlendMode.ERASE;
        this.windows.addChild(windowSight);
    }

    public removeSight(sight) {
        if (sight.parent == this.sight_container) {
            this.sight_container.removeChild(sight)
        }
    }

    public switchRoad() {

    }

    public openDoor(x, y) {

    }

    public brokenRoad(x, y) {

        egret.Tween.get(this.stage_map).wait(1000).call(() => {
            let c_layer = this.stage_map.getCurrentLayer();
            let dec_layer = this.stage_map.getCurrentDecLayer();
            c_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.WOODEN_BROKEN_ROAD;
            if (dec_layer.data[c_layer.getIndexFromXY(x, y)] == TileEnum.DEC_WOODEN_ROAD_COL) {
                dec_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.DEC_BROKEN_ROAD_COL
            } else {
                dec_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.DEC_BROKEN_ROAD_ROW
            }
            this.stage_map.updateLayer("layer" + this.stage_map.currentLayerIndex);
            this.stage_map.updateLayer("declayer" + this.stage_map.currentLayerIndex);
        }).wait(1000).call(() => {
            let c_layer = this.stage_map.getCurrentLayer();
            let dec_layer = this.stage_map.getCurrentDecLayer();
            c_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.ABYSS;
            dec_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.ABYSS;
            this.stage_map.updateLayer("layer" + this.stage_map.currentLayerIndex);
            this.stage_map.updateLayer("declayer" + this.stage_map.currentLayerIndex);

        });
    }

    public destroyRoad(x, y) {
        egret.Tween.get(this.stage_map).wait(1000).call(() => {
            let c_layer = this.stage_map.getCurrentLayer();
            let dec_layer = this.stage_map.getCurrentDecLayer();
            c_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.ABYSS;
            dec_layer.data[c_layer.getIndexFromXY(x, y)] = TileEnum.ABYSS;
            this.stage_map.updateLayer("layer" + this.stage_map.currentLayerIndex);
            this.stage_map.updateLayer("declayer" + this.stage_map.currentLayerIndex);
        });
    }

    public getRotation(p1, p2) {
        if (p2.y == p1.y) {
            if (p1.x < p2.x) {
                return 90;
            } else if (p1.x < p2.x) {
                return -90;
            } else {
                return NaN
            }
        } else if (p2.x == p1.x) {
            if (p1.y < p2.y) {
                return 180;
            } else if (p1.x < p2.x) {
                return 0;
            }
        } else {
            if (p1.x > p2.x) {
                if (p1.y > p2.y) {
                    return -Math.atan(Math.abs(p1.x - p2.x) / Math.abs(p1.y - p2.y)) / Math.PI * 180;
                } else {
                    return -180 + Math.atan(Math.abs(p2.x - p1.x) / Math.abs(p1.y - p2.y)) / Math.PI * 180;
                }
            } else if (p1.x < p2.x) {
                if (p1.y > p2.y) {
                    return Math.atan(Math.abs(p1.x - p2.x) / Math.abs(p1.y - p2.y)) / Math.PI * 180;
                } else {
                    return -180 - Math.atan(Math.abs(p2.x - p1.x) / Math.abs(p1.y - p2.y)) / Math.PI * 180;
                }
            }
        }
    }

    public oppoDirection(r) {
        if (r > 0) {
            return -180 + r;
        } else {
            return 180 + r
        }
    }

    public removeTweens() {
        egret.Tween.removeTweens(this.shadow_mc);
        egret.Tween.removeTweens(this.actor_mc);
    }
}