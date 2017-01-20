'use strict';

document.addEventListener("DOMContentLoaded", init);

var stage;
var queue = new createjs.LoadQueue();
queue.installPlugin(createjs.Sound);
queue.on("complete", handleComplete, this);

queue.loadManifest([
    {id: "rocket", src: 'assets/images/rocket.png'},
    {id: "star", src: 'assets/images/star.png'}
]);

var background = {};
background.entire = function () {
    var background = new createjs.Shape();
    background.graphics.beginFill("DeepSkyBlue").drawRect(0, 0, 768, 768);
    background.x = 0;
    background.y = 0;
    return background;
};
background.sidebar = function () {
    var side = new createjs.Shape();
    side.graphics.beginFill("Grey").drawRect(518, 0, 250, 768);
    side.x = 0;
    side.y = 0;
    return side;
};


function init(event) {

    console.log('DOMContentLoaded', event);
    stage = new createjs.Stage("GameWindow");

    var entire = background.entire();
    var sidebar = background.sidebar();
    stage.addChild(entire);
    stage.addChild(sidebar);

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', function(e){
        // console.log(e);
        stage.update();
    });
}

function handleComplete(event) {
    console.log(event);
    var rocket = new createjs.Bitmap(queue.getResult('rocket'));
    rocket = anchorCenter(rocket);
    rocket.x = 259;
    rocket.y = 668;
    stage.addChild(rocket);

    var star = new createjs.Bitmap(queue.getResult('star'));
    star = anchorCenter(star);
    star.x = 259;
    star.y = 100;
    stage.addChild(star);
}

function anchorCenter(item) {
    item.regX = item.getBounds().width / 2;
    item.regY = item.getBounds().height / 2;
    return item;
}