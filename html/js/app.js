'use strict';

//Create the renderer
var renderer = PIXI.autoDetectRenderer(768, 768, {backgroundColor : 0x1099bb});

//Add the canvas to the HTML document
var GameWindow = document.getElementById('GameWindow');
GameWindow.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();


PIXI.loader.add('assets/images/rocket.png').load(setup);
function setup() {
    var cat = new PIXI.Sprite(PIXI.loader.resources['assets/images/rocket.png'].texture);
    stage.addChild(cat);
    console.log(cat);
    var action_moveto = new PIXI.action.MoveTo(600, 400, 3);
    var action_moveby = new PIXI.action.MoveBy(-500, -100, 2);
    var animation = PIXI.actionManager.runAction(cat, action_moveto);
    animation.on('end', function(elapsed) {
        PIXI.actionManager.runAction(cat, action_moveby);
    });
}

// rocket
// var rocketAsset = PIXI.Texture.fromImage('assets/images/rocket.png');
// var rocket = new PIXI.Sprite(rocketAsset);
// rocket.anchor.x = 0.5;
// rocket.anchor.y = 0.5;
// rocket.position.x = 0;
// rocket.position.y = 0;
// stage.addChild(rocket);

// サイドバー
var sidebar = new PIXI.Graphics();
sidebar.beginFill(0xf0f8ff);
sidebar.drawRect(518, 0, 250, 768);
stage.addChild(sidebar);

var moveto = PIXI.action.MoveTo(500, 400, 2);
// var animation = PIXI.actionManager.runAction(rocket, action_move);
// animation.on('end', function(elapsed) {
//     console.log('action end.');
// });


/**
 * アニメーション
 */
function animate() {
    window.requestAnimationFrame(animate);
    renderer.render(stage);
    PIXI.actionManager.update(); // update actions
}

animate();
