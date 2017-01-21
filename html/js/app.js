'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;
var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

queue.loadManifest([
    {id: "rocket", src: 'assets/images/rocket.png'},
    {id: "star", src: 'assets/images/star.png'},
    {id: "planet1", src: 'assets/images/planet1.png'},
    {id: "planet2", src: 'assets/images/planet2.png'},
    {id: "planet3", src: 'assets/images/planet3.png'},
    {id: "planet4", src: 'assets/images/planet4.png'},
    {id: "planet5", src: 'assets/images/planet5.png'}
    {id: "space", src: 'assets/images/Space_view.jpg'}
]);

var setting = {
    background: function () {
        var background = new createjs.Shape();
        background.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 768, 768);
        background.x = 0;
        background.y = 0;
        return background;
    },
    sidebar: function () {
        var side = new createjs.Shape();
        side.graphics.beginFill("Grey").drawRect(518, 0, 250, 768);
        side.x = 0;
        side.y = 0;
        return side;
    }
};

var asset = {
    createAssets: function (resource, x, y) {
        var bitmap = new createjs.Bitmap(resource);
        // アンカーを中心にする
        bitmap.regX = bitmap.getBounds().width / 2;
        bitmap.regY = bitmap.getBounds().height / 2;
        bitmap.x = x;
        bitmap.y = y;
        return bitmap;
    }
};


/**
 * 初期化
 * @param event
 */
function init(event) {

    console.log('DOMContentLoaded', event);
    stage = new createjs.Stage("GameWindow");

    var background = setting.background();
    var sidebar = setting.sidebar();
    stage.addChild(background);
    stage.addChild(sidebar);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(e){
        // console.log(e);
        stage.update();
    });
}

/**
 * リソース読み込み完了時
 * @param event
 */
function handleComplete(event) {
    console.log("test",event);
    var rocket = asset.createAssets(queue.getResult('rocket'), 259, 668);
    stage.addChild(rocket);

    var star = asset.createAssets(queue.getResult('star'), 259, 100);
    stage.addChild(star);

 
    var diff = 120;
    var planet1 = asset.createAssets(queue.getResult('planet1'), 643, 668);
    var planet2 = asset.createAssets(queue.getResult('planet2'), 643, 668 - diff);
    var planet3 = asset.createAssets(queue.getResult('planet3'), 643, 668 - diff * 2);
    var planet4 = asset.createAssets(queue.getResult('planet4'), 643, 668 - diff * 3);
    var planet5 = asset.createAssets(queue.getResult('planet5'), 643, 668 - diff * 4);

    stage.addChild(bitmap);

　  var bitmap = new createjs.Bitmap(queue.getResult('space'));
    // アンカーを左上にする
    // bitmap.x = 0;
    // bitmap.y = 0;

    stage.addChild(planet1);
    stage.addChild(planet2);
    stage.addChild(planet3);
    stage.addChild(planet4);
    stage.addChild(planet5);

    // createjs.Tween.get(star, { loop: true })
    //     .to({ x: 400 }, 1000, createjs.Ease.getPowInOut(4))
    //     .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
    //     .to({ alpha: 0, y: 225 }, 100)
    //     .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
    //     .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));
}

/**
 * アンカーを中心にする
 * @param item
 * @returns {*}
 */
function anchorCenter(item) {
    item.regX = item.getBounds().width / 2;
    item.regY = item.getBounds().height / 2;
    return item;
}