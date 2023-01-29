/**
 * 工具类
 */
module Util {
    export function spliceColor(color) {
        let result = { r: -1, g: -1, b: -1 };
        result.b = color % 256;
        result.g = Math.floor((color / 256)) % 256;
        result.r = Math.floor((color / 256) / 256);
        return result;
    }

    export function setImageColor(image: egret.DisplayObject, color: number) {
        // 将16进制颜色分割成rgb值
        let result = Util.spliceColor(color);
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        let colorFilter = new egret.ColorMatrixFilter(colorMatrix);

        image.filters = [colorFilter];

    }

    export function sortBallAndLight(list) {
        let temp = list.sort((a, b) => {
            return (b.y - a.y) - (b.x - a.x) * 0.72
        })
        return temp
    }
}