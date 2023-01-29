class TileMap extends egret.Sprite {

    private _height;
    private _infinite;
    private _layers = [];   // 层数据
    private _nextlayerid;
    private _nextobjectid;
    private _orientation;
    private _renderorder;
    private _tiledversion;  //
    private _staggeraxis;   //栅格轴
    private _staggerindex;  //栅格类型
    private _tileheight;
    static _tilesets: Array<Tileset> = [];
    private _tilewidth;
    private _type;
    private _version;
    private _width;
    private _backgroundcolor;
    private _compressionlevel;
    private _currentLayer;
    private _currentLayerChanged;
    public renderLayers = [];
    public objectLayers = [];
    static inited = false;

    constructor(data) {
        super();
        this._height = data.height;
        this._infinite = data.infinite;
        this._nextlayerid = data.nextlayerid;
        this._nextobjectid = data.nextobjectid;
        this._orientation = data.orientation;
        this._renderorder = data.renderorder;
        this._tiledversion = data.tiledversion;
        this._staggeraxis = data.staggeraxis;
        this._staggerindex = data.staggerindex;
        this._tileheight = data.tileheight;
        this._tilewidth = data.tilewidth;
        this._type = data.type;
        this._version = data.version;
        this._width = data.width;
        this._layers = data.layers;

        TileMap.initTilesets(data.tilesets);

    }

    static initTilesets(dataTilesets) {
        if (this.inited) {
            return;
        }
        this.inited = true;
        let tileset: Tileset;
        for (let i = 0; i < dataTilesets.length; i++) {
            tileset = new Tileset(dataTilesets[i].source, dataTilesets[i].firstgid);
            this._tilesets.push(tileset);
        }
        this._tilesets.sort((a, b) => {
            return b.firstgid - a.firstgid
        })
        // this._tilesets = 
    }

    static getTile(id) {
        for (let i = 0; i < this._tilesets.length; i++) {
            if (this._tilesets[i].firstgid <= id) {
                return this._tilesets[i].generateTileById(id - this._tilesets[i].firstgid);
            } else {
                continue;
            }
        }
    }

    public cleanMap() {
        this.removeChildren();
    }

    public renderTile(layer, index, texture) {
        this.renderLayers[layer].data[index].texture = texture;
    }

    public renderScene() {
        let dataLayers = this._layers;
        this.renderLayers = [];
        let layer: TileLayer;
        let tile: Tile;
        for (let layerIndex = 0; layerIndex < dataLayers.length; layerIndex++) {
            layer = new TileLayer(dataLayers[layerIndex]);

            switch (this.renderorder) {
                case tiled_renderorder.LEFT_UP:
                    for (let tileIndex = 0; tileIndex < layer.data.length; tileIndex++) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;

                case tiled_renderorder.RIGHT_DOWN:
                    for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;
            }
            this.addChild(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        }

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
    }

    public renderLayerByName(name) {
        let dataLayer = this.getLayerByName(name);
        if (dataLayer == undefined) {
            return;
        }
        if (dataLayer.type === "tilelayer") {
            let layer: TileLayer;
            layer = new TileLayer(dataLayer);
            let tile: Tile;
            switch (this.renderorder) {
                case tiled_renderorder.LEFT_UP:
                    for (let tileIndex = 0; tileIndex < layer.data.length; tileIndex++) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;

                case tiled_renderorder.RIGHT_DOWN:
                    for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;

                case tiled_renderorder.RIGHT_UP:
                    layer.cleanData();
                    for (let tileIndex = dataLayer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (dataLayer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(dataLayer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                        layer.unshiftInData(dataLayer.data[tileIndex]);
                    }
                    break;
            }
            console.log(layer.name);
            layer.x = layer.x + (dataLayer.offsetx == undefined ? 0 : layer.offsetx);
            layer.y = layer.y + (dataLayer.offsety == undefined ? 0 : layer.offsety);
            this.addChild(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        } else if (dataLayer.type === "objectgroup") {
            let layer: ObjectLayer;
            layer = new ObjectLayer(dataLayer);
            let obj: TileObject;
            for (let i = 0; i < layer.objects.length; i++) {
                if (layer.objects[i].gid == undefined) {
                    continue;
                }
                obj = new TileObject(layer.objects[i]);
                let tile = TileMap.getTile(layer.objects[i].gid);
                obj.addChild(tile);
                obj.x = layer.objects[i].x;
                obj.y = layer.objects[i].y;
                obj.width = layer.objects[i].width;
                obj.height = layer.objects[i].height;
                obj.rotation = layer.objects[i].rotation;
                obj.visible = layer.objects[i].visible;
                obj.properties = layer.objects[i].properties;
                layer.renderObject.push(obj);
                layer.addChild(obj);
            }
            this.addChild(layer);
            this.objectLayers.push(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        }
    }

    public renderLayerByData(dataLayer) {
        if (dataLayer.type === "tilelayer") {
            let layer: TileLayer;
            layer = new TileLayer(dataLayer);
            let tile: Tile;
            switch (this.renderorder) {
                case tiled_renderorder.LEFT_UP:
                    for (let tileIndex = 0; tileIndex < dataLayer.data.length; tileIndex++) {
                        if (dataLayer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(dataLayer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }

                    break;
                case tiled_renderorder.RIGHT_DOWN:
                    for (let tileIndex = dataLayer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (dataLayer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(dataLayer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;

                case tiled_renderorder.RIGHT_UP:
                    layer.cleanData();
                    for (let tileIndex = dataLayer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (dataLayer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(dataLayer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                        layer.unshiftInData(dataLayer.data[tileIndex]);
                    }
                    break;
            }
            layer.x = layer.x + (dataLayer.offsetx == undefined ? 0 : layer.offsetx);
            layer.y = layer.y + (dataLayer.offsety == undefined ? 0 : layer.offsety);
            this.addChild(layer);
            this.renderLayers.push(layer);
            this.cacheAsBitmap = true;
        } else {
            let layer: ObjectLayer;
            layer = new ObjectLayer(dataLayer);
            let obj: TileObject;
            for (let i = 0; i < layer.objects.length; i++) {
                if (layer.objects[i].gid == undefined) {
                    continue;
                }
                obj = new TileObject(layer.objects[i])
                obj.x = layer.objects[i].x;
                obj.y = layer.objects[i].y - 120;
                obj.width = layer.objects[i].width;
                obj.height = layer.objects[i].height;
                obj.rotation = layer.objects[i].rotation;
                obj.visible = layer.objects[i].visible;
                obj.properties = layer.objects[i].properties;
                layer.renderObject.push(obj);
                layer.addChild(obj);
            }
            this.addChild(layer);
            this.objectLayers.push(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        }
    }

    public updateLayer(layer) {
        layer.removeChildren();
        layer._tiles = [];
        switch (this.renderorder) {
            case tiled_renderorder.RIGHT_UP:
                let tile: Tile;
                for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                    if (layer.data[tileIndex] !== 0) {
                        tile = TileMap.getTile(layer.data[tileIndex]);
                        tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                        tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                        layer._tiles.unshift(tile);
                        layer.addChild(tile);
                    }
                }
                break;
        }
    }

    public renderLayer(layerIndex) {
        let dataLayers = this._layers;
        if (dataLayers[layerIndex].type === "tilelayer") {
            let layer: TileLayer;
            layer = new TileLayer(dataLayers[layerIndex]);
            let tile: Tile;
            switch (this.renderorder) {
                case tiled_renderorder.LEFT_UP:
                    for (let tileIndex = 0; tileIndex < layer.data.length; tileIndex++) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }

                    }

                    break;
                case tiled_renderorder.RIGHT_DOWN:
                    for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;

                case tiled_renderorder.RIGHT_UP:
                    for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                        if (layer.data[tileIndex] !== 0) {
                            tile = TileMap.getTile(layer.data[tileIndex]);
                            tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                            tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                            layer.addChild(tile);
                            layer._tiles.push(tile);
                        }
                    }
                    break;
            }
            this.addChild(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        } else {
            let layer: ObjectLayer;
            layer = new ObjectLayer(dataLayers[layerIndex]);
            let obj: TileObject;
            for (let i = 0; i < layer.objects.length; i++) {
                if (layer.objects[i].gid == undefined) {
                    continue;
                }
                obj = new TileObject(layer.objects[i])
                obj.x = layer.objects[i].x;
                obj.y = layer.objects[i].y - 120;
                obj.width = layer.objects[i].width;
                obj.height = layer.objects[i].height;
                obj.rotation = layer.objects[i].rotation;
                obj.visible = layer.objects[i].visible;
                obj.properties = layer.objects[i].properties;
                layer.renderObject.push(obj);
                layer.addChild(obj);
            }
            this.addChild(layer);
            this.objectLayers.push(layer);
            this.renderLayers.push(layer);

            this.cacheAsBitmap = true;
        }

    }

    public renderObject() {

    }

    public renderMap() {
        let dataLayers = this._layers;
        this.renderLayers = [];
        for (let layerIndex = 0; layerIndex < dataLayers.length; layerIndex++) {
            if (dataLayers[layerIndex].type === "tilelayer") {
                let layer: TileLayer;
                layer = new TileLayer(dataLayers[layerIndex]);
                let tile: Tile;
                switch (this.renderorder) {
                    case tiled_renderorder.LEFT_UP:
                        for (let tileIndex = 0; tileIndex < layer.data.length; tileIndex++) {
                            if (layer.data[tileIndex] !== 0) {
                                tile = TileMap.getTile(layer.data[tileIndex]);
                                tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                                tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                                layer.addChild(tile);
                                layer._tiles.push(tile);
                            }

                        }

                        break;
                    case tiled_renderorder.RIGHT_DOWN:
                        for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                            if (layer.data[tileIndex] !== 0) {
                                tile = TileMap.getTile(layer.data[tileIndex]);
                                tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                                tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                                layer.addChild(tile);
                                layer._tiles.push(tile);
                            }
                        }
                        break;

                    case tiled_renderorder.RIGHT_UP:
                        for (let tileIndex = layer.data.length - 1; tileIndex >= 0; tileIndex--) {
                            if (layer.data[tileIndex] !== 0) {
                                tile = TileMap.getTile(layer.data[tileIndex]);
                                tile.x = layer.getXYFromIndex(tileIndex).x * this._tilewidth;
                                tile.y = layer.getXYFromIndex(tileIndex).y * this._tileheight;
                                layer.addChild(tile);
                                layer._tiles.push(tile);
                            }
                        }
                        break;
                }
                this.addChild(layer);
                this.renderLayers.push(layer);

                this.cacheAsBitmap = true;
            } else {
                let layer: ObjectLayer;
                layer = new ObjectLayer(dataLayers[layerIndex]);
                let obj: TileObject;
                for (let i = 0; i < layer.objects.length; i++) {
                    if (layer.objects[i].gid == undefined) {
                        continue;
                    }
                    obj = new TileObject(layer.objects[i]);
                    obj.x = layer.objects[i].x;
                    obj.y = layer.objects[i].y - 120;
                    obj.width = layer.objects[i].width;
                    obj.height = layer.objects[i].height;
                    obj.rotation = layer.objects[i].rotation;
                    obj.visible = layer.objects[i].visible;
                    obj.properties = layer.objects[i].properties;
                    layer.renderObject.push(obj);
                    layer.addChild(obj);
                }
                this.addChild(layer);
                this.objectLayers.push(layer);
                this.renderLayers.push(layer);

                this.cacheAsBitmap = true;
            }

        }

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouched, this);
    }

    public onTouched() {

    }


    public get row() {
        return this._height;
    }

    public get infinite() {
        return this._infinite;
    }

    public get nextlayerid() {
        return this._nextlayerid;
    }

    public get orientation() {
        return this._orientation;
    }

    public get renderorder() {
        return this._renderorder;
    }


    public addLayer(layer) {
        this._layers.push(layer);
    }

    public removeLayer() {
        this._layers.pop();
    }

    public removeRenderLayer(name) {
        for (let i = 0; i < this.renderLayers.length; i++) {
            if (name == this.renderLayers[i].name) {
                this.removeChild(this.renderLayers[i]);
                this.renderLayers.splice(i, 1);
                break;
            }
        }
    }

    public updateObjectLayer() {
        for (let j = 0; j < this.objectLayers.length; j++) {
            let layer = this.objectLayers[j];
            let obj;
            for (let i = 0; i < layer.renderObject.length; i++) {
                if (layer.objects[i].gid == undefined) {
                    continue;
                }
                obj = layer.renderObject[i];
                obj.x = layer.objects[i].x;
                obj.y = layer.objects[i].y - 120;
                obj.width = layer.objects[i].width;
                obj.height = layer.objects[i].height;
                obj.rotation = layer.objects[i].rotation;
                obj.visible = layer.objects[i].visible;
                obj.properties = layer.objects[i].properties;
            }
        }

    }

    public addTileset(tileset) {
        TileMap._tilesets.push(tileset);
    }

    public get layers() {
        return this._layers;
    }

    public insertLayerAt(layer, index) {
        this._layers.splice(index, 0, layer);
    }

    public removeLayerAt(index) {
        this._layers.splice(index, 1);
    }

    public layerAt(index) {
        return this._layers[index];
    }

    public getLayerByName(name) {
        let result;
        for (let i = 0; i < this._layers.length; i++) {
            if (name == this._layers[i].name) {
                result = this._layers[i];
            }
        }
        return result;
    }

    public getRenderLayerByName(name) {
        let result;
        for (let i = 0; i < this.renderLayers.length; i++) {
            if (name == this.renderLayers[i].name) {
                result = this.renderLayers[i];
            }
        }
        return result;
    }

    public pixelToScreen(point) {
        return new egret.Point(point.x + this.x, point.y + this.y);
    }

    public pixelToTile(point) {
        return { x: Math.floor(point.x / this._tilewidth), y: Math.floor(point.y / this._tileheight) + 1 }
        return new egret.Point(point.x % this._tilewidth, point.y % this._tileheight);
    }

    public screenToPixel(point) {
        return new egret.Point(point.x - this.x, point.y - this.y);
    }

    public tileToPixel(point, tile) {
    }

    public tileToScreen(point) {
    }
}