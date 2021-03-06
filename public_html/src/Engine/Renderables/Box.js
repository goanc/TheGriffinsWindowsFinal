/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";

function Box(width, height, x, y) {
    this.mWidth = width;
    this.mHeight = height;
    this.mX = x;
    this.mY = y;

    this.mFlag = true;

    this.mTop = new LineRenderable(
            this.mX - this.mWidth / 2,
            this.mY + this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
    this.mBottom = new LineRenderable(
            this.mX - this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY - this.mHeight / 2
            );
    this.mLeft = new LineRenderable(
            this.mX - this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX - this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
    this.mRight = new LineRenderable(
            this.mX + this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
}
;

Box.prototype.update = function () {
    this.mTop.setVertices(
            this.mX - this.mWidth / 2,
            this.mY + this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
    this.mBottom.setVertices(
            this.mX - this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY - this.mHeight / 2
            );
    this.mLeft.setVertices(
            this.mX - this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX - this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
    this.mRight.setVertices(
            this.mX + this.mWidth / 2,
            this.mY - this.mHeight / 2,
            this.mX + this.mWidth / 2,
            this.mY + this.mHeight / 2
            );
};

Box.prototype.draw = function (camera) {
    if (this.mFlag) {
        this.mTop.draw(camera);
        this.mBottom.draw(camera);
        this.mLeft.draw(camera);
        this.mRight.draw(camera);
    }
};

Box.prototype.getBBox = function () {
    var b = new BoundingBox([this.mX, this.mY], this.mWidth, this.mHeight);
    return b;
};

Box.prototype.setWidth = function (width) {
    this.mWidth = width;
};

Box.prototype.setHeight = function (height) {
    this.mHeight = height;
};

Box.prototype.setBoxCenter = function (x, y) {
    this.mX = x;
    this.mY = y;
};
Box.prototype.incX = function (delta) {
    this.mX += delta;
};
Box.prototype.incY = function (delta) {
    this.mY += delta;
};

Box.prototype.enable = function () {
    this.mFlag = true;
};
Box.prototype.disable = function () {
    this.mFlag = false;
};

