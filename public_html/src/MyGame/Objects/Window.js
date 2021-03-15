/* Class: Window.js
 * Author: The Griffins
 * 
 * A GameObject that ties a renderable and camera together to form a window object that can be optionally dragged and resized
 * 
 * FUNCTIONS:
 * Window(renderableObject, windowCam, worldCam, xoffsetleft, xoffsetright, yoffsetbottom, yoffsettop, drag, resize):Defines a renderable with an attached camera
 *      (renderableObject): A renderable object that will be associated with the camera.
 *      (windowCam): The camera for the window. Dimensions will not stay the same.
 *      (worldCam): The world camera that the window will be drawn upon.
 *      (xoffsetleft): The camera's WC offset from the left side of renderableObject.
 *      (xoffsetright): The camera's WC offset from the right side of renderableObject.
 *      (yoffsetbottom): The camera's WC offset from the bottom side of renderableObject.
 *      (yoffsettop): The camera's WC offset from the top side of renderableObject.
 *      (drag): A boolean that allows the window to be draggable if set to true.
 *      (resize): A boolean that allows the window to be resizeable if set to true.
 * initialize(): Initializes the draggable and resizable versions of renderable if enabled.
 * setISDrag(bool): Defines if the window is draggable or not, depending on whether the input is true or false.
 *      (bool): A boolean that allows the window to be draggable if set to true.
 * setISResize(bool): Defines if the window is resizeable or not, depending on whether the input is true or false.
 *      (bool): A boolean that allows the window to be resizeable if set to true.
 * getCamera(): Returns the window's camera.
 * setKey(key): Sets the window's key.
 *      (key): The window's numerical key.
 * getKey(): Returns the window's numerical key.
 * drawWindow(cam): Draws the window's renderable.
 *      (cam): The world camera that this window will be displayed on.
 * drawCamera(cam, objects): Draws the window's camera.
 *      (cam): The world camera that this window will be displayed on.
 *      (objects): An array of objects to be displayed within the window's camera.
 * update(cam): Draws the window object. Its dimensions are specified by the inputted world camera.
 *      (cam): The world camera that the window's dimensions will compare to.
 */
"use strict";

function Window(renderableObject, windowCam, worldCam, xoffsetleft, xoffsetright, yoffsetbottom, yoffsettop, drag, resize) {
    this.mRenderableObject = renderableObject;
    this.mInitXform = this.mRenderableObject.getXform();
    this.mCamera = windowCam;
    this.mInitCamX = worldCam.getWCCenter()[0];
    this.mInitCamY = worldCam.getWCCenter()[1];
    this.mLastCamX = worldCam.getWCCenter()[0];
    this.mLastCamY = worldCam.getWCCenter()[1];
    this.mInitCamWidth = worldCam.getWCWidth();
    this.mLastCamWidth = worldCam.getWCWidth();
    this.mInitCamHeight = worldCam.getWCHeight();
    this.mLastCamHeight = worldCam.getWCHeight();
    this.mOffsetLeft = xoffsetleft;
    this.mOffsetRight = xoffsetright;
    this.mOffsetBottom = yoffsetbottom;
    this.mOffsetTop = yoffsettop;
    this.mInitOffsetLeft = xoffsetleft;
    this.mInitOffsetRight = xoffsetright;
    this.mInitOffsetBottom = yoffsetbottom;
    this.mInitOffsetTop = yoffsettop;
    this.mIsDrag = drag; 
    this.mIsResize = resize;
    this.mVisible = true;
    this.mDraggable = null;
    this.mResizeable = null;
    this.mKey = null;
};

gEngine.Core.inheritPrototype(Window, GameObject);

Window.prototype.initialize = function() {
    if (this.mIsDrag) {
        this.mDraggable = new Draggable(this.mRenderableObject);
    };
    if (this.mIsResize) {
        this.mResizeable = new Resizeable(this.mRenderableObject);
    };
    
}

Window.prototype.setIsDrag = function(bool) {
    this.mIsDrag = bool;
    if (this.mIsDrag) {
        this.mDraggable = new Draggable(this.mRenderableObject);
    }
    else {
        this.mDraggable = null;
    };
};

Window.prototype.setIsResize = function(bool) {
    this.mIsResize = bool;
    if (this.mIsResize) {
        this.mResizeable = new Resizeable(this.mRenderableObject);
    }
    else {
        this.mResizeable = null;
    };
};

Window.prototype.getCamera = function() {
    return this.mCamera;
};

Window.prototype.setKey = function(key) {
    this.mKey = key;
}

Window.prototype.getKey = function() {
    return this.mKey;
}

Window.prototype.drawRenderable = function(cam) {
    if (this.mVisible) {
        this.mRenderableObject.draw(cam);
    }
};

Window.prototype.drawCamera = function(cam, objects){
        this.mCamera.setupViewProjection();
        for (var i = 0; i < objects.length; i++) {
            objects[i].draw(this.mCamera);
        }
}

Window.prototype.update = function (cam) {
    //Update renderable to camera position and size
    //Update position
    this.mRenderableObject.getXform().setPosition(this.mRenderableObject.getXform().getXPos() + (cam.getWCCenter()[0]-this.mLastCamX),
        this.mRenderableObject.getXform().getYPos()+ (cam.getWCCenter()[1]-this.mLastCamY));
    //Update size
    if (cam.getWCWidth != this.mLastCamWidth) {
        if (cam.getWCHeight != this.mLastCamHeight) {
             this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() + (cam.getWCWidth()-this.mLastCamWidth)/2,
                this.mRenderableObject.getXform().getHeight() + (cam.getWCHeight()-this.mLastCamHeight)/2);
        }
        else {
            this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() + (cam.getWCWidth()-this.mLastCamWidth)/2,
                this.mRenderableObject.getXform().getHeight());
        };
    }
    else if (cam.getWCHeight != this.mLastCamHeight) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth(),
                this.mRenderableObject.getXform().getHeight() + (cam.getWCHeight()-this.mLastCamHeight)/2);
    };
    if (this.mRenderableObject.getXform().getWidth() < 0) { 
        this.mRenderableObject.getXform().setSize(0, this.mRenderableObject.getXform().getHeight());
    };
    if (this.mRenderableObject.getXform().getHeight() < 0) { 
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getHeight(), 0);
    };
    this.mLastCamX = cam.getWCCenter()[0];
    this.mLastCamY = cam.getWCCenter()[1];
    this.mLastCamWidth = cam.getWCWidth();
    this.mLastCamHeight = cam.getWCHeight();
    //Set offsets with adherence to original offset
    this.mOffsetLeft = this.mInitOffsetLeft / (1+(this.mInitXform.getWidth() - this.mRenderableObject.getXform().getWidth()));
    this.mOffsetRight = this.mInitOffsetRight / (1+(this.mInitXform.getWidth() - this.mRenderableObject.getXform().getWidth()));
    this.mOffsetBottom = this.mInitOffsetBottom / (1+(this.mInitXform.getHeight() - this.mRenderableObject.getXform().getHeight()));
    this.mOffsetTop = this.mInitOffsetTop /  (1+(this.mInitXform.getHeight() - this.mRenderableObject.getXform().getHeight()));
    //Set camera dimensions to renderable dimensions - offsets
    var width = (this.mRenderableObject.getXform().getWidth()-(this.mOffsetRight+this.mOffsetLeft))*(cam.getViewport()[2]/cam.getWCWidth());
    var height = (this.mRenderableObject.getXform().getHeight()-(this.mOffsetTop+this.mOffsetBottom))*(cam.getViewport()[3]/cam.getWCHeight());
    if (width < 0) { width = 0 };
    if (height < 0) { height = 0 };
    var x = ((this.mRenderableObject.getXform().getXPos())-(this.mRenderableObject.getXform().getWidth()/2)-
            (cam.getWCCenter()[0]-cam.getWCWidth()/2)+this.mOffsetLeft)*(cam.getViewport()[2]/cam.getWCWidth());
    var y = ((this.mRenderableObject.getXform().getYPos())-(this.mRenderableObject.getXform().getHeight()/2)-
            (cam.getWCCenter()[1]-cam.getWCHeight()/2)+this.mOffsetBottom)*(cam.getViewport()[3]/cam.getWCHeight());
    this.mCamera.setViewport([x, y, width, height]);
    
    if (this.mIsDrag) {
        this.mDraggable.update();
    }
    if (this.mIsResize) {
        this.mResizeable.update();
    };
    
    //TEST FUNCTIONS
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth()-0.2, this.mRenderableObject.getXform().getHeight()-0.2);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.G)) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth()+0.2, this.mRenderableObject.getXform().getHeight()+0.2);
    }
};
