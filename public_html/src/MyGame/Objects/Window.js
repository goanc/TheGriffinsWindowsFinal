/* Class: Window.js
 * Author: The Griffins
 * 
 * An object that is directly tied to its own camera and viewport
 */

function Window(renderableObject, windowCam, xoffset, yoffset, drag, resize) {
    this.mRenderableObject = renderableObject;
    this.mCamera = windowCam;
    this.mXOffset = xoffset;
    this.mYOffset = yoffset;
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
}

Window.prototype.setIsResize = function(bool) {
    this.mIsResize = bool;
    if (this.mIsResize) {
        this.mResizeable = new Resizeable(this.mRenderableObject);
    }
    else {
        this.mResizeable = null;
    };
}

Window.prototype.draw = function(camera, objects) {
    if (this.mVisible) {
        this.mRenderableObject.draw(camera);
        this.mCamera.setupViewProjection();
        for (var i = 0; i < objects.length; i++) {
            objects[i].draw(this.mCamera);
        }
    }
}

Window.prototype.getCamera = function() {
    return this.mCamera;
}

Window.prototype.update = function (cam) {
    var width = (this.mRenderableObject.getXform().getWidth()-this.mXOffset)*(cam.getViewport()[2]/cam.getWCWidth());
    var height = (this.mRenderableObject.getXform().getHeight()-this.mYOffset)*(cam.getViewport()[3]/cam.getWCHeight());
    var x = (this.mRenderableObject.getXform().getXPos()+this.mXOffset/2)*(cam.getViewport()[2]/cam.getWCWidth())+
                ((this.mRenderableObject.getXform().getWidth())*(cam.getViewport()[2]/cam.getWCWidth()))/2;
    var y = (this.mRenderableObject.getXform().getYPos()+this.mYOffset/2)*(cam.getViewport()[3]/cam.getWCHeight());
    this.mCamera.setViewport([x, y, width, height]);
    if (this.mIsDrag) {
        this.mDraggable.update();
    }
    if (this.mIsResize) {
        this.mResizeable.update();
    };
};
