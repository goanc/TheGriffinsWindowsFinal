/* Class: Window.js
 * Author: The Griffins
 * 
 * A GameObject that ties a renderable and camera together to form a window object that can be optionally dragged and resized
 * 
 * FUNCTIONS:
 * Window(renderableObject, windowCam, xoffsetleft, xoffsetright, yoffsetbottom, yoffsettop, drag, resize):
 *      Defines a renderable with an attached camera, along with the camera's numerical left, right, bottom, and top offsets in relation to the renderable.
 *      Drag and resize are enabled if set to true, otherwise are disabled.
 * initialize(): Initializes the draggable and resizable versions of renderable if enabled.
 * setISDrag(bool): Defines if the window is draggable or not, depending on whether the input is true or false.
 * setISResize(bool): Defines if the window is resizeable or not, depending on whether the input is true or false.
 * getCamera(): Returns the window's camera.
 * draw(cam, objects): Draws the window on the inputted camera, and then draws the objects within the window on the inputted list of objects.
 * update(cam): Draws the window object. Its dimensions are specified by the inputted world camera.
 */

function Window(renderableObject, windowCam, xoffsetleft, xoffsetright, yoffsetbottom, yoffsettop, drag, resize) {
    this.mRenderableObject = renderableObject;
    this.mInitXform = this.mRenderableObject.getXform();
    this.mCamera = windowCam;
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

Window.prototype.draw = function(cam, objects) {
    if (this.mVisible) {
        this.mRenderableObject.draw(cam);
        this.mCamera.setupViewProjection();
        for (var i = 0; i < objects.length; i++) {
            objects[i].draw(this.mCamera);
        }
    }
};

Window.prototype.update = function (cam) {
    //Set offsets with adherence to original offset
    this.mOffsetLeft = this.mInitOffsetLeft * (1+(this.mInitXform.getWidth() - this.mRenderableObject.getXform().getWidth()));
    this.mOffsetRight = this.mInitOffsetRight * (1+(this.mInitXform.getWidth() - this.mRenderableObject.getXform().getWidth()));
    this.mOffsetBottom = this.mInitOffsetBottom * (1+(this.mInitXform.getHeight() - this.mRenderableObject.getXform().getHeight()));
    this.mOffsetTop = this.mInitOffsetTop * (1+(this.mInitXform.getHeight() - this.mRenderableObject.getXform().getHeight()));
    //Set camera dimensions to renderable dimensions - offsets
    var width = (this.mRenderableObject.getXform().getWidth()-(this.mOffsetRight+this.mOffsetLeft))*(cam.getViewport()[2]/cam.getWCWidth());
    var height = (this.mRenderableObject.getXform().getHeight()-(this.mOffsetTop+this.mOffsetBottom))*(cam.getViewport()[3]/cam.getWCHeight());
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
};
