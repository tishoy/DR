/**
 * 
 */
class AnimateController {
    private static instance: AnimateController = null;
    private factory: egret.MovieClipDataFactory;

    constructor() {
        this.initAnimateData();
    }

    public static getInstance(): AnimateController {
        if (this.instance === null) {
            this.instance = new AnimateController();
        }
        return this.instance;
    }

    private initAnimateData() {
        let mc_data = RES.getRes("animate_json");
        let mc_png = RES.getRes("animate_png");
        this.factory = new egret.MovieClipDataFactory(mc_data, mc_png);
    }

    public getAnimate(name) {
        return this.factory.generateMovieClipData(name);
    }
}