/**
 * 
 */

class RoadGenerate {

    static start = {
        "gid": 9,
        "height": 120,
        "id": 7,
        "name": "start",
        "rotation": 0,
        "type": "start",
        "visible": true,
        "width": 120,
        "x": 120,
        "y": 1320
    };
    static exit = {
        "gid": 9,
        "height": 120,
        "id": 6,
        "name": "exit",
        "rotation": 0,
        "type": "exit",
        "visible": true,
        "width": 120,
        "x": 120,
        "y": 120
    };

    static genSwitch() {
        return {
            "gid": 15,
            "height": 120,
            "id": 11,
            "name": "switch",
            "properties": [
                {
                    "name": "add",
                    "type": "int",
                    "value": 1
                },
                {
                    "name": "remove",
                    "type": "int",
                    "value": 0
                }],
            "rotation": 0,
            "type": "switch",
            "visible": true,
            "width": 120,
            "x": 480,
            "y": 480
        }
    }

    static genKey() {
        return {
            "gid": 15,
            "height": 120,
            "id": 1,
            "name": "key",
            "rotation": 0,
            "type": "key",
            "visible": true,
            "width": 120,
            "x": 720,
            "y": 840
        }
    }


    static genLight() {
        return {
            "gid": 13,
            "height": 120,
            "id": 3,
            "name": "",
            "properties": [
                {
                    "name": "sight",
                    "type": "object",
                    "value": 4
                }],
            "rotation": 0,
            "type": "light",
            "visible": true,
            "width": 120,
            "x": 0,
            "y": 840
        }
    }

    static genSight() {
        return {
            "gid": true,
            "height": 480,
            "id": 4,
            "name": "",
            "rotation": 0,
            "type": "sight",
            "visible": false,
            "width": 480,
            "x": -240,
            "y": 600
        }
    }

    static genLayer() {
        return {
            "data": [],
            "height": 11,
            "id": 1,
            "name": "",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 7,
            "x": 0,
            "y": 0,
        }
    }

    static genDecorate() {
        return {
            "data": [],
            "height": 11,
            "id": 2,
            "name": "decorate0",
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 7,
            "x": 0,
            "y": 0,
        }
    }

    static genObject() {
        return {
            "draworder": "topdown",
            "id": 3,
            "name": "item",
            "objects": [],
            "opacity": 1,
            "type": "objectgroup",
            "visible": true,
            "x": 0,
            "y": 0
        }
    }

    static tileLayer() {
        let layerIndex = 0, decorateIndex = 0, objIndex = 0;
        let layer = new Object(this.genLayer());

        let decorate = new Object(this.genDecorate());

        let item = new Object(this.genObject());

        let doors = Math.floor(Math.random() * 1);
        let keys = Math.floor(Math.random() * 3);
        let switches = Math.floor(Math.random() * 2);
        let lights = Math.floor(Math.random() * 2);

        layer["name"] = "layer" + layerIndex;

        console.log(keys + switches + lights);

        for (let i = 0; i < 77; i++) {
            decorate["data"].push(0);
        }

        let height_list = [];
        for (let i = 2; i < layer["height"]; i++) {
            height_list.push(i);
        }


        let pointX = 1 + RoadGenerate.randomTile(layer["width"] - 2); //处于两端的位置不设起始点
        let data = [];
        data = this.lineRoad(pointX, layer["width"], true).concat(data);
        data = this.lineRoad(pointX, layer["width"], false).concat(data);
        this.start.x = pointX * 120;
        item["objects"].push(this.start);

        height_list.pop();
        height_list.pop();
        height_list.pop();

        let point_Y = 9
        let temp_Y;
        let temp_X
        console.log(height_list);
        let y_list = this.randomAndPop(height_list, keys + switches + lights);
        console.log(y_list);
        for (let i = 0; i < y_list.length; i++) {
            temp_Y = point_Y
            point_Y = y_list[i];
            data = this.generateRoad(new egret.Point(pointX, temp_Y), new egret.Point(pointX, point_Y), layer["width"]).concat(data);
            if (i == y_list.length - 1) {
                temp_X = this.randomTile(layer["width"] - 3);
                temp_X = (temp_X + 2 >= pointX ? temp_X + 3 : temp_X + 2);
            } else {
                temp_X = this.randomTile(layer["width"] - 1);
                temp_X = (temp_X >= pointX ? temp_X + 1 : temp_X);
            }

            data = this.generateRoad(new egret.Point(pointX, point_Y), new egret.Point(temp_X, point_Y), layer["width"]).concat(data);
            pointX = temp_X;
        }
        let rest_of_y = y_list[y_list.length - 1] - 1;
        while (rest_of_y > 0) {
            data = this.lineRoad(pointX, layer["width"], false).concat(data);
            rest_of_y--;
        }
        data = this.lineRoad(pointX, layer["width"], true).concat(data);
        console.log(pointX);
        this.exit.x = pointX * 120;
        item["objects"].push(this.exit);
        console.log(data);
        layer["data"] = data;
        return [layer, decorate, item];
    }

    /**
     * 
     * @param index 
     * @param width 
     * @param isColumn 柱子
     * @returns 
     */
    static lineRoad(index, width, isColumn) {
        let result = [];
        for (let i = 0; i < width; i++) {
            if (isColumn) {
                if (i == index || i == index - 1 || i == index + 1) {
                    result.push(1);
                } else {
                    result.push(0);
                }
            } else {
                if (i == index) {
                    result.push(2);
                } else {
                    result.push(0);
                }
            }
        }
        return result;
    }

    static generateRoad(from, to, width) {
        let result = [];
        console.log(from, to);
        if (from.x == to.x) {
            // 纵向生成
            for (let i = from.y - 1; i > to.y; i--) {
                result = this.lineRoad(from.x, width, false).concat(result);
            }
            console.log(result, "y");
        }
        if (from.y == to.y) {
            for (let i = 0; i < width; i++) {
                if (i < from.x && i < to.x) {
                    result.push(0);
                }
                if (i > from.x && i < to.x) {
                    result.push(2);
                }
                if (i < from.x && i > to.x) {
                    result.push(2);
                }
                if (i == from.x || i == to.x) {
                    result.push(1);
                }
                if (i > from.x && i > to.x) {
                    result.push(0)
                }
            }
        }
        return result;
    }

    static randomAndPop(list, times) {
        let index;
        let result = [];
        while (times > 0) {
            index = Math.floor(Math.random() * list.length);
            result.push(list[index]);
            if (index > 0 && index < list.length - 1) {
                list.splice(index - 1, 3);
            } else if (index == 0) {
                list.splice(index, 2);
            } else if (index == list.length - 1) {
                list.splice(index - 1, 2)
            }
            times--;
        }
        result.sort((a, b) => {
            return b - a
        });
        return result;
    }

    static randomTile(x) {
        return Math.floor(Math.random() * x);
    }
}
