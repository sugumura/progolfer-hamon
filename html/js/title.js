'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;
var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

queue.loadManifest([
    {id: "space", src: 'assets/images/Space_view.jpg'},
    {id: "titlelogo", src: 'assets/images/Titlelogo.png'},
]);

var setting = {
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

    var sidebar = setting.sidebar();
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
   
    var bitmap = new createjs.Bitmap(queue.getResult('space'));
    var titlelogo = asset.createAssets(queue.getResult('titlelogo'), 259, 192);    

    // var start = asset.createAssets(queue.getResult('start'), 259, 576);


        var bitmap = new createjs.Bitmap(queue.getResult('space'));
       

        // アンカーを中心にする
        bitmap.x = 0;
        bitmap.y = 0;

    stage.addChildAt(bitmap, 1);
    stage.addChild(start);
    stage.addChild(titlelogo);
 }