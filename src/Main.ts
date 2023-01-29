//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        AdaptManager.getInstance().init(this.stage);

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })



    }

    private logo: egret.Bitmap;
    private health: egret.Bitmap;
    private health_bg: egret.Shape;

    private async runGame() {

        UIManager.getInstance().init(this.stage);
        await this.loadLogo();

        this.showLogo();
        // SceneManager.Instance.toStartScene();
    }


    private async loadLogo() {
        await RES.loadConfig("resource/default.res.json", "resource/");
        await RES.loadGroup("preload", 0);
    }

    private showLogo() {
        let shape = new egret.Shape();
        shape.graphics.beginFill(ColorEnum.YIBA_WHITE);
        shape.graphics.drawRect(0, 0, AdaptManager.getDisplayWidth(), AdaptManager.getDisplayHeight());
        shape.graphics.endFill();
        UIManager.getInstance().getLoadingLayer().addChild(shape);

        this.logo = new egret.Bitmap();
        this.logo.texture = RES.getRes("logo_png");
        this.logo.anchorOffsetX = this.logo.width / 2;
        this.logo.anchorOffsetY = this.logo.height / 2;
        this.logo.x = AdaptManager.centerX;
        this.logo.y = AdaptManager.centerY;
        UIManager.getInstance().getLoadingLayer().addChild(this.logo);
        this.logo.alpha = 0;
        egret.Tween.get(this.logo).to({ "alpha": 1 }, 100).wait(300).to({
            "alpha": 0
        }, 1000).call(() => {
            this.health_bg = new egret.Shape();

            this.health_bg.graphics.beginFill(ColorEnum.BLACK);
            this.health_bg.graphics.drawRect(0, 0, AdaptManager.getDisplayWidth(), AdaptManager.getDisplayHeight());
            this.health_bg.graphics.endFill();
            UIManager.getInstance().getLoadingLayer().addChild(this.health_bg);

            this.health = new egret.Bitmap();
            this.health.texture = RES.getRes("health_png")
            this.health.anchorOffsetX = this.health.width / 2;
            this.health.anchorOffsetY = this.health.height / 2;
            this.health.x = AdaptManager.centerX;
            this.health.y = AdaptManager.centerY;
            UIManager.getInstance().getLoadingLayer().addChild(this.health);



        }).wait(100).call(() => {
            this.hideLogo();
        })
    }

    private async hideLogo() {
        await this.loadResource();
        SceneManager.getInstance().toStartScene();
        // SceneManager.getInstance().toStartScene();
        UIManager.getInstance().getLoadingLayer().removeChildren();
        SoundManager.getInstance().playBGM();
    }

    private async loadResource() {
        try {
            await RES.loadGroup("ui");
            await RES.loadGroup("tiled");
            await RES.loadGroup("animate");
            await RES.loadGroup("sound");

            // StageDesign.Parse();
        }
        catch (e) {
            console.error(e);
        }
    }

}