'use strict';
document.addEventListener("DOMContentLoaded", init);

var rocketAsset = 'assets/images/rocket.png';

// ref: http://yomotsu.net/blog/2013/01/05/fps.html
var now = window.performance && (
    performance.now ||
    performance.mozNow ||
    performance.msNow ||
    performance.oNow ||
    performance.webkitNow );

var getTime = function() {
    return ( now && now.call( performance ) ) || ( new Date().getTime() );
};


function init(event) {
    console.log('DOMContentLoaded', event);

    //Create the renderer
    var renderer = PIXI.autoDetectRenderer(768, 768, {backgroundColor: 0x1099bb});

    //Add the canvas to the HTML document
    var GameWindow = document.getElementById('GameWindow');
    GameWindow.appendChild(renderer.view);

    //Create a container object called the `stage`
    var stage = new PIXI.Container();


    PIXI.loader
        .add(rocketAsset)
        .load(setup);

    function setup() {
        var rocket = new PIXI.Sprite(PIXI.loader.resources[rocketAsset].texture);
        stage.addChild(rocket);

    }

    // サイドバー
    var sidebar = new PIXI.Graphics();
    sidebar.beginFill(0xf0f8ff);
    sidebar.drawRect(518, 0, 250, 768);
    stage.addChild(sidebar);

    /**
     * アニメーション
     */
    var startTime = getTime();
    var fps = 30;
    var frameLength = 30;
    var preFrame = 0;

    function animate(timestamp) {
        window.requestAnimationFrame(animate);
        renderer.render(stage);
        PIXI.actionManager.update(); // update actions

        var lastTime = getTime();
        var frame = Math.floor( ( lastTime - startTime ) / ( 1000.0 / fps ) % frameLength );
        if (preFrame < frame) {
            if (frame === frameLength - 1) {
                preFrame = 0;
            } else {
                preFrame = frame;
            }
        }
    }

    animate();

}
