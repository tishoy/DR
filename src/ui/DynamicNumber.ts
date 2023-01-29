class DynamicNumber extends egret.Sprite {
    constructor(format = "") {
        super();
        this.format = format;
    }

    private format: string;
    private pool = [];

    private newDigit() {
        let num_bmp = new egret.Bitmap();
        this.pool.push(num_bmp);
    }

    updateView(num: number, color = null) {
        if (isNaN(num)) {
            return;
        }
        let positive = true;
        if (num < 0) {
            Math.abs(num);
            positive = false;
        }

        let temp;
        if (this.format == "") {
            temp = num.toString();
        } else {
            let format_list = this.format.split(".");
            let num_list = num.toString().split(".");
            let behindDigit = "";
            let beforeDigit = "";

            if (num_list[0].length > format_list[0].length) {
                beforeDigit = num_list[0].slice(num_list[0].length - format_list[0].length, num_list[0].length);
            } else {
                beforeDigit = num_list[0];
            }
            while (format_list[0].length > beforeDigit.length) {
                beforeDigit = "0" + beforeDigit;
            }
            temp = (positive ? "" : "-") + beforeDigit;

            if (format_list.length == 2) {
                if (num_list.length == 2) {
                    if (num_list[1].length > format_list[1].length) {
                        behindDigit = num_list[1].slice(0, format_list[1].length);
                    } else {
                        behindDigit = num_list[1]
                    }
                    while (format_list[1].length > behindDigit.length) {
                        behindDigit += "0";
                    }
                } else {
                    behindDigit = format_list[1];
                }
                temp = temp + "." + behindDigit;
            }
        }

        let numChildren = 0;
        for (let i = 0; i < temp.length; i++) {
            if (i == this.pool.length) {
                this.newDigit();
            }
            if (temp[i] == ".") {
                this.pool[i].texture = RES.getRes("pop_dot_png");
            } else {
                this.pool[i].texture = RES.getRes("number_" + temp[i] + "_png");
            }
            if (color) {
                Util.setImageColor(this.pool[i], color);
            }
            this.pool[i].x = i * this.pool[i].width;
            this.addChild(this.pool[i]);
            numChildren++;
        }

        if (numChildren < this.pool.length) {
            for (let i = numChildren; i < this.pool.length; i++) {
                if (this.contains(this.pool[i])) {
                    this.removeChild(this.pool[i]);
                }
            }
        }
    }
}