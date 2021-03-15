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

    this.mWindowInDrag = null;

    this.kSpriteSheet = "assets/SpriteSheet.png";
    this.kBackground = "assets/planet.jpg";
    this.kMiniMap = "assets/space.jpg";
    this.kWindowSprite = "assets/computerwindow.png";
    this.kStats = "assets/playerstats.png";
    this.mWindows = null;
    this.mDrawnObjects = [];
}
gEngine.Core.inheritPrototype(MyGame2, Scene);

MyGame2.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kSpriteSheet);
    gEngine.Textures.loadTexture(this.kBackground);
    gEngine.Textures.loadTexture(this.kMiniMap);
    gEngine.Textures.loadTexture(this.kWindowSprite);
    gEngine.Textures.loadTexture(this.kStats);
};

MyGame2.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kSpriteSheet);
    gEngine.Textures.unloadTexture(this.kBackground);
    gEngine.Textures.unloadTexture(this.kMiniMap);
    gEngine.Textures.unloadTexture(this.kWindowSprite);
    gEngine.Textures.unloadTexture(this.kStats);
    
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
    
    this.mBackground = new TextureRenderable(this.kBackground);
    this.mBackground.setColor([1, 1, 1, 0]);
    this.mBackground.getXform().setPosition(30, 30);
    this.mBackground.getXform().setSize(100, 80);
    
    this.mMiniMap = new TextureRenderable(this.kMiniMap);
    this.mMiniMap.setColor([1, 1, 1, 0]);
    this.mMiniMap.getXform().setPosition(400, 30);
    this.mMiniMap.getXform().setSize(100, 80);
    
    this.mBars = new TextureRenderable(this.kStats);
    this.mBars.setColor([1, 1, 1, 0]);
    this.mBars.getXform().setPosition(-400, 30);
    this.mBars.getXform().setSize(100, 50);

    this.mWindows = new WindowManager();
 
    var minimap = new TextureRenderable(this.kWindowSprite);
    minimap.setColor([1, 1, 1, 0]);
    minimap.getXform().setPosition(-8, 55);
    minimap.getXform().setSize(20, 20);
    var cam = new Camera(vec2.fromValues(400, 27.5), // position of the camera
            40, // width of camera
            [0, 0, 0, 0]           // viewport (orgX, orgY, width, height)
            );
    cam.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    var window = new Window(minimap, cam, this.mCamera, 0.9, //Left offset
            0.9, //Right offset
            1.4, //Bottom offset
            1.8, //Top offset
            true, true);
    window.initialize();
    window.setDragArea(0,9, 20, 2);
    this.mWindows.add(window, true);
    
    var bars = new TextureRenderable(this.kWindowSprite);
    bars.setColor([1, 1, 1, 0]);
    bars.getXform().setPosition(-8, 0);
    bars.getXform().setSize(30, 15);
    var cam2 = new Camera(vec2.fromValues(-400, 27.5), // position of the camera
            80, // width of camera
            [0, 0, 0, 0]           // viewport (orgX, orgY, width, height)
            );
    cam2.setBackgroundColor([0.5, 0.5, 0.5, 1]);
    var window2 = new Window(bars, cam2, this.mCamera, 0, //Left offset
            0, //Right offset
            0, //Bottom offset
            0, //Top offset
            false, false);
    window2.initialize();
    this.mWindows.add(window2, true);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame2.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mWindows.draw(this.mCamera, this.mDrawnObjects);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame2.prototype.update = function () {


    this.mCamera.update();

    this.mDrawnObjects = [this.mMiniMap, this.mBars];

    this.mWindows.update(this.mCamera);
    
        //Change Scene
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q)) {
        gEngine.GameLoop.stop();
    }  
};
