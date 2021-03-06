'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;
var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

queue.loadManifest([
    { id: "space", src: 'html/assets/images/Space_view.jpg' },
    { id: "titlelogo", src: 'html/assets/images/Titlelogo.png' },
    //bgm 呼び出してるよ lisaco
    { id: "bgm_title", src: 'html/assets/sounds/bgm_title.mp3' },
    { id: "se_rocket", src: 'html/assets/sounds/se_rocket.mp3' },//start buttonで使う

    { id: "start", src: 'html/assets/images/start.png' }
]);

var setting = {
    sidebar: function() {
        var side = new createjs.Shape();
        side.graphics.beginFill("Grey").drawRect(518, 0, 250, 768);
        side.x = 0;
        side.y = 0;
        return side;
    }
};
    
var asset = {
    createAssets: function(resource, x, y) {
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
    createjs.Ticker.addEventListener('tick', function(e) {
        // console.log(e);
        stage.update();
    });
}

/**
 * リソース読み込み完了時
 * @param event
 */
function handleComplete(event) {
    console.log("test", event);
    // var titlelogo = asset.createAssets(queue.getResult('titlelogo'), 259, 192);    
    var bitmap = new createjs.Bitmap(queue.getResult('space'));

    //初期びーじーえむ lisaco
    var bgminstance = createjs.Sound.createInstance('bgm_title');
    bgminstance.play('none', 0, 0, -1, 0.5, 0);

    // アンカーを中心にする
    bitmap.x = 0;
    bitmap.y = 0;

    stage.addChildAt(bitmap, 1);
    // stage.addChild(titlelogo);


    setTimeout(function() {
        var start = document.getElementById("startimg");
        start.style.display = "block";
    }, 4000)
    
}

function test(event) {
    // body...
    if (onClick('titlelogo')) {
        window.location.href = 'html/gameover.html'; // 通常の遷移
    };
}

