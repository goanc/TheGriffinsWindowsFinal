/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * File: CameraState.js
 * Defines the state of a camera to faciliate the manipulation of this state
 */

/*jslint node: true, vars: true, bitwise: true */
/*global gEngine, Interpolate, InterpolateVec2 */
/* find out more about jslint: http://www.jslint.com/help.html */
"use strict";

//
function WingState(x, y) {
    this.kCycles = 120;  // number of cycles to complete the transition
    this.kRate = 0.05;  // rate of change for each cycle
    this.mX = new Interpolate(x, this.kCycles, this.kRate);
    this.mY = new Interpolate(y, this.kCycles, this.kRate);
}

// <editor-fold desc="Public Methods">
WingState.prototype.getX = function () {
    return this.mX.getValue();
};
WingState.prototype.getY = function () {
    return this.mY.getValue();
};

WingState.prototype.setX = function (x) {
    this.mX.setFinalValue(x);
};
WingState.prototype.setY = function (y) {
    this.mY.setFinalValue(y);
};

WingState.prototype.updateWingState = function () {
    this.mX.updateInterpolation();
    this.mY.updateInterpolation();
};

WingState.prototype.configInterpolation = function (stiffness, duration) {
    this.mX.configInterpolation(stiffness, duration);
    this.mY.configInterpolation(stiffness, duration);
};
// </editor-fold>

