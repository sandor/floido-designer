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


//// for save  json ////
const {dialog} = require('electron').remote;

var fs = require('fs');

var fileSavedPath = "";
var appfolderPath = "";
//// for save json ////


var os = require('os');
var platf = os.platform();
debugger;

var slashForWin = "\\";
var slashForMac = "/";

var slash = platf == "win32" ? slashForWin : slashForMac;


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
        if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
        }
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
                        if (_config.currentStateIndex !== _config.canvasState.length - 1) {
                        }
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

var saveAS = function saveAS(fromDir) {

    // var tempFile = JSON.stringify(canvas);
    //
    // download(tempFile, 'test.json', 'text/plain');

    if (fromDir) {
        var fileName = slash + "tempProjectJson.json";
        debugger;
        fileName = rootFolder + fileName;
        fileSavedPath = fileName;
        //createDirectory(fileName);

        if (fileName === undefined) {
            console.log("You didn't save the file");
            return;
        }

        fs.writeFile(fileName, JSON.stringify(GenerateCanvasJson()), function (err) {

            if (err) {
                alert("An error ocurred creating the file " + err.message)
            }

            alert("The file has been succesfully saved");
        });

    } else {
        dialog.showSaveDialog(function (fileName) {
            debugger;
            fileSavedPath = fileName;
            createDirectory(fileName, true);

            if (fileName === undefined) {
                console.log("You didn't save the file");
                return;
            }

            fs.writeFile(fileName, JSON.stringify(GenerateCanvasJson()), function (err) {

                if (err) {
                    alert("An error ocurred creating the file " + err.message)
                }

                alert("The file has been succesfully saved");
            });
        });
    }

}

var path = dialog.showOpenDialog({
    properties: ['openDirectory']
});

var rootFolder = path + slash + 'MyDesignProject';

function createDirectory(appfolderPath, cutomFolder) {
    debugger;
    if (cutomFolder) {
        var appDirTemp = (JSON.parse(JSON.stringify(appfolderPath))).toString();

        debugger;
        var res = appDirTemp.split(slash);

        appfolderPath = appDirTemp;

        rootFolder = path + slash + res[res.length - 1];

        // for (let i = -1; i++ < res.length - 2;) {
        //     if (i != res.length - 3) {
        //         appfolderPath += res[i] + slash;
        //     }
        //     appfolderPath += res[i];
        //
        // }
        debugger;


        if (!fs.existsSync(res[res.length - 1])) {
            fs.mkdirSync(res[res.length - 1]);
        }
    }


    // var path = dialog.showOpenDialog({
    //     properties: ['openDirectory']
    // });


    //var dir = appfolderPath + './Assets';


    debugger;

    if (cutomFolder) {
        var directoriesTobeCreated = {
            rootFolder: rootFolder,
            assets: appfolderPath + slash + 'Assets',
            assetsSubImages: appfolderPath + slash + 'Assets' + slash + 'images',
            assetsSubMovies: appfolderPath + slash + 'Assets' + slash + 'movies',
            assetsSubThumbnails: appfolderPath + slash + 'Assets' + slash + 'thumbnails',
            framerExport: appfolderPath + slash + 'framerExport',
            json: appfolderPath + slash + 'json',
            pages: appfolderPath + slash + 'pages',


        };

    } else {
        debugger;
        var directoriesTobeCreated = {
            rootFolder: rootFolder,
            assets: appfolderPath + slash + 'MyDesignProject' + slash + 'Assets',
            assetsSubImages: appfolderPath + slash + 'MyDesignProject' + slash + 'Assets' + slash + 'images',
            assetsSubMovies: appfolderPath + slash + 'MyDesignProject' + slash + 'Assets' + slash + 'movies',
            assetsSubThumbnails: appfolderPath + slash + 'MyDesignProject' + slash + 'Assets' + slash + 'thumbnails',
            framerExport: appfolderPath + slash + 'MyDesignProject' + slash + 'framerExport',
            json: appfolderPath + slash + 'MyDesignProject' + slash + 'json',
            pages: appfolderPath + slash + 'MyDesignProject' + slash + 'pages',


        };
    }

    for (let directoriKey in directoriesTobeCreated) {
        if (directoriesTobeCreated[directoriKey]) {

            if (!fs.existsSync(directoriesTobeCreated[directoriKey])) {
                fs.mkdirSync(directoriesTobeCreated[directoriKey]);
                console.log(directoriesTobeCreated[directoriKey]);
            }
        }


    }

    save(true);

}

createDirectory(path);

function GenerateCanvasJson() {
    return {
        leftColor: document.getElementById('gradLeft') ? document.getElementById('gradLeft').value : "#ffffff",
        rightColor: document.getElementById('gradRight') ? document.getElementById('gradRight').value : "#ffffff",
        canvasWidth: canvas ? canvas.width : 1024,
        canvasHeight: canvas ? canvas.height : 768,
        state: canvas.toJSON()
    }
}

function save(fromDir) {

    if (fileSavedPath) {
        fs.writeFile(fileSavedPath, JSON.stringify(GenerateCanvasJson()), function (err) {

            if (err) {
                alert("An error ocurred creating the file " + err.message)
            }

            alert("The file has been succesfully saved");
        });
    }
    else {
        saveAS(fromDir);
    }
}


debugger;

var loadJSON = function () {


    const {
        ipcRenderer
    } = require('electron')
    ipcRenderer.send('openFile', () => {
    })
    ipcRenderer.once('fileData', (event, filepath) => {

        var reader = new FileReader();

        function readTextFile(file) {
            return new Promise(function (resolve, reject,) {
                var rawFile = new XMLHttpRequest();

                rawFile.open("GET", file, false);
                rawFile.onreadystatechange = function () {
                    if (rawFile.readyState === 4) {
                        if (rawFile.status === 200 || rawFile.status == 0) {
                            resolve(rawFile.responseText);

                            // alert(allText);
                        }
                    }
                }
                rawFile.send(null);
            })

        }

        readTextFile(filepath).then(function (resolvedPAram) {
            var tempOPenedCanvas = JSON.parse(resolvedPAram)
            var tempCanvas = tempOPenedCanvas.state;

            canvas.loadFromJSON(tempCanvas, function () {
                canvas.renderAll();
            });

            setCanvasSize(tempOPenedCanvas.canvasHeight, tempOPenedCanvas.canvasWidth);
            addGradient(tempOPenedCanvas.leftColor, tempOPenedCanvas.rightColor);

        })


    })

}

function setCanvasSize(height, width) {
    //;

    document.getElementById('myWidth').value = width;
    document.getElementById('myHeight').value = height;


    var setWidth = document.getElementById('myWidth').value;
    var setHeight = document.getElementById('myHeight').value;
    canvas.setWidth(setWidth);
    canvas.setHeight(setHeight);
    console.info(setWidth, setHeight);
    canvas.calcOffset();

}

function addGradient(left, right) {

    document.getElementById('gradLeft').value = left;
    document.getElementById('gradRight').value = right;

    var leftColor = document.getElementById('gradLeft').value;
    var rightColor = document.getElementById('gradRight').value;
    console.log(leftColor, rightColor);

    var grad = new fabric.Gradient({
        type: 'linear',
        coords: {
            x1: 0,
            y1: 0,
            x2: canvas.width,
            y2: canvas.height,
        },
        colorStops: [{
            color: leftColor,
            offset: 0,
        },
            {
                color: rightColor,
                offset: 1,
            }
        ]
    });
    canvas.backgroundColor = grad.toLive(canvas.contextContainer);
    canvas.renderAll();
};
var redo = function () {
    if (_config.redoFinishedStatus) {
        if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
        } else {
            if (_config.canvasState.length > _config.currentStateIndex && _config.canvasState.length != 0) {
                _config.redoFinishedStatus = 0;
                _config.redoStatus = true;
                canvas.loadFromJSON(_config.canvasState[_config.currentStateIndex + 1], function () {
                    var jsonData = JSON.parse(_config.canvasState[_config.currentStateIndex + 1]);
                    canvas.renderAll();
                    _config.redoStatus = false;
                    _config.currentStateIndex += 1;
                    if (_config.currentStateIndex != -1) {
                    }
                    _config.redoFinishedStatus = 1;
                    if ((_config.currentStateIndex == _config.canvasState.length - 1) && _config.currentStateIndex != -1) {
                    }
                });
            }
        }
    }
}


/*
setup IPC communication/functions with mainmenu.js
*/

//File Menu

require('electron').ipcRenderer.on('open', function (event, message) {

    console.log(message);
    loadJSON();
});
require('electron').ipcRenderer.on('save', function (event, message) {

    console.log(message);
    save();
});


require('electron').ipcRenderer.on('saveAs', function (event, message) {

    console.log(message);
    saveAS();
});

//edit menu

require('electron').ipcRenderer.on('undo', function (event, message) {
    console.log(message);
    undo();
});

require('electron').ipcRenderer.on('redo', function (event, message) {
    console.log(message);
    redo();
});

require('electron').ipcRenderer.on('remove', function (event, message) {
    console.log(message);
    remove();
});

require('electron').ipcRenderer.on('cut', function (event, message) {
    console.log(message);
    copy();
    remove();
});

require('electron').ipcRenderer.on('copy', function (event, message) {
    console.log(message);
    copy();
});

require('electron').ipcRenderer.on('paste', function (event, message) {
    console.log(message);
    paste();
});

require('electron').ipcRenderer.on('duplicate', function (event, message) {
    console.log(message);
    copy();
    paste();
});

//Arrange menu

require('electron').ipcRenderer.on('group', function (event, message) {
    console.log(message);
    group();
});

require('electron').ipcRenderer.on('ungroup', function (event, message) {
    console.log(message);
    ungroup();
});

require('electron').ipcRenderer.on('bringForward', function (event, message) {
    console.log(message);
    bringForward();
});

/*
Utility functions for selecting and aranging objects on the canvas
*/


//sen the objects forward and backward

function sendBackwards() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendBackwards(activeObject);
    }
};

function sendToBack() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.sendToBack(activeObject);
    }
};

function bringForward() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringForward(activeObject);
    }
};

function bringToFront() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.bringToFront(activeObject);
    }
};


// electron contextMenu test this should be moved in a separate JS file in menus
// Create a context menu in electron

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
        sendBackwards();
    }
}))

menu.append(new MenuItem({
    label: 'Send to back',
    click() {
        sendToBack();
    }
}))

menu.append(new MenuItem({
    label: 'Bring forwards',
    click() {
        bringForward();
    }
}))

menu.append(new MenuItem({
    label: 'Bring to front',
    click() {
        bringToFront();
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
    click() {
        group();
    }
}))

menu.append(new MenuItem({
    label: 'Ungroup Selected',
    click() {
        ungroup();
    }
}))

menu.append(new MenuItem({
    type: 'separator'
}))

menu.append(new MenuItem({
    label: 'Undo',
    click() {

        undo();
    }
}))

menu.append(new MenuItem({
    label: 'Save',
    click() {
        save();
    }
}))

menu.append(new MenuItem({
    label: 'Redo',
    click() {
        redo();
    }
}))

menu.append(new MenuItem({
    type: 'separator'
}))

menu.append(new MenuItem({
    label: 'Cut',
    click() {
        copy();
        remove();
    }
}))

menu.append(new MenuItem({
    label: 'Copy',
    click() {
        copy();
    }
}))

menu.append(new MenuItem({
    label: 'Paste',
    click() {
        paste();
    }
}))

menu.append(new MenuItem({
    label: 'Delete',
    click() {
        remove();
    }
}))

menu.append(new MenuItem({
    label: 'Select All',
    click() {
        selectAllCanvasObjects();
    }
}))


// Prevent default action of right click in chromium. Replace with our menu.
document.getElementById("wrapper").addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false)