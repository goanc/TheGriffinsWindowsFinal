/* Class: Window.js
 * Author: The Griffins
 * 
 * An object that is directly tied to its own camera and viewport
 */

//Is created with a renderable to display the viewport upon, the camera, the offset of the viewport from the edge of the renderable,
//the width and height of the window, and the layer of the window in comparison to other windows
function Window(renderableObject, camera ,xPos, yPos, offset, width, height, layer) {
    this.mRenderableObject = renderableObject;
    this.mCamera = camera;
    this.getXform().setPosition(xPos, yPos);
    this.mOffset = offset;
    this.getXform().setSize(width, height);
    this.mLayer = layer;
    this.mDrag = false;
    this.mResize = false;
    this.mVisible = true;
}

gEngine.Core.inheritPrototype(Window, GameObject);

Window.prototype.initialize = function() {
    
}

Window.prototype.setDraggable = function(bool) {
    this.mDrag = bool;
}

Window.prototype.setResizeable = function(bool) {
    this.mDraw = bool;
}

Window.prototype.draw = function(camera) {
    if (this.mVisible) {
        this.mRenderableObject.draw(camera);
    }
}

Window.prototype.update = function () {
    
}