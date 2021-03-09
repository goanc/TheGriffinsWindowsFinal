/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Patrol(x, y, boundFlag) {
    this.kSpriteSheet = "assets/SpriteSheet.png";

    this.mHeadSpeed = 0;
    this.mDeltaX = 0;
    this.mDeltaY = 0;
    this.mSpawnX = x;
    this.mSpawnY = y;

    this.mCanvasBoundingBox = new BoundingBox([30, 27.5], 200, 150);
    this.mBorder = new Box(1, 1, x, y);

    this.mBoundWidth = new Interpolate(1, 1, .5);
    this.mBoundHeight = new Interpolate(1, 1, .5);
    this.mHeadRenderable = null; //7.5x7.5
    this.mWingRenderable = null;
    this.mWingRenderable2 = null;
    this.mHead = null;
    this.mTopWing = null; //10x8
    this.mBottomWing = null;
    this.mBoundFlag = boundFlag;
    this.mObjectSet = new GameObjectSet();
    this.mCamera = null;
}
//gEngine.Core.inheritPrototype(Patrol, GameObject);

Patrol.prototype.initialize = function () {
    // head
    this.mHeadRenderable = new SpriteRenderable(this.kSpriteSheet);
    this.mHeadRenderable.setColor([1, 1, 1, 0]);
    this.mHeadRenderable.setElementPixelPositions(600, 700, 0, 180);
    this.mHead = new Head(this.mHeadRenderable, this.mSpawnX, this.mSpawnY);
    this.mHead.initialize();

    this.mObjectSet.addToSet(this.mBorder);
    this.mObjectSet.addToSet(this.mHead);

    // top wing
    this.mWingRenderable = new SpriteAnimateRenderable(this.kSpriteSheet);
    this.mWingRenderable.setColor([1, 1, 1, 0]);
    this.mWingRenderable.getXform().setPosition(this.mSpawnX, this.mSpawnY);
    this.mWingRenderable.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mWingRenderable.setAnimationSpeed(50);
    this.mWingRenderable.setSpriteSequence(512, 0, // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164, // widthxheight in pixels
            5, // number of elements in this sequence
            0);

    this.mWingRenderable2 = new SpriteAnimateRenderable(this.kSpriteSheet);
    this.mWingRenderable2.setColor([1, 1, 1, 0]);
    this.mWingRenderable2.getXform().setPosition(this.mSpawnX, this.mSpawnY);
    this.mWingRenderable2.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mWingRenderable2.setAnimationSpeed(50);
    this.mWingRenderable2.setSpriteSequence(512, 0, // first element pixel position: top-left 512 is top of image, 0 is left of image
            204, 164, // widthxheight in pixels
            5, // number of elements in this sequence
            0);

    this.mTopWing = new Wing(this.mWingRenderable, this.mSpawnX, this.mSpawnY);
    this.mBottomWing = new Wing(this.mWingRenderable2, this.mSpawnX, this.mSpawnY);
    this.mTopWing.initialize();
    this.mBottomWing.initialize();

    this.mObjectSet.addToSet(this.mTopWing);
    this.mObjectSet.addToSet(this.mBottomWing);

    if (!this.mBoundFlag) {
        this.disableBox();
    } else {
        this.enableBox();
    }



};

Patrol.prototype.update = function () {

    this.mHead.update();
    this.mTopWing.update();
    this.mBottomWing.update();
    this.mBorder.update();

    var bot = this.mBottomWing.getXform().getYPos() - this.mBottomWing.getXform().getHeight() / 2;
    var top = this.mTopWing.getXform().getYPos() + this.mBottomWing.getXform().getHeight() / 2;
    var left = this.mHead.getXform().getXPos() - this.mHead.getXform().getWidth() / 2;
    var right = this.mTopWing.getXform().getXPos() + this.mBottomWing.getXform().getWidth() / 2;

    var newWidth = right - left;
    var newHeight = (top - bot) * 1.5;

    var centerX = left + newWidth / 2;
    var centerY = bot + newHeight / 2;

    this.mBorder.setBoxCenter(centerX, centerY);
    this.mBorder.setWidth(newWidth);
    this.mBorder.setHeight(newHeight);

    // Setting final value in wingstate
    this.mTopWing.setXPos(this.mHead.getXform().getXPos() + 10);
    this.mTopWing.setYPos(this.mHead.getXform().getYPos() + 6);
    this.mBottomWing.setXPos(this.mHead.getXform().getXPos() + 10);
    this.mBottomWing.setYPos(this.mHead.getXform().getYPos() - 6);

    // Setting positions to to wingstate values
    this.mTopWing.getXform().setPosition(this.mTopWing.getX(), this.mTopWing.getY());
    this.mBottomWing.getXform().setPosition(this.mBottomWing.getX(), this.mBottomWing.getY());

    if (top > 102.5) {
        this.mHead.bounceDown();
    }
    if (bot < -47.5) {
        this.mHead.bounceUp();
    }
    if (left < -70) {
        this.mHead.bounceRight();
    }
    if (right > 130) {
        this.mHead.bounceLeft();
    }
};

Patrol.prototype.getBBox = function () {
    return this.mBorder.getBBox();
};

Patrol.prototype.getHeadBBox = function () {
    return this.mHead.getBBox();
};

Patrol.prototype.getHead = function () {
    return this.mHead;
};

Patrol.prototype.knockBack = function () {
    this.mHead.knockBack();
};

Patrol.prototype.disableBox = function () {
    this.mBorder.disable();
    this.mHead.disableBox();
    this.mTopWing.disableBox();
    this.mBottomWing.disableBox();
};
Patrol.prototype.enableBox = function () {
    this.mBorder.enable();
    this.mHead.enableBox();
    this.mTopWing.enableBox();
    this.mBottomWing.enableBox();
};

Patrol.prototype.draw = function (camera) {
    this.mObjectSet.draw(camera);
};

Patrol.prototype.getTopWing = function () {
    return this.mTopWing;

};
Patrol.prototype.getBottomWing = function () {
    return this.mBottomWing;
};
Patrol.prototype.stop = function () {
    return this.mHead.stop();
};