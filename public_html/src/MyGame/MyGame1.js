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

function MyGame1() {
    // The camera to view the scene
    this.mCamera = null;

    this.mMsg = null;

    this.mDragTest = null;
    this.mDragTest2 = null;
    this.mWindowInDrag = null;
    this.mDragGameObject = null;
    this.mResizeTest = null;
    this.mResizeAndDrag = null;

    this.mRenderableTest = null;
    this.mRenderableTest2 = null;
    this.mSpriteAnimate = null;
    this.mPatrol = null;

    this.kSpriteSheet = "assets/SpriteSheet.png";
    this.kWindowSprite = "assets/computerwindow.png";
    this.mCurrentLine = null;
    this.mP1 = null;
    this.mWindows = null;
    this.mDrawnObjects = [];
}
gEngine.Core.inheritPrototype(MyGame1, Scene);

MyGame1.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpriteSheet);
    gEngine.Textures.loadTexture(this.kWindowSprite);
};

MyGame1.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpriteSheet);
    gEngine.Textures.unloadTexture(this.kWindowSprite);

    var nextLevel = new MyGame2();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

MyGame1.prototype.initialize = function () {
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
    this.mRenderableTest.getXform().setPosition(60, 27.5);
    this.mRenderableTest.getXform().setSize(30, 30);

    this.mRenderableTest2 = new Renderable();
    this.mRenderableTest2.setColor([1, 1, 0, 1]);
    this.mRenderableTest2.getXform().setPosition(40, 40);
    this.mRenderableTest2.getXform().setSize(10, 10);

    this.mResizeTest = new Resizeable(this.mRenderableTest2, this.mCamera);
    this.mResizeTest.initialize();
    //this.mResizeTest.disableResizeAreaBorder();

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

    //this.mResizeAndDrag = new Resizeable(this.mRenderableTest2, this.mCamera);
    //this.mResizeAndDrag.initialize();
    //this.mResizeAndDrag.enableResizeAreaBorder();

    this.mPatrol = new Patrol(10, 40, true);
    this.mPatrol.initialize();
    this.mPatrol.stop();

    this.mDragGameObject = new Draggable(this.mPatrol.getHead(), this.mCamera);
    this.mDragGameObject.setDragArea(0, 0, 5, 5);
    this.mWindows = new WindowManager();


};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame1.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    for (var i = 0; i < this.mDrawnObjects.length; i++) {
        this.mDrawnObjects[i].draw(this.mCamera);
    }

    this.mWindows.draw(this.mCamera, this.mDrawnObjects);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame1.prototype.update = function () {
    var delta = 2;
    var camX = this.mCamera.getWCCenter()[0];
    var camY = this.mCamera.getWCCenter()[1];

    this.mDragTest.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragTest.update();

    this.mDragTest2.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragTest2.update();

    this.mDragGameObject.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mDragGameObject.update();

    //this.mResizeAndDrag.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    //this.mResizeAndDrag.update();

    this.mSpriteAnimate.updateAnimation();
    this.mPatrol.update();


    this.mResizeTest.setMousePosition(this.mCamera.mouseWCX(), this.mCamera.mouseWCY());
    this.mResizeTest.update();

    this.mDragTest2.setDragArea(0, (this.mDragTest2.getXform().getHeight() / 2) - 2, this.mDragTest2.getXform().getWidth() - 2, 2);

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        var box = new TextureRenderable(this.kWindowSprite);
        box.setColor([1, 1, 1, 0]);
        box.getXform().setPosition(camX + ((Math.random() * 80) - 40), camY + ((Math.random() * 60) - 30));
        box.getXform().setSize(20, 15);
        var cam = new Camera(vec2.fromValues(camX + ((Math.random() * 80) - 40), camY + ((Math.random() * 60) - 30)), // position of the camera
                100, // width of camera
                [0, 0, 0, 0]           // viewport (orgX, orgY, width, height)
                );
        cam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
        var window = new Window(box, cam, this.mCamera, 0.9, //Left offset
                0.9, //Right offset
                1.1, //Bottom offset
                1.8, //Top offset
                true, true);
        window.initialize();
        window.setDragArea(0, 7, 20, 2);
        this.mWindows.add(window, true);

    }


    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        this.mCamera.setWCCenter(camX, camY += delta);
    };
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        this.mCamera.setWCCenter(camX -= delta, camY);
    };
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        this.mCamera.setWCCenter(camX, camY -= delta);
    };
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mCamera.setWCCenter(camX += delta, camY);
    };
    this.mCamera.update();

    this.mDrawnObjects = [this.mDragTest, this.mDragTest2, this.mDragGameObject, this.mPatrol, this.mResizeTest];

    this.mWindows.update(this.mCamera);

    //Change Scene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }
};
