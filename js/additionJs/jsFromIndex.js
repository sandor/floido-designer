


var kitchensink = {};
var canvas = new fabric.Canvas('canvas', {
    backgroundColor: "#FFFFFF",
    selectionColor: "rgba(0, 108, 223, 0.05)",
    selectionBorderColor: "rgba(0, 108, 223, 0.3)",
    selectionDashArray: [2, 2],
    preserveObjectStacking: true
});
initAligningGuidelines(canvas);
initCenteringGuidelines(canvas);



// create grid and snap to grid


//canvas.on('object:moving', function(options) {
//  options.target.set({
//    left: Math.round(options.target.left / gridSize) * gridSize,
//    top: Math.round(options.target.top / gridSize) * gridSize
//  });
//});

// ------------------

/*
getting some test data
*/

canvas.on('object:scaling', onObjectModification);
canvas.on('object:moving', onObjectModification);
canvas.on('object:rotating', onObjectModification);
canvas.on('object:selected', onObjectModification);

function onObjectModification(e) {
    var activeObject = e.target;
    if (!activeObject) {
        return;
    }
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var reachedLimit = false;
    var objectLeft = Math.round(activeObject.left);
    var objectTop = Math.round(activeObject.top);
    var objectAngle = Math.round(activeObject.angle * 10) / 10;
    var objectWidth = Math.round(activeObject.width);
    var objectHeight = Math.round(activeObject.height);
    var objWidth = Math.round(activeObject.width * activeObject.scaleX);
    var objHeight = Math.round(activeObject.height * activeObject.scaleY);
    //	console.log(canvasWidth, canvasHeight, objectLeft, objectTop, objectAngle, objectWidth, objectHeight, objWidth, objHeight);


}


//use scale width height insted of scleX scaleY

//fabric.Canvas.prototype.preserveObjectStacking = true;
//  // Resize objects programmatically to keep stroke width constant
//  fabric.Object.prototype.resizeToScale = function (scaleX, scaleY, belongsToGroup) {
//    var objectScaleX = scaleX || this.scaleX;
//    var objectScaleY = scaleY || this.scaleY;
//    switch (this.type) {
//      case 'ellipse':
//        this.rx *= objectScaleX;
//        this.ry *= objectScaleY;
//        this.width = this.rx * 2;
//        this.height = this.ry * 2;
//        this.scaleX = 1;
//        this.scaleY = 1;
//        if (belongsToGroup) {
//          // Object's left and top are relative to group's position so let's
//          // update them too
//          this.left *= objectScaleX;
//          this.top *= objectScaleY;
//        }
//        break;
//      case 'rect':
//      case 'triangle':
//      case 'group':
//        this.width *= objectScaleX;
//        this.height *= objectScaleY;
//        this.scaleX = 1;
//        this.scaleY = 1;
//        if (belongsToGroup) {
//          // Object's left and top are relative to group's position so let's
//          // update them too
//          this.left *= objectScaleX;
//          this.top *= objectScaleY;
//        }
//        break;
//      default:
//        // Do nothing
//    }
//  };
//    
//  // Observe object scale so we can keep strokeWidth constant
//  canvas.on('object:scaling', function (e) {
//    if (e.target.type === 'group') {
//      // Group scaleX and scaleY values
//      var groupScaleX = e.target.scaleX;
//      var groupScaleY = e.target.scaleY;
//      // Resize group first
//      e.target.resizeToScale();
//      // Resize each item of the group using groupScale[X-Y]
//      e.target._objects.forEach(function (object) {
//        object.resizeToScale(groupScaleX, groupScaleY, true);
//      });
//    } else {
//      e.target.resizeToScale();
//    }
//  });
//		


/*
        undo and redo functions – this should be integrated in the controllers later on
*/
var _config = {
    canvasState: [],
    currentStateIndex: -1,
    undoStatus: false,
    redoStatus: false,
    undoFinishedStatus: 1,
    redoFinishedStatus: 1,

};
canvas.on(
    'object:modified',
    function () {
        updateCanvasState();
    }
);


canvas.on(
    'object:added',
    function () {
        updateCanvasState();
    }
);

canvas.on(
    'object:removed',
    function () {
        updateCanvasState();
    }
);


canvas.on(
    'selection:created',
    function () {
        updateCanvasState();
    }
);

var updateCanvasState = function () {
    if ((_config.undoStatus == false && _config.redoStatus == false)) {
        var jsonData = canvas.toJSON();
        var canvasAsJson = JSON.stringify(jsonData);
        if (_config.currentStateIndex < _config.canvasState.length - 1) {
            var indexToBeInserted = _config.currentStateIndex + 1;
            _config.canvasState[indexToBeInserted] = canvasAsJson;
            var numberOfElementsToRetain = indexToBeInserted + 1;
            _config.canvasState = _config.canvasState.splice(0, numberOfElementsToRetain);
        } else {
            _config.canvasState.push(canvasAsJson);
        }
        _config.currentStateIndex = _config.canvasState.length - 1;
        if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) { }
    }
}


var undo = function () {
    if (_config.undoFinishedStatus) {
        if (_config.currentStateIndex == -1) {
            _config.undoStatus = false;
        } else {
            if (_config.canvasState.length >= 1) {
                _config.undoFinishedStatus = 0;
                if (_config.currentStateIndex != 0) {
                    _config.undoStatus = true;
                    canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex - 1], function () {
                        var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex - 1]);
                        canvas.renderAll();
                        _config.undoStatus = false;
                        _config.currentStateIndex -= 1;
                        if (_config.currentStateIndex !== _config.canvasState.length - 1) { }
                        _config.undoFinishedStatus = 1;
                    });
                } else if (_config.currentStateIndex == 0) {
                    canvas.clear();
                    _config.undoFinishedStatus = 1;
                    _config.currentStateIndex -= 1;
                }
            }
        }
    }
}

var redo = function () {
    if (_config.redoFinishedStatus) {
        if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) { } else {
            if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length != 0) {
                _config.redoFinishedStatus = 0;
                _config.redoStatus = true;
                canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function () {
                    var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex + 1]);
                    canvas.renderAll();
                    _config.redoStatus = false;
                    _config.currentStateIndex += 1;
                    if (_config.currentStateIndex != -1) { }
                    _config.redoFinishedStatus = 1;
                    if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) { }
                });
            }
        }
    }
}


require('electron').ipcRenderer.on('ping', function (event, message) {
    console.log(message); // Prints "whoooooooh!"
});

require('electron').ipcRenderer.on('delete', function () {
    remove(); // Prints "whoooooooh!"
});

require('electron').ipcRenderer.on('copy', function () {
    copy(); // Prints "whoooooooh!"
});

require('electron').ipcRenderer.on('paste', function () {
    paste(); // Prints "whoooooooh!"
});



key('⌘+c, ctrl+c', function () {
    copy();
});
key('⌘+v, ctrl+v', function () {
    paste();
});
key('backspace, del', function () {
    remove();
});
key('⌘+g', function () {
    group();
});
key('⌘+u', function () {
    ungroup();
});
key('⌘+z', function () {
    undo();
});
key('shift+⌘+z', function () {
    redo();
});


// electron contextMenu test
//		Create a context menu in electron

const {
        remote
    } = require('electron')
const {
        Menu, MenuItem
    } = remote

const menu = new Menu()

// Build menu one item at a time, unlike


menu.append(new MenuItem({
    label: 'Send backwards',
    click() {
        sendBackwards()
    }
}))

menu.append(new MenuItem({
    label: 'Send to back',
    click() {
        sendToBack()
    }
}))

menu.append(new MenuItem({
    label: 'Bring forwards',
    click() {
        bringForward()
    }
}))

menu.append(new MenuItem({
    label: 'Bring to front',
    click() {
        bringToFront()
    }
}))

menu.append(new MenuItem({
    type: 'separator'
}))


menu.append(new MenuItem({
    label: 'Align',
    submenu: [{
        label: 'Left'
    }, {
        label: 'Center'
    }, {
        label: 'Right'
    }, {
        type: 'separator'
    }, {
        label: 'Top'
    }, {
        label: 'Middle'
    }, {
        label: 'Bottom'
    }]
}))

menu.append(new MenuItem({
    label: 'Distribute',
    submenu: [{
        label: 'Horizontal'
    }, {
        label: 'Vertical'
    }]
}))


menu.append(new MenuItem({
    type: 'separator'
}))

menu.append(new MenuItem({
    label: 'Group Selected',
    click() { }
}))

menu.append(new MenuItem({
    label: 'Ungroup Selected',
    click() { }
}))

menu.append(new MenuItem({
    type: 'separator'
}))

menu.append(new MenuItem({
    role: 'undo'
}))

menu.append(new MenuItem({
    role: 'redo'
}))

menu.append(new MenuItem({
    type: 'separator'
}))

menu.append(new MenuItem({
    role: 'cut'
}))

menu.append(new MenuItem({
    role: 'copy'
}))

menu.append(new MenuItem({
    role: 'paste'
}))

menu.append(new MenuItem({
    role: 'delete',
    click: function () {
        var focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow.webContents.send('delete');
    }
}))

menu.append(new MenuItem({
    role: 'selectall'
}))



// Prevent default action of right click in chromium. Replace with our menu.
window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)
