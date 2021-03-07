/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Draggable(renderableObject) {
    this.mRenderableObject = renderableObject;
    this.mDragAreaXOffset = null;
    this.mDragAreaYOffset = null;
    this.mDragAreaWidth = null;
    this.mDragAreaHeight = null;

    this.mMouseX = null;
    this.mMouseY = null;

    this.wasDown = false;
    this.dragging = false;
    //this.wasUp = false;

    this.mBorder = new Box(0, 0, 0, 0);
    this.mBorderState = true;
}
;

Draggable.prototype.initialize = function () {

};

Draggable.prototype.update = function () {
    this.mBorder.update();

    //console.log("x ", this.mBorder.getXPos(), " y ", this.mBorder.getYPos());

    var dragArea = this.mBorder.getBBox();
    if (gEngine.Input.isButtonPressed(0)) {
        if (!this.wasDown) {
            this.wasDown = true;
            if (dragArea.containsPoint(this.mMouseX, this.mMouseY)) {
                this.dragging = true;
            }

        }
    } else {
        if (this.wasDown) {
            this.wasDown = false;
            this.dragging = false;
        }
    }

    if (this.dragging) {
        // get mouse offset from renderable center
        var mouseXOffset = this.mMouseX - this.mRenderableObject.getXform().getXPos();
        var mouseYOffset = this.mMouseY - this.mRenderableObject.getXform().getYPos();

        console.log("x ", mouseXOffset, " y ", mouseYOffset);

        this.mRenderableObject.getXform().setPosition(this.mMouseX + mouseXOffset, this.mMouseY + mouseYOffset);
        this.mBorder.setBoxCenter(this.mMouseX + this.mDragAreaXOffset + mouseXOffset, this.mMouseY + this.mDragAreaYOffset + mouseYOffset);
    }

//    if (gEngine.Input.isMouseDown()) {
//
//    }
//    if (!gEngine.Input.isMouseDown()) {
//        console.log("down");
//        if (dragArea.containsPoint(this.mMouseX, this.mMouseY)) {
//            console.log("in bound");
//        }
//        if (gEngine.Input.isButtonPressed(0)) {
//            console.log("mouse press");
//        }
//    }


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

