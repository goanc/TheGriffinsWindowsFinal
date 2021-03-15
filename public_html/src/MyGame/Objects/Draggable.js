/* Class: Draggable.js
 * Author: The Griffins
 * 
 * A GameObject that allows a renderable to be resized by dragging the edges with the mouse
 * 
 * FUNCTIONS:
 * Draggable(renderableObject): A class that allows a renderable to be moved by clicking and dragging the left mosue button
 * draw(camera): Draws the renderable and the borders to the camera, if enabled.
 * update(): Detects clicks in the drag area and changes renderable transform accordingly.
 * setMousePosition(x, y): Used to pass the mouse position to this object.
 * enableResizeAreaBorder(): Shows drag area border
 * disableResizeAreaBorder(): Hides drag area border
 */
"use strict";

function Draggable(renderableObject, camera) {
    this.mRenderableObject = renderableObject;
    this.mDragAreaXOffset = null;
    this.mDragAreaYOffset = null;
    this.mDragAreaWidth = null;
    this.mDragAreaHeight = null;

    this.initMouseOffsetX = 0;
    this.initMouseOffsetY = 0;

    this.mMouseX = null;
    this.mMouseY = null;

    this.wasDown = false;
    this.dragging = false;

    this.mBorder = new Box(0, 0, 0, 0);
    this.mBorderState = true;

    this.mCamera = camera;
}
;

Draggable.prototype.initialize = function () {

};

Draggable.prototype.update = function () {
    this.mBorder.update();
    var dragArea = this.mBorder.getBBox();


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
        this.mBorder.setBoxCenter(this.mRenderableObject.getXform().getXPos() + this.mDragAreaXOffset,
                this.mRenderableObject.getXform().getYPos() + this.mDragAreaYOffset
                );

    }
};

Draggable.prototype.draw = function (camera) {
    this.mRenderableObject.draw(camera);
    if (this.mBorderState) {
        this.mBorder.draw(camera);
    }
};

Draggable.prototype.setMousePosition = function (x, y) {
    this.mMouseX = x;
    this.mMouseY = y;

};

// Takes an offset from the renderable position
Draggable.prototype.setDragArea = function (xOffset, yOffset, width, height) {
    this.mDragAreaXOffset = xOffset;
    this.mDragAreaYOffset = yOffset;
    this.mDragAreaWidth = width;
    this.mDragAreaHeight = height;

    this.mBorder.setBoxCenter(this.mRenderableObject.getXform().getXPos() + xOffset, this.mRenderableObject.getXform().getYPos() + yOffset);
    this.mBorder.setWidth(width);
    this.mBorder.setHeight(height);
};

Draggable.prototype.enableDragAreaBorder = function () {
    this.mBorderState = true;
};

Draggable.prototype.diableDragAreaBorder = function () {
    this.mBorderState = false;
};

Draggable.prototype.getXform = function () {
    return this.mRenderableObject.getXform();
};

