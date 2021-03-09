/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Resizeable(renderableObject, camera) 
{
    this.mRenderableObject = renderableObject;
    this.mResizeAreaXOffset = null;
    this.mResizeAreaYOffset = null;
    this.mResizeAreaWidth = null;
    this.mResizeAreaHeight = null;

    this.initMouseOffsetX = 0;
    this.initMouseOffsetY = 0;
    
    this.initMousePosX = 0;
    this.initMousePosY = 0;

    this.mMouseX = null;
    this.mMouseY = null;

    this.wasDown = false;
    this.resizing = false;

    this.mBorderBottom = new Box(0, 0, 0, 0);
    this.mBorderTop = new Box(0, 0, 0, 0);
    this.mBorderRight = new Box(0, 0, 0, 0);
    this.mBorderLeft = new Box(0, 0, 0, 0);
    this.mBorderState = true;

    this.mCamera = camera;
};

Resizeable.prototype.initialize = function () 
{
    this.mBorderBottom.setBoxCenter(this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos() - (this.mRenderableObject.getXform().getHeight() / 2) + 1);
    this.mBorderBottom.setWidth(this.mRenderableObject.getXform().getWidth());
    this.mBorderBottom.setHeight(1);
};

Resizeable.prototype.update = function () 
{
    this.mBorderBottom.update();
    var dragArea = this.mBorderBottom.getBBox();


    if (gEngine.Input.isButtonPressed(0)) 
    {
        if (!this.wasDown) 
        {
            this.wasDown = true;

            if (dragArea.containsPoint(this.mMouseX, this.mMouseY)) 
            {
                this.resizing = true;

                // initial offset between renderable position and mouse
                this.initMouseOffsetX = this.mRenderableObject.getXform().getXPos() - this.mMouseX;
                this.initMouseOffsetY = this.mRenderableObject.getXform().getYPos() - this.mMouseY;
                this.initMousePosX = this.mMouseX;
                this.initMousePosY = this.mMouseY;
            }
        }
    } 
    else 
    {
        if (this.wasDown) 
        {
            this.wasDown = false;
            this.resizing = false;
        }
    }
    
    if (this.resizing === true)
    {
        console.log((this.mRenderableObject.getXform().getHeight() / 2) + 1);
        this.mRenderableObject.getXform().incHeightBy(this.initMousePosY - this.mMouseY);
        this.mRenderableObject.getXform().incYPosBy((this.mMouseY - this.initMousePosY) / 2);
        this.initMousePosX = this.mMouseX;
        this.initMousePosY = this.mMouseY;
        
        this.mBorderBottom.setBoxCenter
        (
            this.mRenderableObject.getXform().getXPos(),
            this.mRenderableObject.getXform().getYPos() - (this.mRenderableObject.getXform().getHeight() / 2) + 1
        );
    }
};

Resizeable.prototype.draw = function (camera) 
{
    this.mRenderableObject.draw(camera);
    if (this.mBorderState) 
    {
        this.mBorderBottom.draw(camera);
    }
};

Resizeable.prototype.setResizeArea = function (xOffset, yOffset, width, height) 
{
//    this.mResizeAreaXOffset = xOffset;
//    this.mResizeAreaYOffset = yOffset;
//    this.mResizeAreaWidth = width;
//    this.mResizeAreaHeight = height;
//
//    this.mBorder.setBoxCenter(this.mRenderableObject.getXform().getXPos() + xOffset, this.mRenderableObject.getXform().getYPos() + yOffset);
//    this.mBorder.setWidth(width);
//    this.mBorder.setHeight(height);
};

Resizeable.prototype.setMousePosition = function (x, y) 
{
    this.mMouseX = x;
    this.mMouseY = y;
};

Resizeable.prototype.enableResizeAreaBorder = function () 
{
    this.mBorderState = true;
};

Resizeable.prototype.disableResizeAreaBorder = function () 
{
    this.mBorderState = false;
};