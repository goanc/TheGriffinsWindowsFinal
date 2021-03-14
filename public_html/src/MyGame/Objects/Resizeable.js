/* Resizeable.js
 * Author: The Griffins
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
    
    this.resizingBottom = false;
    this.resizingTop = false;
    this.resizingRight = false;
    this.resizingLeft = false;

    this.mBorderBottom = new Box(0, 0, 0, 0);
    this.mBorderTop = new Box(0, 0, 0, 0);
    this.mBorderRight = new Box(0, 0, 0, 0);
    this.mBorderLeft = new Box(0, 0, 0, 0);
    this.mBorderState = true;

    this.mCamera = camera;
};

Resizeable.prototype.initialize = function () 
{
    this.mBorderBottom.setBoxCenter(this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos() - (this.mRenderableObject.getXform().getHeight() / 2) + 0.5);
    this.mBorderBottom.setWidth(this.mRenderableObject.getXform().getWidth());
    this.mBorderBottom.setHeight(1);
    
    this.mBorderTop.setBoxCenter(this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos() + (this.mRenderableObject.getXform().getHeight() / 2) - 0.5);
    this.mBorderTop.setWidth(this.mRenderableObject.getXform().getWidth());
    this.mBorderTop.setHeight(1);
    
    this.mBorderRight.setBoxCenter(this.mRenderableObject.getXform().getXPos() + (this.mRenderableObject.getXform().getWidth() / 2) - 0.5, this.mRenderableObject.getXform().getYPos());
    this.mBorderRight.setWidth(1);
    this.mBorderRight.setHeight(this.mRenderableObject.getXform().getHeight());
    
    this.mBorderLeft.setBoxCenter(this.mRenderableObject.getXform().getXPos() - (this.mRenderableObject.getXform().getWidth() / 2) + 0.5, this.mRenderableObject.getXform().getYPos());
    this.mBorderLeft.setWidth(1);
    this.mBorderLeft.setHeight(this.mRenderableObject.getXform().getHeight());
};

Resizeable.prototype.update = function () 
{
    this.mBorderBottom.update();
    this.mBorderTop.update();
    this.mBorderRight.update();
    this.mBorderLeft.update();
    
    var dragAreaBottom = this.mBorderBottom.getBBox();
    var dragAreaTop = this.mBorderTop.getBBox();
    var dragAreaRight = this.mBorderRight.getBBox();
    var dragAreaLeft = this.mBorderLeft.getBBox();


    if (gEngine.Input.isButtonPressed(0)) 
    {
        if (!this.wasDown) 
        {
            this.wasDown = true;

            if (dragAreaBottom.containsPoint(this.mMouseX, this.mMouseY)) 
            {
                this.resizingBottom = true;

                this.initMousePosX = this.mMouseX;
                this.initMousePosY = this.mMouseY;
            }
            if (dragAreaTop.containsPoint(this.mMouseX, this.mMouseY)) 
            {
                this.resizingTop = true;

                this.initMousePosX = this.mMouseX;
                this.initMousePosY = this.mMouseY;
            }
            if (dragAreaRight.containsPoint(this.mMouseX, this.mMouseY)) 
            {
                this.resizingRight = true;

                this.initMousePosX = this.mMouseX;
                this.initMousePosY = this.mMouseY;
            }
            if (dragAreaLeft.containsPoint(this.mMouseX, this.mMouseY)) 
            {
                this.resizingLeft = true;

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
            this.resizingBottom = false;
            this.resizingTop = false;
            this.resizingRight = false;
            this.resizingLeft = false;
        }
    }
    if (this.resizingBottom === true)
    {
        this.mRenderableObject.getXform().incHeightBy(this.initMousePosY - this.mMouseY);
        this.mRenderableObject.getXform().incYPosBy((this.mMouseY - this.initMousePosY) / 2);     
    }
    if (this.resizingTop === true)
    {
        this.mRenderableObject.getXform().incHeightBy(this.mMouseY - this.initMousePosY);
        this.mRenderableObject.getXform().incYPosBy((this.mMouseY - this.initMousePosY) / 2);  
    }
    if (this.resizingRight === true)
    {
        this.mRenderableObject.getXform().incWidthBy(this.mMouseX - this.initMousePosX);
        this.mRenderableObject.getXform().incXPosBy((this.mMouseX - this.initMousePosX) / 2);   
    }
    if (this.resizingLeft === true)
    {
        this.mRenderableObject.getXform().incWidthBy(this.initMousePosX - this.mMouseX);
        this.mRenderableObject.getXform().incXPosBy((this.mMouseX - this.initMousePosX) / 2); 
    }
    
    if (this.resizingBottom || this.resizingTop || this.resizingRight || this.resizingLeft)
    {
        this.initMousePosX = this.mMouseX;
        this.initMousePosY = this.mMouseY;
        
        this.mBorderBottom.setBoxCenter(this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos() - (this.mRenderableObject.getXform().getHeight() / 2) + 0.5);
        this.mBorderBottom.setWidth(this.mRenderableObject.getXform().getWidth());

        this.mBorderTop.setBoxCenter(this.mRenderableObject.getXform().getXPos(), this.mRenderableObject.getXform().getYPos() + (this.mRenderableObject.getXform().getHeight() / 2) - 0.5);
        this.mBorderTop.setWidth(this.mRenderableObject.getXform().getWidth());

        this.mBorderRight.setBoxCenter(this.mRenderableObject.getXform().getXPos() + (this.mRenderableObject.getXform().getWidth() / 2) - 0.5, this.mRenderableObject.getXform().getYPos());
        this.mBorderRight.setHeight(this.mRenderableObject.getXform().getHeight());

        this.mBorderLeft.setBoxCenter(this.mRenderableObject.getXform().getXPos() - (this.mRenderableObject.getXform().getWidth() / 2) + 0.5, this.mRenderableObject.getXform().getYPos());
        this.mBorderLeft.setHeight(this.mRenderableObject.getXform().getHeight());
    }
};

Resizeable.prototype.draw = function (camera) 
{
    this.mRenderableObject.draw(camera);
    if (this.mBorderState) 
    {
        this.mBorderBottom.draw(camera);
        this.mBorderTop.draw(camera);
        this.mBorderRight.draw(camera);
        this.mBorderLeft.draw(camera);
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