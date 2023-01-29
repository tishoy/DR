/**
 * 
 */
class StageTileMap extends TileMap {

    public objects;
    public stage_view;


    constructor(data) {
        super(data);
    }

    public currentLayerIndex = 0;

    public sortChildrenIndex() {
        for (let i = 0; i < this.renderLayers.length; i++) {
            if (this.renderLayers[i].type == "tilelayer") {
                this.renderLayers[i]._tiles.sort((a, b) => { return b.y != a.y ? (a.y - b.y) : (b.x - a.x) });
                for (let j = 0; j < this.renderLayers[i]._tiles.length; j++) {
                    if (this.renderLayers[i]._tiles[j] == undefined) {
                        continue;
                    }
                    this.renderLayers[i].setChildIndex(this.renderLayers[i]._tiles[j], 0);
                }
            }

        }
    }


    public renderOtherLayers() {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type == "tilelayer") {
                this.renderLayerByData(this.layers[i])
            }
        }
    }

    public renderGroupGround(id) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type == "group" && this.layers[i].name == "l" + id) {
                for (let j = 0; j < this.layers[i].layers.length; j++) {
                    if (this.layers[i].layers[j].type == "tilelayer") {
                        this.renderLayerByData(this.layers[i].layers[j])
                    }
                }
            }
        }
        this.sortChildrenIndex();
    }

    public renderRoomAndStatus(room, state) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type == "group" && this.layers[i].properties.room == room
                && this.layers[i].properties.state == state) {
                this.currentLayerIndex = Number(this.layers[i].name[1]);
                for (let j = 0; j < this.layers[i].layers.length; j++) {
                    if (this.layers[i].layers[j].type == "tilelayer") {
                        this.renderLayerByData(this.layers[i].layers[j])
                    }
                }
            }
        }
        this.sortChildrenIndex();
    }

    public getGroupObject(room, state) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type == "group" && this.layers[i].properties.room == room
                && this.layers[i].properties.state == state) {
                for (let j = 0; j < this.layers[i].layers.length; j++) {
                    if (this.layers[i].layers[j].type == "objectgroup"
                        && this.layers[i].layers[j].name == ("item" + this.layers[i].name[1])) {
                        return this.layers[i].layers[j].objects;
                    }
                }
            }
        }
    }

    public renderGroupObject(id) {

    }

    public renderGroupSky(id) {
        for (let i = 0; i < this.layers.length; i++) {
            if (this.layers[i].type == "group" && this.layers[i].name == "l" + id) {
                for (let j = 0; j < this.layers[i].layers.length; j++) {
                    if (this.layers[i].layers[j].type == "tilelayer") {
                        this.renderLayerByData(this.layers[i].layers[j])
                    }
                }
            }
        }
        this.sortChildrenIndex();
    }

    public removeGroup(id) {

    }

    public renderGround() {
        for (let i = 0; i < 3; i++) {
            super.renderLayerByName("ground" + i);
        }
        this.sortChildrenIndex();
    }

    public renderLayer(id) {
        super.renderLayerByName("layer" + id);
    }

    public renderDecLayer(id) {
        super.renderLayerByName("declayer" + id);
    }

    // public renderObject() {
    //     // super.renderLayerByName("item");
    // }

    public renderDecorate(id) {
        super.renderLayerByName("decorate" + id);
    }

    public updateLayer(name) {
        super.updateLayer(this.getRenderLayerByName(name));
    }

    public removeCurrentLayer(current) {
        this.removeRenderLayer("layer" + current);
    }

    public toRoom(id, state) {
        this.stage_view.removeItems();
        ItemTileController.getInstance().resetInRoom();
        this.removeChildren();
        this.renderGround();
        this.renderRoomAndStatus(id, state);
    }

    public resetMap() {
        this.stage_view.removeItems();
        ItemTileController.getInstance().reset();
        this.removeChildren();
        this.renderGround();
        this.renderRoomAndStatus(0, 0);

        // this.renderObject();
        // this.currentLayerIndex = 0;

    }

    public resetDecorate() {
        this.removeRenderLayer("decorate" + this.currentLayerIndex);
        this.renderDecorate(0);
    }

    public getCurrentLayer() {
        return this.getRenderLayerByName("layer" + this.currentLayerIndex);
    }

    public getCurrentDecLayer() {
        return this.getRenderLayerByName("declayer" + this.currentLayerIndex);
    }

    public getObjects() {
        return this.getLayerByName("item");
    }

    public getDecorate() {
        return this.getRenderLayerByName("decorate" + this.currentLayerIndex);
    }

    public setLayerVisible(name, visible) {
        this.getRenderLayerByName(name).visible = visible;
    }

    public setLayerIndex(name, nameOrIndex) {
        if (typeof (nameOrIndex) == "number") {
            super.setChildIndex(this.getRenderLayerByName(name), nameOrIndex)
        } else {
            let index = super.getChildIndex(super.getRenderLayerByName(nameOrIndex));
            super.setChildIndex(this.getRenderLayerByName(name), index)
        }
    }
}