/* Class: WindowManager.js
 * Author: The Griffins
 * 
 * An object that handles the layering of all window objects
 * 
 * FUNCTIONS:
 * WindowManager(): initializes the empty list of windows.
 * add(window, front): adds a window to the front of the list if 'front' is true, otherwise its added to the back.
 * remove(window): removes the inputted window from the list.
 * pushToFront(window): pushes the inputted window to the fron to list, layering it on top of other windows in the list.
 * draw(cam, objects): draws all windows in the inputted camera, and all windows display the inputted list of objects.
 * update(cam): updates all windows according to the specs of the inputted camera.
 */

function WindowManager() {
    this.mList = [];
}
gEngine.Core.inheritPrototype(WindowManager, GameObject);

WindowManager.prototype.add = function(window, front) {
    if (front) {
        this.mList.unshift(window);
    }
    else {
        this.mList.push(window);
    }
};

WindowManager.prototype.remove = function(window) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        if (window === this.mList[i]) {
            this.mList.splice(i, 1);
            i = -1;
        }
    }
};

WindowManager.prototype.pushToFront = function (window) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        if (window === this.mList[i]) {
            this.mList.splice(i, 1);
            this.mList.unshift(window);
            i = -1;
        }
    }
};

WindowManager.prototype.draw = function(cam, objects) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].draw(cam, objects);
        
    }
};

WindowManager.prototype.update = function(cam) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].update(cam);
    }
}