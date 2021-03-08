/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Draggable(renderableObject, camera) {
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

    this.mCamera = camera;
}
;

Draggable.prototype.initialize = function () {

};

Draggable.prototype.update = function () {
    this.mBorder.update();

    var mouseX = this.mMouseX;
    var mouseY = this.mMouseY;

    var mouseWindowDifX = this.mRenderableObject.getXform().getXPos() - this.mMouseX;
    var mouseWindowDifY = this.mRenderableObject.getXform().getYPos() - this.mMouseY;

    var lastMouseX = 0;
    var lastMouseY = 0;


    //console.log("wasDown: " + this.wasDown + " dragging: " + this.dragging);


    var dragArea = this.mBorder.getBBox();
    if (gEngine.Input.isButtonPressed(0)) {
        if (!this.wasDown) {
            this.wasDown = true;
            if (dragArea.containsPoint(this.mMouseX, this.mMouseY)) {
                this.dragging = true;
                lastMouseX = this.mMouseX;
                lastMouseY = this.mMouseY;
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
        var mouseXOffset = this.mRenderableObject.getXform().getXPos() - this.mMouseX;
        var mouseYOffset = this.mRenderableObject.getXform().getYPos() - this.mMouseY;

        //console.log("x ", mouseXOffset, " y ", mouseYOffset);

        this.mRenderableObject.getXform().setPosition(this.mMouseX + mouseXOffset, this.mMouseY);
        this.mBorder.setBoxCenter(this.mMouseX + this.mDragAreaXOffset, this.mMouseY + this.mDragAreaYOffset);

        //onsole.log(this.mCamera.mouseWCX() - mouseX);
        //console.log(this.mCamera.mouseWCY() - mouseY);
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

