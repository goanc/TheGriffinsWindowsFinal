/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Draggable(renderableObject) {
    this.mRenderableObject = renderableObject;
    this.mDragAreaXPosition = null;
    this.mDragAreaYPosition = null;
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

    console.log("down ", this.wasDown, " dragging ", this.dragging);

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
        this.mRenderableObject.getXform().setPosition(this.mMouseX, this.mMouseY);
        this.mBorder.setBoxCenter(this.mMouseX, this.mMouseY);
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

Draggable.prototype.setDragArea = function (x, y, width, height) {
    this.mDragAreaXPosition = x;
    this.mDragAreaYPosition = y;
    this.mDragAreaWidth = width;
    this.mDragAreaHeight = height;

    this.mBorder.setBoxCenter(x, y);
    this.mBorder.setWidth(width);
    this.mBorder.setHeight(height);
};

Draggable.prototype.enableDragAreaBorder = function () {
    this.mBorderState = true;
};

Draggable.prototype.diableDragAreaBorder = function () {
    this.mBorderState = false;
};

