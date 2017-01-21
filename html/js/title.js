'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;
var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

queue.loadManifest([
    {id: "space", src: 'assets/images/Space_view.jpg'},
    {id: "start", src: 'assets/images/start.png'}
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
    // start_Button: function (){
    //     var start = new createsjs.Shape();


    

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

    // window.location.href = 'パス名'; // 通常の遷移
    // window.open('パス名', '_blank'); // 新しいタブを開き、ページを表示
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

    var start = asset.createAssets(queue.getResult('start'), 259, 576);

        // アンカーを中心にする
        bitmap.x = 0;
        bitmap.y = 0;

    stage.addChildAt(bitmap, 1);
    stage.addChild(start);
 }