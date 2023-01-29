/**
 * 
 */
class MapGenerate {
    static rows = 9;
    static cols = 7;
    static mapData = [];

    static moves = [];
    static points = [];

    static lastPoint = null;
    static road_end = [];

    static setUp() {
        // a = a || {}, this.width = void 0 != a.width ? a.width : 7,
        //     this.height = void 0 != a.height ? a.height : 11,
        //     this.tileSize = void 0 != a.tileSize ? a.tileSize : 20,
        //     this.cols = Math.floor((this.width - 2 * this.mapMargin) / this.tileSize),
        //     this.rows = Math.floor((this.height - 2 * this.mapMargin) / this.tileSize);
        for (var t = 0; t < this.rows; t++) {
            this.mapData[t] = []; for (var e = 0; e < this.cols; e++)
                this.mapData[t][e] = 2, t % 2 == 0 && e % 2 == 0 && (this.mapData[t][e] = 0)
        }
    }

    static init() {
        this.road_end = [];
        this.mapData = [];
        this.setUp();
        for (var a = 0; a < this.rows; a++) {
            for (var t = 0; t < this.cols; t++) {
                this.points.push({ row: a, col: t, value: this.mapData[a][t] });
            }
        }
    }

    static draw() {
        this.points = [];
        let one_row = "", tow_row = "", three_row = ""
        for (var a = 0; a < this.rows; a++) {
            one_row = "#";
            if (a % 2 === 1) {
                tow_row = "#"
                three_row = "#"
            }
            for (var t = 0; t < this.cols; t++) {
                this.points.push({ row: a, col: t, value: this.mapData[a][t] });
                one_row += this.mapData[a][t] === 1 ? "." : "#";
            }
            one_row += "#"
            tow_row += "#"
            three_row += "#"
        }

        // svg.select("#tiles").selectAll("rect").data(points).attr("fill", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } }).attr("stroke-width", 1).attr("stroke", function (a) { switch (a.value) { case 0: return "#bbb"; case 1: return "#fff"; case 2: return "#aaa" } })
    }

    static query(start) {
        var x = start.x, y = start.y;
        var dirs = '';
        if ((y - 2 >= 0) && (this.mapData[y - 2][x] == 0)) dirs += 'N';
        if ((x - 2 >= 0) && (this.mapData[y][x - 2] == 0)) dirs += 'W';
        if ((y + 2 < this.rows) && (this.mapData[y + 2][x] == 0)) dirs += 'S';
        if ((x + 2 < this.cols) && (this.mapData[y][x + 2] == 0)) dirs += 'E';

        if (dirs == '') {
            let p = this.moves.pop();
            if (this.moves.length == 0) {
            } else {
                if (this.lastPoint == null) {
                    this.road_end.push(p);
                    this.lastPoint = p;
                } else {
                    if (Math.abs(p.x - this.lastPoint.x) + Math.abs(p.y - this.lastPoint.y) != 2) {
                        this.road_end.push(p);
                    }
                    console.log(p);
                    this.lastPoint = p;
                }

                this.query(this.moves[this.moves.length - 1]);
            }

        } else {
            var dir = dirs.substr(Math.floor(Math.random() * dirs.length), 1);

            switch (dir) {
                case 'N':
                    this.mapData[y - 1][x] = 1;
                    y = y - 2;
                    break;
                case 'W':
                    this.mapData[y][x - 1] = 1;
                    x = x - 2;
                    break;
                case 'S':
                    this.mapData[y + 1][x] = 1;
                    y = y + 2;
                    break;
                case 'E':
                    this.mapData[y][x + 1] = 1;
                    x = x + 2;
                    break;
            }
            this.mapData[y][x] = 1;
            this.moves.push({ y: y, x: x });
            this.query({ y: y, x: x });
        }
    }

    static reset() {
        for (var a = 0; a < this.rows; a++)
            for (var t = 0; t < this.cols; t++)
                this.mapData[a][t] = 2, a % 2 == 0 && t % 2 == 0 && (this.mapData[a][t] = 0);
    }

    static headIndex;

    static caculation() {
        let startX = Math.floor(Math.random() * 4) * 2
        console.log(startX);
        this.headIndex = startX;
        var a = { y: 0, x: startX };
        this.mapData[0][startX] = 1;
        this.moves = [];
        this.moves.push(a);
        this.query(a);
    }

    static getMap() {
        console.log(new Date().getTime())
        this.init();
        this.caculation();

        let switchHead = [0, 0, 0, 0, 0, 0, 0];
        let switchDec = [0, 0, 0, 0, 0, 0, 0];
        let head = [0, 0, 0, 0, 0, 0, 0];
        let dec = [0, 0, 0, 0, 0, 0, 0];
        let tail = [];
        let tailDec = [];
        let canBeTail = [];
        for (let i = 0; i < 7; i++) {

            if (this.mapData[8][i] == 1) {
                canBeTail.push(i);
            }

        }

        let tailIndex = Math.floor(canBeTail.length * Math.random());
        console.log("入口位置" + tailIndex);
        let switchTiles = Math.floor(Math.random() * 4)

        for (let i = 0; i < 7; i++) {
            if (i == this.headIndex) {
                switchHead.push(2);
                switchDec.push(18);
                head.push(2)
                dec.push(18);
            } else {
                switchHead.push(0);
                switchDec.push(0);
                head.push(0)
                dec.push(0)
            }
            if (i == canBeTail[tailIndex]) {
                tail.push(2)
                tailDec.push(18);
            } else {
                tail.push(0);
                tailDec.push(0)
            }
        }

        console.log(head);

        let layerIndex = 0, keyIndex = 0, doorIndex = 0, lightIndex = 0;

        let switchLayer = new Object(this.genLayer());
        switchLayer["visible"] = false;

        let layer = new Object(this.genLayer());
        layer["visible"] = false;

        let isLeftRight, isUpDown;
        for (let i = 0; i < this.mapData.length; i++) {
            for (let j = 0; j < this.mapData[i].length; j++) {
                if (this.mapData[i][j] == 1) {

                    // 上下
                    if (i > 0 && i < this.mapData.length - 1) {
                        if (this.mapData[i - 1][j] == 1 || this.mapData[i + 1][j] == 1) {
                            isUpDown = true;
                        } else {
                            isUpDown = false;
                        }
                    } else if (i == 0) {
                        if (this.mapData[i + 1][j] == 1) {
                            isUpDown = true;
                        } else {
                            isUpDown = false;
                        }
                    } else if (i == this.mapData.length - 1) {
                        if (this.mapData[i - 1][j] == 1) {
                            isUpDown = true;
                        } else {
                            isUpDown = false;
                        }
                    }
                    if (j > 0 && j < this.mapData[i].length - 1) {
                        if (this.mapData[i][j - 1] == 1 || this.mapData[i][j + 1] == 1) {
                            isLeftRight = true;
                        } else {
                            isLeftRight = false;
                        }
                    } else if (j == 0) {
                        if (this.mapData[i][j + 1] == 1) {
                            isLeftRight = true;
                        } else {
                            isLeftRight = false;
                        }
                    } else if (j == this.mapData[i].length - 1) {
                        if (this.mapData[i][j - 1] == 1) {
                            isLeftRight = true;
                        } else {
                            isLeftRight = false;
                        }
                    }

                    if (isUpDown && isLeftRight) {
                        dec.push(16 + Math.floor(Math.random() * 2));
                        head.push(1);
                        switchHead.push(1);
                        switchDec.push(dec[dec.length - 1]);
                    } else {
                        let random = Math.random() * 10;
                        if (random > 4) {
                            if (isUpDown) {
                                dec.push(18);
                            }
                            if (isLeftRight) {
                                dec.push(19);
                            }
                            head.push(2)
                            if (i == 0 && j == this.headIndex) {
                                switchHead.push(0);
                                switchDec.push(0);
                            } else {
                                switchHead.push(2);
                                switchDec.push(dec[dec.length - 1]);
                            }
                        } else if (random > 2) {
                            if (isUpDown) {
                                dec.push(36);
                            }
                            if (isLeftRight) {
                                dec.push(36);
                            }
                            head.push(4)
                            if (i == 0 && j == this.headIndex) {
                                switchHead.push(0);
                                switchDec.push(0);
                            } else {
                                switchHead.push(4);
                                switchDec.push(dec[dec.length - 1]);
                            }
                        } else {
                            if (isUpDown) {
                                dec.push(34);
                            }
                            if (isLeftRight) {
                                dec.push(33);
                            }
                            head.push(3)
                            if (i == 0 && j == this.headIndex) {
                                switchHead.push(0);
                                switchDec.push(0);
                            } else {
                                switchHead.push(3);
                                switchDec.push(dec[dec.length - 1]);
                            }
                        }

                    }


                } else {
                    switchHead.push(0);
                    switchDec.push(0);
                    dec.push(0);
                    head.push(0)
                }
            }
        }

        console.log(head);

        switchLayer["data"] = switchHead.concat(tail).concat([0, 0, 0, 0, 0, 0, 0]);
        layer["data"] = head.concat(tail).concat([0, 0, 0, 0, 0, 0, 0]);

        let switchDecLayer = new Object(this.genDecLayer());
        switchDecLayer["data"] = switchDec.concat(tailDec);

        let decLayer = new Object(this.genDecLayer());
        decLayer["data"] = dec.concat(tailDec);


        let itemLayer = new Object(this.genObject());
        let switchItemLayer = new Object(this.genObject());
        let init = new Object(this.genObject());
        init["name"] = "init";

        let randomItem;
        this.hasSwitch = false;
        let gameData = GameController.getInstance().getGameData();
        let roadSwitch;

        console.log("钥匙" + gameData.hasRandomedKeys, "门" + gameData.hasRandomedDoors)
        if (gameData.hasRandomedKeys > gameData.hasRandomedDoors && this.road_end.length > 0) {
            if (gameData.hasRandomedKeys - gameData.hasRandomedDoors > 1) {
                let door = this.genDoor();

                let doorPos: egret.Point = this.canBeDoor(layer);
                if (doorPos["properties"] != undefined) {
                    console.log("门" + doorPos.x, doorPos.y);
                    door.name = "door" + doorIndex;
                    door.x = doorPos.x;
                    door.y = doorPos.y;
                    door.properties = doorPos["properties"];
                    doorIndex++;
                    itemLayer["objects"].push(door);
                    switchItemLayer["objects"].push(door);
                    init["objects"].push(door);
                }
            }
        }


        console.log(this.road_end);
        for (let i = 0; i < this.road_end.length; i++) {
            randomItem = this.genItem();
            randomItem.x = this.road_end[i].x * 120;
            randomItem.y = this.road_end[i].y * 120 + 360; // 物品以左下为坐标+120 并且多加了一行+120
            if (randomItem.type == "key") {
                gameData.hasRandomedKeys++;
                randomItem.name = "key" + keyIndex;
                keyIndex++;
                itemLayer["objects"].push(randomItem);
                switchItemLayer["objects"].push(randomItem);
            }
            if (randomItem.type == "fire") {
                itemLayer["objects"].push(randomItem);
                switchItemLayer["objects"].push(randomItem);
            }
            if (randomItem.type == "switch") {
                this.hasSwitch = true;
                // TODO 增加layer
                roadSwitch = randomItem;
                switchItemLayer["objects"].push(randomItem);
            }
            if (randomItem.type == "light") {
                randomItem.name = "light" + lightIndex;
                let sight = this.genSight();
                sight.name = "sight" + lightIndex;
                randomItem.properties.sight = sight.name;
                sight.x = (2 + Math.floor(Math.random() * 3)) * 120;
                sight.y = (2 + Math.floor(Math.random() * 9)) * 120 + 360;
                itemLayer["objects"].push(sight);
                switchItemLayer["objects"].push(sight);
                init["objects"].push(sight);
                // TODO 增加layer
                itemLayer["objects"].push(randomItem);
                switchItemLayer["objects"].push(randomItem);
                lightIndex++;
            }

            init["objects"].push(randomItem);
        }




        this.start.x = canBeTail[tailIndex] * 120;
        itemLayer["objects"].push(this.start);
        switchItemLayer["objects"].push(this.start);
        init["objects"].push(this.start);
        this.exit.x = this.headIndex * 120;
        itemLayer["objects"].push(this.exit);
        switchItemLayer["objects"].push(this.exit);
        init["objects"].push(this.exit);

        itemLayer["name"] = "item0";
        switchItemLayer["name"] = "item1"

        let l0, l1;

        if (this.hasSwitch) {
            roadSwitch.name = "switch0";
            roadSwitch.properties.on = "0-1";
            roadSwitch.properties.off = "0-0"

            l0 = this.genGroup();
            switchLayer["name"] = "layer" + 0;
            switchDecLayer["name"] = "declayer" + 0;
            switchItemLayer["name"] = "item" + 0;
            l0.name = "l0";
            l0.properties.room = 0;
            l0.properties.state = 0;
            l0.layers = [this.genGround(), switchLayer, switchDecLayer, switchItemLayer];

            l1 = this.genGroup();
            layer["name"] = "layer" + 1;
            decLayer["name"] = "declayer" + 1;
            itemLayer["name"] = "item" + 1;
            l1.name = "l1";
            l1.properties.room = 0;
            l1.properties.state = 1;
            l1.layers = [this.genGround(), layer, decLayer, itemLayer];
            return [init, l0, l1];

        } else {
            l0 = this.genGroup();
            layer["name"] = "layer" + 0;
            decLayer["name"] = "declayer" + 0;
            itemLayer["name"] = "item" + 0;
            l0.properties.room = 0;
            l0.properties.state = 0;
            l0.layers = [this.genGround(), layer, decLayer, itemLayer];
            return [init, l0];
        }







    }

    static canBeDoor(layer) {
        let dopos = this.road_end[Math.floor(Math.random() * this.road_end.length)];
        let index;
        let got = false;
        let door = new egret.Point();
        if (dopos.x > 0) {
            index = this.getIndexFromXY(dopos.x - 1, dopos.y + 2);
            if (layer["data"][index] == 2) {
                console.log("做")
                got = true;
                door.x = (dopos.x - 1) * 120
                door.y = (dopos.y + 2) * 120
                door["properties"] = {
                    "closeimage": "dec033_png",
                    "openimage": "dec034_png"
                };

            }
        }
        if (!got && dopos.x < 6) {
            index = this.getIndexFromXY(dopos.x + 1, dopos.y + 2);
            if (layer["data"][index] == 2) {
                console.log("有")
                got = true;
                door.x = (dopos.x + 1) * 120
                door.y = (dopos.y + 2) * 120
                door["properties"] = {
                    "closeimage": "dec033_png",
                    "openimage": "dec034_png"
                };
            }
        }
        if (!got && dopos.y > 0) {
            index = this.getIndexFromXY(dopos.x, dopos.y + 1);
            if (layer["data"][index] == 2) {
                console.log("上")
                got = true;
                door.x = dopos.x * 120
                door.y = (dopos.y + 1) * 120 + 120
                door["properties"] = {
                    "closeimage": "dec031_png",
                    "openimage": "dec032_png"
                };
            }
        }
        if (!got && dopos.y < 10) {
            index = this.getIndexFromXY(dopos.x, dopos.y + 3);

            if (layer["data"][index] == 2) {
                console.log("下")
                got = true;
                door.x = dopos.x * 120
                door.y = (dopos.y + 3) * 120 + 120
                door["properties"] = {
                    "closeimage": "dec031_png",
                    "openimage": "dec032_png"
                };
            }
        }
        return door;
    }

    static hasSwitch;

    static genItem() {
        let random = Math.random() * 14;
        if (random >= 8) {
            return this.genKey();
        } else if (random >= 4) {
            return this.genFire();
        } else if (random >= (this.hasSwitch ? 0 : 2)) {
            return this.genLight();
        } else if (random >= 0) {
            return this.genSwitch();
        }
    }

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
        "y": 1440
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
        "y": 240
    };

    static genSwitch() {
        return {
            "gid": 15,
            "height": 120,
            "id": 11,
            "name": "switch",
            "properties":
            {
                "isexist": 1,
                "off": "",
                "on": "",
                "status": "off"
            },
            "propertytypes":
            {
                "isexist": "int",
                "off": "string",
                "on": "string",
                "status": "string"
            },
            "rotation": 0,
            "type": "switch",
            "visible": true,
            "width": 120,
            "x": 480,
            "y": 480
        }
    }

    static genFire() {
        return {
            "gid": 22,
            "height": 120,
            "id": 40,
            "name": "fire0",
            "rotation": 0,
            "type": "fire",
            "visible": true,
            "width": 120,
            "x": 600,
            "y": 1320
        };
    }

    static genDoor() {
        return {
            "gid": 7,
            "height": 141,
            "id": 38,
            "name": "door",
            "properties":
            {
                "closeimage": "dec031_png",
                "openimage": "dec032_png"
            },
            "propertytypes":
            {
                "closeimage": "string",
                "openimage": "string"
            },
            "rotation": 0,
            "type": "door",
            "visible": true,
            "width": 142,
            "x": 360,
            "y": 960
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
            "name": "sight",
            "properties":
            {
                "image": "sight01_png"
            },
            "propertytypes":
            {
                "image": "string"
            },
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

    static genDecLayer() {
        return {
            "data": [],
            "height": 11,
            "id": 2,
            "name": "declayer0",
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

    static genGroup() {
        return {
            "id": 22,
            "layers": [],
            "name": "l0",
            "opacity": 1,
            "properties": {
                "room": 0,
                "state": 0
            },
            "propertytypes": {
                "room": "int",
                "state": "int"
            },
            "type": "group",
            "visible": true,
            "x": 0,
            "y": 0
        }
    }

    static genGround() {
        return {
            "data": [0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                156, 0, 0, 0, 0, 0, 0],
            "height": 13,
            "id": 1,
            "name": "ground0",
            "offsetx": -120,
            "offsety": 0,
            "opacity": 1,
            "type": "tilelayer",
            "visible": true,
            "width": 7,
            "x": 0,
            "y": 0
        }
    }

    static getXYFromIndex(index) {
        let obj = {
            x: index % this.cols,
            y: Math.floor(index / this.cols)
        }
        return obj;
    }

    static getIndexFromXY(x, y) {
        return y * this.cols + x;
    }

}