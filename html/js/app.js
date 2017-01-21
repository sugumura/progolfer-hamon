'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;

var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

//スコア変数 lisaco
var score1 = new createjs.Text();
var scoretxt;

queue.loadManifest([
    {id: "rocket", src: 'assets/images/rocket.png'},
    {id: "star", src: 'assets/images/star.png'},
    {id: "planet1", src: 'assets/images/planet1.png'},
    {id: "planet2", src: 'assets/images/planet2.png'},
    {id: "planet3", src: 'assets/images/planet3.png'},
    {id: "planet4", src: 'assets/images/planet4.png'},
    {id: "planet5", src: 'assets/images/planet5.png'},
    {id: "space", src: 'assets/images/Space_view.jpg'},
    //bgm 呼び出してるよ lisaco
	{id: "bgm", src: 'assets/sounds/bgm.mp3'},
	{id: "bgm_thinking", src: 'assets/sounds/bgm_thinking.mp3'},
	{id: "se_rocket", src: 'assets/sounds/se_rocket.mp3'}
]);

//queue.loadFile([
//	{id: "bgm", src: 'assets/sounds/bgm.mp3'},
//	{id: "bgm_thinking", src: 'assets/sounds/bgm_thinking.mp3'},
//	{id: "se_rocket", src: 'assets/sounds/se_rocket.mp3'}
//	]);

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

/**
 * ゲームオブジェクトの初期情報
 */
var game = {
    rocket: {
        name: 'rocket',
        x: 259,
        y: 668,
        rotation: 0
    },
    star: {
        name: 'star',
        x: 259,
        y: 100
    },
    planet1: {
        name: 'planet1',
        x: 643,
        y: 668
    },
    planet2: {
        name: 'planet2',
        x: 643,
        y: 668 - 120
    },
    planet3: {
        name: 'planet3',
        x: 643,
        y: 668 - 120 * 2
    },
    planet4: {
        name: 'planet4',
        x: 643,
        y: 668 - 120 * 3
    },
    planet5: {
        name: 'planet5',
        x: 643,
        y: 668 - 120 * 4
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
    },
    createButton: function (label, width, height) {
        var button = new createjs.Container();
        var bg = new createjs.Shape();
        bg.graphics.beginFill("White").drawRect(0, 0, width, height);
        var text = new createjs.Text(label, "24px sans-serif", "#000000");
        button.addChild(bg);
        button.addChild(text);
        return button;
    }
};


/**
 * 初期化
 * @param event
 */
function init(event) {

    console.log('DOMContentLoaded', event);
    stage = new createjs.Stage("GameWindow");
    scoretxt = 0;

    var background = setting.background();
    var sidebar = setting.sidebar();
    stage.addChild(background);
    stage.addChild(sidebar);

    var button = asset.createButton('開始', 100, 30);
    button.addEventListener("click", request);
    stage.addChild(button);

    var reset = asset.createButton('リセット', 100, 30);
    reset.y = 40;
    reset.addEventListener("click", resetAll);
    stage.addChild(reset);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(e){
        // console.log(e);
        stage.update();
    });
}

/**
 * 最初の状態に戻す
 */
function resetAll() {
    var rocket = stage.getChildByName(game.rocket.name);
    var star = stage.getChildByName(game.star.name);
    var planet1 = stage.getChildByName(game.planet1.name);
    var planet2 = stage.getChildByName(game.planet2.name);
    var planet3 = stage.getChildByName(game.planet3.name);
    var planet4 = stage.getChildByName(game.planet4.name);
    var planet5 = stage.getChildByName(game.planet5.name);
}

/**
 * リソース読み込み完了時
 * @param event
 */
function handleComplete(event) {
    console.log(event);
    var rocket = asset.createAssets(queue.getResult('rocket'), game.rocket.x, game.rocket.y);
    rocket.name = game.rocket.name;
    stage.addChild(rocket);

    var star = asset.createAssets(queue.getResult('star'), game.star.x, game.star.y);
    star.name = game.star.name;
    stage.addChild(star);

    var planet1 = asset.createAssets(queue.getResult('planet1'), game.planet1.x, game.planet1.y);
    var planet2 = asset.createAssets(queue.getResult('planet2'), game.planet2.x, game.planet2.y);
    var planet3 = asset.createAssets(queue.getResult('planet3'), game.planet3.x, game.planet3.y);
    var planet4 = asset.createAssets(queue.getResult('planet4'), game.planet4.x, game.planet4.y);
    var planet5 = asset.createAssets(queue.getResult('planet5'), game.planet5.x, game.planet5.y);

    planet1.name = game.planet1.name;
    planet2.name = game.planet2.name;
    planet3.name = game.planet3.name;
    planet4.name = game.planet4.name;
    planet5.name = game.planet5.name;

	//スコア表示 lisaco
	score1.font = "bold 30px Impact";
	score1.color = "#ff7000";
	score1.text = "score：" + ("0000" + scoretxt).slice(-4);
	score1.x = 560;
	score1.y = 50;	

	//初期びーじーえむ lisaco
	var bgminstance = createjs.Sound.createInstance('bgm_thinking');
	bgminstance.play('none', 0, 0, -1, 1, 0);
	
    var bitmap = new createjs.Bitmap(queue.getResult('space'));
    
    stage.addChildAt(bitmap, 1);
    
    stage.addChild(planet1);
    stage.addChild(planet2);
    stage.addChild(planet3);
    stage.addChild(planet4);
    stage.addChild(planet5);
	stage.addChild(score1);

    planet1.on("pressmove", function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    AddScore();	//点数アップ関数！ lisaco
    });
    planet1.on("pressup", function(evt) { console.log("up"); })

    planet2.on("pressmove", function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    AddScore();	//点数アップ関数！ lisaco
    });
    planet2.on("pressup", function(evt) { console.log("up"); })

    planet3.on("pressmove", function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    AddScore();	//点数アップ関数！ lisaco
    });
    planet5.on("pressup", function(evt) { console.log("up"); })

    planet4.on("pressmove", function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    AddScore();	//点数アップ関数！ lisaco
    });
    planet4.on("pressup", function(evt) { console.log("up"); })

    planet5.on("pressmove", function(evt) {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
    AddScore();	//点数アップ関数！ lisaco
    });
    planet5.on("pressup", function(evt) { console.log("up"); })
    
	rocket.on("click", function(evt) {
    	bgminstance.stop();
    	rocketClick();
    });
    
}

var frames = {
    frames: [
        {
            x: 259 - 10,
            y: 668 - 10,
            speed: 0,
            direction: 0
        },
        {
            x: 259 - 130,
            y: 668 - 10,
            speed: 0,
            direction: 180
        },
        {
            x: 259 - 10,
            y: 668 + 40,
            speed: 0,
            direction: 270
        },
        {
            x: 259 - 110,
            y: 668 - 10,
            speed: 0,
            direction: 360
        }
    ]
};

function tweenTest() {
    var rocket = stage.getChildByName(game.rocket.name);
    var tween = createjs.Tween.get(rocket, { loop: false });
    for (var i = 0, len = frames.frames.length; i < len; i++) {
        var item = frames.frames[i];
        tween.to({x: item.x, y: item.y, rotation: item.direction}, 1000)
            .call(onOneSecond);
    }
}

/**
 * 1秒毎のフレーム後にコール
 * 障害物判定などに利用する
 * @param e
 */
function onOneSecond(e) {
    console.log('onOnSecond', e.target.x, e.target.y);
}


/**
 * 通信開始
 * @param event
 */
function request(event) {
    setTimeout(tweenTest, 1000);
    axios.post('/test', {
        starship: {
            x : 100,
            y : 100,
            speed : 10,
            direction : 45
        },
        stars :[
            {
                x : 10,
                y : 20,
                gravity : 5
            },
            {
                x : 40,
                y : 50,
                gravity : 2
            }
        ],
        stageinfo : {
            id : 1,
            name : "stage01"
        }
    })
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.error(error);
    });
}

/**
 * 点数追加したいねん lisaco
 */
function AddScore() {
	 scoretxt = scoretxt + 1;
	score1.text = "score：" + ("0000" + scoretxt).slice(-4);
}

/**
 * ロケットくりっく！ lisaco
 */
 function rocketClick(event){
 	//ロケット発射！
 	var rocketinstance = createjs.Sound.createInstance('se_rocket');
	rocketinstance.play('none', 0, 0, 0, 1, 0);
 
	//びーじーえむ
	//var bgminstance = createjs.Sound.createInstance('bgm');
	//bgminstance.play('none', 0, 0, 0, 1, 0);
 }

// ゲームオーバーイベント

//function gameOver(event){
    // if(衝突の条件){
    //  window.location.href = './gameover.html'; // 通常の遷移

    // }
    
 //}