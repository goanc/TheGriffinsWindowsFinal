/* Class: Window.js
 * Author: The Griffins
 * 
 * An object that is directly tied to its own camera and viewport
 */

function Window(renderableObject, camera, offset, layer, drag, resize) {
    this.mRenderableObject = renderableObject;
    this.mCamera = camera;
    this.mOffset = offset;
    this.mLayer = layer;
    this.mIsDrag = drag; 
    this.mIsResize = resize;
    this.mVisible = true;
    this.mDraggable = null;
    this.mResizeable = null;
}

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

Window.prototype.draw = function(camera) {
    if (this.mVisible) {
        this.mRenderableObject.draw(camera);
    }
}

Window.prototype.getCamera = function() {
    return this.mCamera;
}

Window.prototype.update = function () {
    //Sets viewport to position and size of renderable
    this.mCamera.setViewport([this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos(), 
        this.mRenderableObject.getXform().getWidth(), this.mRenderableObject.getXform().getHeight()], this.mOffset);
    if (this.mIsDrag) {
        this.mDraggable.update();
    }
    if (this.mIsResize) {
        this.mResizeable.update();
    }
}