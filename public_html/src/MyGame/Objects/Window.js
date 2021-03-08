/* Class: Window.js
 * Author: The Griffins
 * 
 * An object that is directly tied to its own camera and viewport
 */

//Is created with a renderable to display the viewport upon, the camera, the offset of the viewport from the edge of the renderable,
//the width and height of the window, and the layer of the window in comparison to other windows
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
        
    };
    if (this.mIsResize) {
        
    };
}

Window.prototype.setDraggable = function(bool) {
    this.mIsDrag = bool;
    if (this.mIsDrag) {
        
    };
}

Window.prototype.setResizeable = function(bool) {
    this.mIsResize = bool;
    if (this.mIsResize) {
        
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
    this.mCamera.setViewport([this.getXform().getXpos(), this.getXform().getYpos(), this.getXform().getWidth(), this.getXform().getHeight()], this.mOffset);
    if (this.mIsDrag != null) {
        this.mDraggable.update();
    }
    if (this.mIsResize != null) {
        this.mResizeable.update();
    }
}