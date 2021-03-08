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
    this.mDrag = drag; 
    this.mResize = resize;
    this.mVisible = true;
}

gEngine.Core.inheritPrototype(Window, GameObject);

Window.prototype.initialize = function() {
    if (this.mDrag) {
        
    };
    if (this.mResize) {
        
    };
}

Window.prototype.setDraggable = function(bool) {
    this.mDrag = bool;
    if (this.mDrag) {
        
    };
}

Window.prototype.setResizeable = function(bool) {
    this.mResize = bool;
    if (this.mResize) {
        
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
}