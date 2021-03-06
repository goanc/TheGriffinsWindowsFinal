/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Draggable(renderableObject) 
{
    this.mRenderableObject = renderableObject;
    this.bottomRight = [];
    this.bottomLeft = [];
    this.topRight = [];
    this.topLeft = [];
    this.resizeAreaSize = null;
};

Draggable.prototype.setup = function (bRX, bRY, bLX, bLY, tRX, tRY, tLX, tLY, size) 
{
    this.bottomRight.push(bRX);
    this.bottomRight.push(bRY);
    
    this.bottomLeft.push(bLX);
    this.bottomLeft.push(bLY);
    
    this.topRight.push(tRX);
    this.topRight.push(tRY);
    
    this.topLeft.push(tLX);
    this.topLeft.push(tLY);
    
    this.resizeAreaSize = size;
};

Draggable.prototype.initialize = function () 
{

};

Draggable.prototype.update = function () 
{
    
};

Draggable.prototype.draw = function (camera) 
{
    this.mRenderableObject.draw(camera);
};