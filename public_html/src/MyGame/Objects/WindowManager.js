/* Class: WindowManager.js
 * Author: The Griffins
 * 
 * An object that handles the layering of all window objects
 * 
 * FUNCTIONS:
 * WindowManager(): Initializes the empty array of windows.
 * initialize(): Initializes the window key to 0.
 * add(window, front): Adds a window to the front of the list if 'front' is true, otherwise its added to the back.
 *      (window): The window to be added to the window list.
 *      (front): A boolean that, if set to true, will layer the new window on top of all existing windows. Otherwise will be pushed to the back layer.
 * remove(window): Removes the inputted window from the list.
 *      (window): The window to be removed fromt the window list.
 * pushToFront(window): Pushes the inputted window to the fron to list, layering it on top of other windows in the list.
 *      (window): The window to be pushed in front of all other windows.
 * draw(cam, objects): Draws all windows in the inputted camera, and all windows display the inputted list of objects.
 *      (cam): The world camera that all winddows will be drawn upon.
 *      (objects): An array of objects that the window cameras will draw.
 * update(cam): Updates all windows according to the specs of the inputted camera.
 *      (cam): The world camera that all the windows' dimensions will compare to.
 */
"use strict";

function WindowManager() {
    this.mList = [];
    this.mKey = null;
}
gEngine.Core.inheritPrototype(WindowManager, GameObject);

WindowManager.prototype.initialize = function () {
    this.mKey = 0;
}

WindowManager.prototype.add = function (window, front) {
    window.setKey(this.mKey);
    this.mKey++;
    if (front) {
        this.mList.unshift(window);
    } else {
        this.mList.push(window);
    }
};

WindowManager.prototype.remove = function (window) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        if (window.getKey() == this.mList[i].getKey()) {
            this.mList.splice(i, 1);
            i = -1;
        }
    }
};

WindowManager.prototype.pushToFront = function (window) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        if (window.getKey() == this.mList[i].getKey()) {
            this.mList.splice(i, 1);
            this.mList.unshift(window);
            i = -1;
        }
    }
};

WindowManager.prototype.draw = function (cam, objects) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].drawRenderable(cam);
    }
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].drawCamera(cam, objects);
    }
};

WindowManager.prototype.update = function (cam) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].update(cam);
        this.mList[i].setMousePosition(cam.mouseWCX(), cam.mouseWCY());
    }
}