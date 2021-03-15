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
    this.mWorldCam = worldCam;
    this.mInitCamX = worldCam.getWCCenter()[0];
    this.mInitCamY = worldCam.getWCCenter()[1];
    this.mLastCamX = worldCam.getWCCenter()[0];
    this.mLastCamY = worldCam.getWCCenter()[1];
    this.mInitCamWidth = worldCam.getWCWidth();
    this.mLastCamWidth = worldCam.getWCWidth();
    this.mInitCamHeight = worldCam.getWCHeight();
    this.mLastCamHeight = worldCam.getWCHeight();
    this.mOffsetLeft = xoffsetleft / this.mInitXform.getWidth();
    this.mOffsetRight = xoffsetright / this.mInitXform.getWidth();
    this.mOffsetBottom = yoffsetbottom / this.mInitXform.getHeight();
    this.mOffsetTop = yoffsettop / this.mInitXform.getWidth();
    this.mIsDrag = drag;
    this.mIsResize = resize;
    this.mVisible = true;
    this.mKey = null;

    this.mDragArea = null;
    this.mResizeable = null;
    this.mTest = null;

    this.mDragAreaXOffset = null;
    this.mDragAreaYOffset = null;
    this.mDragAreaWidth = null;
    this.mDragAreaHeight = null;
    this.mMouseX = null;
    this.mMouseY = null;

    this.wasDown = false;
    this.dragging = false;

}
gEngine.Core.inheritPrototype(Window, GameObject);

Window.prototype.initialize = function () {

    if (this.mIsDrag) {
        this.mDragArea = new Renderable();
        this.mDragArea.setColor([0, 1, 0, 0.5]);
    }
    ;
    if (this.mIsResize) {
        this.mResizeable = new Resizeable(this.mRenderableObject);
        this.mResizeable.initialize();
    }
    ;

};

Window.prototype.setDragArea = function (xOffset, yOffset, width, height) {
    if (this.mIsDrag) {
        this.mDragAreaXOffset = xOffset;
        this.mDragAreaYOffset = yOffset;
        this.mDragAreaWidth = width;
        this.mDragAreaHeight = height;

        this.mDragArea.getXform().setPosition(this.mRenderableObject.getXform().getXPos() + xOffset, this.mRenderableObject.getXform().getYPos() + yOffset);
        this.mDragArea.getXform().setWidth(width);
        this.mDragArea.getXform().setHeight(height);
    }
};

Window.prototype.setIsDrag = function (bool) {
    this.mIsDrag = bool;
    if (this.mIsDrag) {

    } else {
        this.mDraggable = null;
    }
    ;
};

Window.prototype.setIsResize = function (bool) {
    this.mIsResize = bool;
    if (this.mIsResize) {

    } else {
        this.mResizeable = null;
    }
    ;
};

Window.prototype.getCamera = function () {
    return this.mCamera;
};

Window.prototype.setKey = function (key) {
    this.mKey = key;
}

Window.prototype.getKey = function () {
    return this.mKey;
}

Window.prototype.drawRenderable = function (cam) {
    if (this.mVisible) {
        this.mRenderableObject.draw(cam);
    }
    if (this.mIsDrag) {
        this.mDragArea.draw(cam);
    }
    if (this.mIsResize)
    {
        this.mResizeable.draw(cam);
    }


};
Window.prototype.setMousePosition = function (x, y) {
    this.mMouseX = x;
    this.mMouseY = y;

};
Window.prototype.drawCamera = function (cam, objects) {
    this.mCamera.setupViewProjection();
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw(this.mCamera);
    }
    
    
};

Window.prototype.update = function (cam) {
    if (this.mIsDrag) {
        this.mDragArea.getXform().setPosition(this.mRenderableObject.getXform().getXPos() + this.mDragAreaXOffset, this.mRenderableObject.getXform().getYPos() + this.mDragAreaYOffset);
        var mX = this.mDragArea.getXform().getXPos();
        var mY = this.mDragArea.getXform().getYPos();
        var mWidth = this.mDragArea.getXform().getWidth();
        var mHeight = this.mDragArea.getXform().getHeight();

        var dragArea = new BoundingBox([mX, mY + (this.mInitXform.getHeight() / 2)], this.mInitXform.getWidth() - 2, mHeight);


        if (gEngine.Input.isButtonPressed(0)) {
            // if the mouse was not already down
            // (i.e. down and moved into the drag area)
            if (!this.wasDown) {
                this.wasDown = true;

                // if the mouse is in the drag area
                // and not down before
                if (dragArea.containsPoint(this.mMouseX, this.mMouseY)) {

                    // now we are dragging and can move
                    this.dragging = true;

                    // initial offset between renderable position and mouse
                    this.initMouseOffsetX = this.mRenderableObject.getXform().getXPos() - this.mMouseX;
                    this.initMouseOffsetY = this.mRenderableObject.getXform().getYPos() - this.mMouseY;
                }

            }
        } else {
            // if mouse was not pressed and down 
            if (this.wasDown) {
                this.wasDown = false;
                this.dragging = false;
            }
        }

        if (this.dragging) {
            // move renderable to mouse position + init offset
            // then move border to renderable position + drag area offset
            this.mRenderableObject.getXform().setPosition(this.mMouseX + this.initMouseOffsetX, this.mMouseY + this.initMouseOffsetY);
            this.mDragArea.getXform().setPosition(this.mRenderableObject.getXform().getXPos() + this.mDragAreaXOffset,
                    this.mRenderableObject.getXform().getYPos() + this.mDragAreaYOffset
                    );

        }
    }
    
    //TEST FUNCTIONS
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.F)) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() - 0.2, this.mRenderableObject.getXform().getHeight() - 0.2);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.G)) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() + 0.2, this.mRenderableObject.getXform().getHeight() + 0.2);
    }
    
    //Update renderable to camera position and size
    //Update position
    this.mRenderableObject.getXform().setPosition(this.mRenderableObject.getXform().getXPos() + (cam.getWCCenter()[0] - this.mLastCamX),
            this.mRenderableObject.getXform().getYPos() + (cam.getWCCenter()[1] - this.mLastCamY));
    
    //Update size to world camera (INCOMPLETE FEATURE)
    /*if (cam.getWCWidth != this.mLastCamWidth) {
     if (cam.getWCHeight != this.mLastCamHeight) {
     this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() + (cam.getWCWidth() - this.mLastCamWidth) / 2,
     this.mRenderableObject.getXform().getHeight() + (cam.getWCHeight() - this.mLastCamHeight) / 2);
     } else {
     this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth() + (cam.getWCWidth() - this.mLastCamWidth) / 2,
     this.mRenderableObject.getXform().getHeight());
     }
     ;
     } else if (cam.getWCHeight != this.mLastCamHeight) {
     this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getWidth(),
     this.mRenderableObject.getXform().getHeight() + (cam.getWCHeight()-this.mLastCamHeight)/2);
     };*/
    
    if (this.mRenderableObject.getXform().getWidth() < 0) {
        this.mRenderableObject.getXform().setSize(0, this.mRenderableObject.getXform().getHeight());
    }
    ;
    if (this.mRenderableObject.getXform().getHeight() < 0) {
        this.mRenderableObject.getXform().setSize(this.mRenderableObject.getXform().getHeight(), 0);
    }
    ;
    this.mLastCamX = cam.getWCCenter()[0];
    this.mLastCamY = cam.getWCCenter()[1];
    this.mLastCamWidth = cam.getWCWidth();
    this.mLastCamHeight = cam.getWCHeight();
    //Set camera dimensions to renderable dimensions - offsets
    var width = (this.mRenderableObject.getXform().getWidth() -
            (this.mOffsetRight * this.mRenderableObject.getXform().getWidth() + this.mOffsetLeft * this.mRenderableObject.getXform().getWidth())) * (cam.getViewport()[2] / cam.getWCWidth());
    var height = (this.mRenderableObject.getXform().getHeight() -
            (this.mOffsetTop * this.mRenderableObject.getXform().getHeight() + this.mOffsetBottom * this.mRenderableObject.getXform().getHeight())) * (cam.getViewport()[3] / cam.getWCHeight());
    if (width < 0) {
        width = 0
    };
    if (height < 0) {
        height = 0
    };
    var x = ((this.mRenderableObject.getXform().getXPos()) - (this.mRenderableObject.getXform().getWidth() / 2) -
            (cam.getWCCenter()[0] - cam.getWCWidth() / 2) + this.mOffsetLeft * this.mRenderableObject.getXform().getWidth()) * (cam.getViewport()[2] / cam.getWCWidth());
    var y = ((this.mRenderableObject.getXform().getYPos()) - (this.mRenderableObject.getXform().getHeight() / 2) -
            (cam.getWCCenter()[1] - cam.getWCHeight() / 2) + this.mOffsetBottom * this.mRenderableObject.getXform().getHeight()) * (cam.getViewport()[3] / cam.getWCHeight());
    this.mCamera.setViewport([x, y, width, height]);
    
    if (this.mIsResize)
    {
        this.mResizeable.setMousePosition(this.mMouseX, this.mMouseY);
        this.mResizeable.update();
    }
}
;
