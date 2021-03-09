/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
 FontRenderable, SpriteRenderable, LineRenderable,
 GameObject */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    this.mDragTest = null;
    this.mDragTest2 = null;
    this.mDragGameObject = null;
    this.mResizeTest = null;
    this.mRenderableTest = null;
    this.mRenderableTest2 = null;
    this.mSpriteAnimate = null;
    this.mPatrol = null;

    this.kSpriteSheet = "assets/SpriteSheet.png";
    this.mCurrentLine = null;
    this.mP1 = null;
    this.mWindows = [];
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpriteSheet);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpriteSheet);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(30, 30), // position of the camera
            100, // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // sets the background to gray

    this.mRenderableTest = new Renderable();
    this.mRenderableTest.setColor([1, 0, 0, 1]);
    this.mRenderableTest.getXform().setPosition(30, 27.5);
    this.mRenderableTest.getXform().setSize(10, 10);

    this.mRenderableTest2 = new Renderable();
    this.mRenderableTest2.setColor([1, 1, 0, 1]);
    this.mRenderableTest2.getXform().setPosition(40, 40);
    this.mRenderableTest2.getXform().setSize(10, 10);

    this.mResizeTest = new Resizeable(this.mRenderableTest, this.mCamera);
    this.mResizeTest.setResizeArea(0, -4, 10, 2);


    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([0, 0, 0, 1]);
    this.mMsg.getXform().setPosition(-19, -8);
    this.mMsg.setTextHeight(3);

    this.mSpriteAnimate = new SpriteAnimateRenderable(this.kSpriteSheet);
    this.mSpriteAnimate.setColor([1, 1, 1, 0]);
    this.mSpriteAnimate.getXform().setPosition(this.mSpawnX, this.mSpawnY);
    this.mSpriteAnimate.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mSpriteAnimate.setAnimationSpeed(50);
    this.mSpriteAnimate.getXform().setPosition(10, 10);
    this.mSpriteAnimate.getXform().setSize(12, 10);
    this.mSpriteAnimate.setSpriteSequence(512, 0, // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164, // widthxheight in pixels
            5, // number of elements in this sequence
            0);

    this.mDragTest = new Draggable(this.mSpriteAnimate, this.mCamera);
    this.mDragTest.setDragArea(0, 4, 10, 2);

    this.mDragTest2 = new Draggable(this.mRenderableTest2, this.mCamera);
    this.mDragTest2.setDragArea(0, 4, 10, 2);

    this.mPatrol = new Patrol(10, 40, true);
    this.mPatrol.initialize();
    this.mPatrol.stop();

    this.mDragGameObject = new Draggable(this.mPatrol.getHead(), this.mCamera);
    this.mDragGameObject.setDragArea(0, 0, 5, 5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mMsg.draw(this.mCamera);
    this.mDragTest.draw(this.mCamera);// only draw status in the main camera
    this.mDragTest2.draw(this.mCamera);


    this.mResizeTest.draw(this.mCamera);
    this.mPatrol.draw(this.mCamera);
    this.mDragGameObject.draw(this.mCamera);

    for (var i = 0; i < this.mWindows.length; i++) {
        this.mWindows[i].draw(this.mCamera);
    }
    for (var j = 0; j < this.mWindows.length; j++) {
        var cam = this.mWindows[j].getCamera();
        cam.setupViewProjection();
        this.mDragTest.draw(cam);
        this.mResizeTest.draw(cam);
    }

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mDragTest.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragTest.update();

    this.mDragTest2.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragTest2.update();

    this.mDragGameObject.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragGameObject.update();

    this.mSpriteAnimate.updateAnimation();
    this.mPatrol.update();


    this.mResizeTest.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mResizeTest.update();

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var box = new Renderable();
        box.setColor([0, 0, 1, 1]);
        box.getXform().setPosition(50, 27.5);
        box.getXform().setSize(20, 15);
        var cam = new Camera(vec2.fromValues(30, 27.5), // position of the camera
                20, // width of camera
                [0, 0, 0, 0]           // viewport (orgX, orgY, width, height)
                );
        cam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
        var window = new Window(box, cam, 2, 1, false, false);
        this.mWindows.push(window);
    }
    for (var i = 0; i < this.mWindows.length; i++) {
        this.mWindows[i].update();
    }
};
