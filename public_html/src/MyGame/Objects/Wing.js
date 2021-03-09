

function Wing(renderableObj, x, y) {
    this.mSpawnX = x;
    this.mSpawnY = y;
    this.mRenderComponent = renderableObj; //7.5x7.5
    this.mWingState = new WingState(this.mRenderComponent.getXform().getXPos(), this.mRenderComponent.getXform().getYPos());

    this.mBorder = new Box(10, 8, this.mSpawnX, this.mSpawnY);

}
gEngine.Core.inheritPrototype(Wing, GameObject);

Wing.prototype.initialize = function () {
    this.mRenderComponent.getXform().setSize(10, 8);
    this.mRenderComponent.getXform().setPosition(this.mSpawnX, this.mSpawnY);
    this.mWingState.configInterpolation(0.05, 120);

};

Wing.prototype.update = function () {
    this.mRenderComponent.updateAnimation();
    this.mWingState.updateWingState();
    this.mBorder.setBoxCenter(this.mRenderComponent.getXform().getXPos(), this.mRenderComponent.getXform().getYPos());
    this.mBorder.update();

};

Wing.prototype.draw = function (camera) {
    this.mRenderComponent.draw(camera);
    this.mBorder.draw(camera);
};

Wing.prototype.setXPos = function (x) {
    this.mWingState.setX(x);
};

Wing.prototype.setYPos = function (y) {
    this.mWingState.setY(y);
};

Wing.prototype.getX = function () {
    return this.mWingState.getX();
};

Wing.prototype.getY = function () {
    return this.mWingState.getY();
};

Wing.prototype.disableBox = function () {
    this.mBorder.disable();
};
Wing.prototype.enableBox = function () {
    this.mBorder.enable();
};

Wing.prototype.hit = function () {
    var c = this.mRenderComponent.getColor()[3];

    this.mRenderComponent.setColor([1, 1, 1, c + 0.2]);
};


