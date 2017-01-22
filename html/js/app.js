'use strict';

document.addEventListener("DOMContentLoaded", init);

var app = window.app || {};
app.isGameClear = false;
app.basePath = 'http://ggj2017kumamoto2f-env.ap-northeast-1.elasticbeanstalk.com';
app.limitTerm = 10; // 10ターム
app.currentTerm = 0;    // 現在のターム
app.deltaTime = 0;

var stage;  // 画面オブジェクト

var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

//スコア変数 lisaco
var score1 = new createjs.Text();
var score2 = new createjs.Text();

var playerShip = 62.5;
var retake_limit = 10;
var retake_number = 0;
var time_limit = 180;
var time_current = 0 ;
var time_start = 0;
var flag_start = false;

queue.loadManifest([
    {id: "rocket", src: 'assets/images/rocket.png'},
    {id: "star", src: 'assets/images/star.png'},
    {id: "planet1", src: 'assets/images/planet5.png'},
    {id: "planet2", src: 'assets/images/planet4.png'},
    {id: "planet3", src: 'assets/images/planet1.png'},
    {id: "planet4", src: 'assets/images/planet2.png'},
    {id: "planet5", src: 'assets/images/planet3.png'},
    {id: "space", src: 'assets/images/Space_view.jpg'},
    {id: "go",src: 'assets/images/go.png'},
    {id: "reset",src: 'assets/images/reset.png'},
    //bgm 呼び出してるよ lisaco
    {id: "bgm", src: 'assets/sounds/bgm.mp3'},
    {id: "bgm_thinking", src: 'assets/sounds/bgm_thinking.mp3'},
    {id: "se_rocket", src: 'assets/sounds/se_rocket.mp3'}
    
]);

var setting = {
    background: function () {
        var background = new createjs.Shape();
        background.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 768, 768);
        background.x = 0;
        background.y = 0;
        background.name = 'background';
        return background;
    },
    sidebar: function () {
        var side = new createjs.Shape();
        side.graphics.beginFill("Grey").drawRect(518, 0, 250, 768);
        // side.y = 0;
        // side.x = 0;
        side.name = 'sidebar';
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
        y: 700,
        direction: 90,  // 向き
        speed: 1        // 速度
    },
    star: {
        name: 'star',
        x: 259,
        y: 68,
        gravity: 0.1
    },
    planet1: {
        name: 'planet1',
        gravity: 0.01,
        sideX: 643,
        sideY: 650
    },
    planet2: {
        name: 'planet2',
        gravity: 0.005,
        sideX: 643,
        sideY: 668 - 160
    },
    planet3: {
        name: 'planet3',
        gravity: 0.0025,
        sideX: 643,
        sideY: 668 - 140 * 2
    },
    planet4: {
        name: 'planet4',
        gravity: 0.00125,
        sideX: 643,
        sideY: 668 - 130 * 3
    },
    planet5: {
        name: 'planet5',
        gravity: 0.0006125,
        sideX: 643,
        sideY: 668 - 120 * 4
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
    },
    setXY: function (item, x, y) {
        item.x = x;
        item.y = y;
        return item;
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

    //var button = asset.createButton('', 100, 30);
    //button.addEventListener("click", onClickStart);
    //stage.addChild(button);
    

    //var reset = asset.createButton('', 100, 30);
    //reset.y = 40;
    //reset.addEventListener("click", resetAll);
    //stage.addChild(reset);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', function (e) {
        // console.log(e);
        stage.update();
        app.deltaTime += e.delta;
        if(flag_start == true){
            time_current = app.deltaTime - time_start;
            AddScore();
        }
        
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

    asset.setXY(rocket, game.rocket.x, game.rocket.y);
    rocket.rotation = 0;
    asset.setXY(star, game.star.x, game.star.y);
    asset.setXY(planet1, game.planet1.sideX, game.planet1.sideY);
    asset.setXY(planet2, game.planet2.sideX, game.planet2.sideY);
    asset.setXY(planet3, game.planet3.sideX, game.planet3.sideY);
    asset.setXY(planet4, game.planet4.sideX, game.planet4.sideY);
    asset.setXY(planet5, game.planet5.sideX, game.planet5.sideY);

    var go = stage.getChildByName('go');
    go.visible = true;
    app.currentTerm = app.limitTerm;
    retake_number++;
    AddScore();
    rocketTweenClear();
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

    var planet1 = asset.createAssets(queue.getResult('planet1'), game.planet1.sideX, game.planet1.sideY);
    var planet2 = asset.createAssets(queue.getResult('planet2'), game.planet2.sideX, game.planet2.sideY);
    var planet3 = asset.createAssets(queue.getResult('planet3'), game.planet3.sideX, game.planet3.sideY);
    var planet4 = asset.createAssets(queue.getResult('planet4'), game.planet4.sideX, game.planet4.sideY);
    var planet5 = asset.createAssets(queue.getResult('planet5'), game.planet5.sideX, game.planet5.sideY);
    
    var go = asset.createAssets(queue.getResult('go'),50,15); 
    go.addEventListener("click", onClickStart);
    go.name = 'go';
    stage.addChild(go);

    var reset = asset.createAssets(queue.getResult('reset'),470,15); 
    reset.addEventListener("click", resetAll);
    stage.addChild(reset);

    var zanki = asset.createAssets(queue.getResult('rocket'),620,90);
    stage.addChild(zanki);

    planet1.name = game.planet1.name;
    planet2.name = game.planet2.name;
    planet3.name = game.planet3.name;
    planet4.name = game.planet4.name;
    planet5.name = game.planet5.name;

    //スコア表示 lisaco
    score1.font = "bold 30px Impact";
    score1.color = "#ff7000";
    score2.font = "bold 30px Impact";
	score2.color = "#ff7000";

    score1.x = 560;
	score1.y = 10;	
    score2.x = 655;
	score2.y = 75;
    AddScore();

    //初期びーじーえむ lisaco
    var bgminstance = createjs.Sound.createInstance('bgm_thinking');
    bgminstance.play('none', 0, 0, -1, 1, 0);

    var space = new createjs.Bitmap(queue.getResult('space'));
    space.name = 'space';
    stage.addChildAt(space, 1);

    stage.addChild(planet1);
    stage.addChild(planet2);
    stage.addChild(planet3);
    stage.addChild(planet4);
    stage.addChild(planet5);
    stage.addChild(score1);
    stage.addChild(score2);

    planet1.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        AddScore();	//点数アップ関数！ lisaco
    });

    planet1.on("pressup", planetPressUp);

    planet2.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        AddScore();	//点数アップ関数！ lisaco
    });
    planet2.on("pressup", planetPressUp);

    planet3.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        AddScore();	//点数アップ関数！ lisaco
    });

    planet3.on("pressup", planetPressUp);

    planet4.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        AddScore();	//点数アップ関数！ lisaco
    });

    planet4.on("pressup", planetPressUp);

    planet5.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
        AddScore();	//点数アップ関数！ lisaco
    });

    planet5.on("pressup", planetPressUp);

    rocket.on("click", function (evt) {
        bgminstance.stop();
        rocketClick();
    });

}

/**
 * 星をドラッグから外した場合にコール
 */
function planetPressUp(evt) {
    if (isHitSidebar(evt.target)) {
        createjs.Tween
            .get(evt.target, {loop: false})
            .to({x: game[evt.target.name].sideX, y: game[evt.target.name].sideY}, 300);
    }
}

/**
 * サイドバーへの当たり判定
 * @param item
 */
function isHitSidebar(item) {
    var sidebar = stage.getChildByName('sidebar');
    var point = item.localToLocal(0, 0, sidebar);   // 相対座標
    var isHit = sidebar.hitTest(point.x, point.y);  // サイドバーへの判定

    console.log(item.name + ' Hit?', isHit);
    return isHit;
}

/**
 * AとBのヒットテスト
 * @param a
 * @param b
 */
function isHitTest(a, b) {
    var point = a.localToLocal(60, 60, b);
    return b.hitTest(point.x, point.y);
}

/**
 * rocketの移動
 * {
 *     x: 0,
 *     y: 0,
 *     speed: 0,
 *     direction: 0
 * }
 * @param data
 */
function goRocket(data) {
    var rocket = stage.getChildByName(game.rocket.name);
    var tween = createjs.Tween.get(rocket, {loop: false});
    for (var i = 0, len = data.frames.length; i < len; i++) {
        var item = data.frames[i];
        tween.to({x: item.x, y: item.y, rotation: -item.direction - 270}, 8)
            .call(onOneSecond, [rocket]);
    }
    tween.call(onOneFinish, [data.frames[len - 1]]);
}

/**
 * rocketのアニメーションを削除する
 */
function rocketTweenClear() {
    var rocket = stage.getChildByName(game.rocket.name);
    createjs.Tween.removeTweens(rocket);
}

/**
 * 1秒毎のフレーム後にコール
 * 障害物判定などに利用する
 * @param rocket
 */
function onOneSecond(rocket) {
    var star = stage.getChildByName(game.star.name);
    var isHit = isHitTest(rocket, star);
    if (isHit) {
        gameClear();
    }
}

function onOneFinish(lastFrame) {
    console.log('onOneFinish', lastFrame);
    if (app.currentTerm < app.limitTerm) {
        app.currentTerm++;
        request(lastFrame);
    }
}


/**
 * 開始ボタン
 * @param event
 */
function onClickStart(event) {
    var go = stage.getChildByName('go');
    go.visible = false;
    if(flag_start == false){
        time_start = app.deltaTime;
        flag_start = true;
    }
    
    app.currentTerm = 0;
    
    
    rocketTweenClear();
    request();
}

function gameClear() {
    if (app.isGameClear === true) return;
    app.isGameClear = true;
    app.currentTerm = app.limitTerm;
    rocketTweenClear();

    alert("星についたよ");
}

function request(lastFrame) {
    var p1 = stage.getChildByName(game.planet1.name);
    var p2 = stage.getChildByName(game.planet2.name);
    var p3 = stage.getChildByName(game.planet3.name);
    var p4 = stage.getChildByName(game.planet4.name);
    var p5 = stage.getChildByName(game.planet5.name);
    var ps = [p1, p2, p3, p4, p5];
    var stars = [{
        x: game.star.x,
        y: game.star.y,
        gravity: game.star.gravity
    }];

    for (var i=0, len=ps.length; i < len; i++) {
        if (isHitSidebar(ps[i]) === false) {
            stars.push({
                x: ps[i].x,
                y: ps[i].y,
                gravity: game['planet' + (i + 1)].gravity
            });
        }
    }

    // スタート初期値
    var starship = {
        x: 259,
        y: 700,
        speed: 1,
        direction: 90
    };

    // ゲーム中なら最後のフレーム情報を渡す
    if (!!lastFrame) {
        starship.x = Number(lastFrame.x);
        starship.y = Number(lastFrame.y);
        starship.speed = Number(lastFrame.speed);
        starship.direction = Number(lastFrame.direction);
    }

    axios.post(app.basePath + '/startgame', {
            "starship": starship,
            "stars": stars,
            "stageinfo": {
                "id": 1,
                "name": "stage01"
            }
        }
    )
        .then(function (response) {
            console.log(response);
            goRocket(response.data);
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * 点数追加したいねん lisaco
 */
function AddScore() {
     score1.text = "Time: " + parseInt((time_limit - (time_current / 1000)));
     score2.text = "" + (retake_limit - retake_number);
    if((time_limit - (time_current / 1000)) <= 0 || (retake_limit - retake_number) <= 0){
        localStorage.setItem("Score",(time_limit - (time_current / 1000)) + ((retake_limit - retake_number)*100) );
        window.location.href = 'gameover.html';
    }
}

/**
 * ロケットくりっく！ lisaco
 */
function rocketClick(event) {
    //ロケット発射！
    var rocketinstance = createjs.Sound.createInstance('se_rocket');
    rocketinstance.play('none', 0, 0, 0, 1, 0);

    //びーじーえむ
    //var bgminstance = createjs.Sound.createInstance('bgm');
    //bgminstance.play('none', 0, 0, 0, 1, 0);
}

