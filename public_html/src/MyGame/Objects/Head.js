/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Head(renderableObj, x, y) {

    this.mRenderComponent = renderableObj; //7.5x7.5
    this.mDeltaX = 0;
    this.mDeltaY = 0;
    this.mSpawnX = x;
    this.mSpawnY = y;
    this.mTopLine = null;
    this.mBottomLine = null;
    this.mLeftLine = null;
    this.mRightLine = null;
    this.mBorder = null;


}
gEngine.Core.inheritPrototype(Head, GameObject);

Head.prototype.initialize = function () {
    this.mRenderComponent.getXform().setSize(7.5, 7.5);
    this.mRenderComponent.getXform().setPosition(this.mSpawnX, this.mSpawnY);
    this.mDeltaX = getRandomFloat(-15, 15);
    this.mDeltaY = getRandomFloat(-15, 15);

    this.mBorder = new Box(7.5, 7.5, this.mSpawnX, this.mSpawnY);

    this.mDeltaX = (this.mDeltaX * .001) * 16.6666666666;
    this.mDeltaY = (this.mDeltaY * .001) * 16.6666666666;

};

Head.prototype.getDeltaX = function () {
    return this.mDeltaX;
};
Head.prototype.getDeltaY = function () {
    return this.mDeltaY;
};

Head.prototype.disableBox = function () {
    this.mBorder.disable();
};
Head.prototype.enableBox = function () {
    this.mBorder.enable();
};

Head.prototype.bounceUp = function () {
    this.mDeltaY = Math.abs(this.mDeltaY);
};
Head.prototype.bounceDown = function () {
    this.mDeltaY = -Math.abs(this.mDeltaY);
};
Head.prototype.bounceRight = function () {
    this.mDeltaX = Math.abs(this.mDeltaX);
};
Head.prototype.bounceLeft = function () {
    this.mDeltaX = -Math.abs(this.mDeltaX);

};

Head.prototype.update = function () {
    this.mRenderComponent.getXform().incXPosBy(this.mDeltaX);
    this.mRenderComponent.getXform().incYPosBy(this.mDeltaY);
    this.mBorder.setBoxCenter(this.mRenderComponent.getXform().getXPos(), this.mRenderComponent.getXform().getYPos());
    this.mBorder.update();

};

Head.prototype.draw = function (camera) {
    this.mRenderComponent.draw(camera);
    this.mBorder.draw(camera);
};

Head.prototype.knockBack = function () {
    this.mRenderComponent.getXform().incXPosBy(5);
    this.mBorder.incX(5);
    this.mBorder.update();
    ;
};

Head.prototype.stop = function () {
    this.mDeltaX = 0;
    this.mDeltaY = 0;
};


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
;

// Random float in range helper function
function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}
;

