/* Class: WindowManaer.js
 * Author: The Griffins
 * 
 * An object that handles the layering of all window objects
 */

function WindowManager() {
    this.mList = [];
}
gEngine.Core.inheritPrototype(WindowManager, GameObject);

WindowManager.prototype.initialize = function() {
    
};

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
}

WindowManager.prototype.draw = function(camera, objects) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].draw(camera, objects);
        
    }
};

WindowManager.prototype.update = function(cam) {
    for (var i = this.mList.length - 1; i >= 0; i--) {
        this.mList[i].update(cam);
    }
}