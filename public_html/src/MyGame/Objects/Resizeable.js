/* Class: Resizeable.js
 * Author: The Griffins
 * 
 * A GameObject that allows a renderable to be resized by dragging the edges with the mouse
 * 
 * FUNCTIONS:
 * Resizeable(renderableObject): Defines a Resizeable, the renderableObject is the object Resizeable will be applied to. Borders of resize area are on by default.
 * initialize(): Initializes the Resizable.
 * draw(camera): Draws the borders to the camera
 * update(): Detects clicks and resizes renderable.
 * setMousePosition(x, y): Used to pass the mouse position to this object.
 * enableResizeAreaBorder(): Shows resize border
 * disableResizeAreaBorder(): Hides resize border
 */
"use strict";

function Resizeable(renderableObject) 
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
        this.mRenderableObject.getXform().incHeightBy((this.initMousePosY - this.mMouseY) / 1);
        this.mRenderableObject.getXform().incYPosBy((this.mMouseY - this.initMousePosY) / 2);     
    }
    if (this.resizingTop === true)
    {
        this.mRenderableObject.getXform().incHeightBy((this.mMouseY - this.initMousePosY) / 1);
        this.mRenderableObject.getXform().incYPosBy((this.mMouseY - this.initMousePosY) / 2);  
    }
    if (this.resizingRight === true)
    {
        this.mRenderableObject.getXform().incWidthBy((this.mMouseX - this.initMousePosX) / 1);
        this.mRenderableObject.getXform().incXPosBy((this.mMouseX - this.initMousePosX) / 2);   
    }
    if (this.resizingLeft === true)
    {
        this.mRenderableObject.getXform().incWidthBy((this.initMousePosX - this.mMouseX) / 1);
        this.mRenderableObject.getXform().incXPosBy((this.mMouseX - this.initMousePosX) / 2); 
    }
    
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
};

Resizeable.prototype.draw = function (camera) 
{
    //this.mRenderableObject.draw(camera);
    if (this.mBorderState) 
    {
        this.mBorderBottom.draw(camera);
        this.mBorderTop.draw(camera);
        this.mBorderRight.draw(camera);
        this.mBorderLeft.draw(camera);
    }
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