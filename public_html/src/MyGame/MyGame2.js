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

function MyGame2() {
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

    this.kBackground = "assets/SpriteSheet.png";
    this.kMiniMap = "assets/SpriteSheet.png";
    this.kWindowSprite = "assets/computerwindow.png";
    this.mCurrentLine = null;
    this.mP1 = null;
    this.mWindows = null;
    this.mDrawnObjects = [];
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kMiniMap);
    gEngine.Textures.loadTexture(this.kWindowSprite);
};

MyGame2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kMiniMap);
    gEngine.Textures.unloadTexture(this.kWindowSprite);
    
    var nextLevel = new MyGame1();  // load the next level
    gEngine.Core.startScene(nextLevel);
};

MyGame2.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
            vec2.fromValues(30, 30), // position of the camera
            100, // width of camera
            [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
            );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mWindows = new WindowManager();
 
    var box = new TextureRenderable(this.kWindowSprite);
    box.setColor([1, 1, 1, 0]);
    box.getXform().setPosition(40, 40);
    box.getXform().setSize(20, 20);
    var cam = new Camera(vec2.fromValues(30, 27.5), // position of the camera
            20, // width of camera
            [0, 0, 0, 0]           // viewport (orgX, orgY, width, height)
            );
    cam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    var window = new Window(box, cam, this.mCamera, 0.9, //Left offset
            0.9, //Right offset
            1.1, //Bottom offset
            1.8, //Top offset
            false, false);
    this.mWindows.add(window, true);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
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
MyGame2.prototype.update = function () {


    this.mCamera.update();

    this.mDrawnObjects = [];

    this.mWindows.update(this.mCamera);
    
        //Change Scene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }  
};
