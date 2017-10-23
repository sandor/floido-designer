//		var kitchensink = {};
//		var canvas = new fabric.Canvas('canvas', {
//			backgroundColor: "#FFFFFF",
//			selectionColor: "rgba(0, 108, 223, 0.05)",
//			selectionBorderColor: "rgba(0, 108, 223, 0.3)",
//			selectionDashArray: [2, 2]
//		});
//		initAligningGuidelines(canvas);
//		initCenteringGuidelines(canvas);


var canvasObjectFillColor = "#ffffff";
var canvasObjectBackColor = "#ffffff";
var canvasObjectBorderColor = "#ffffff";
var canvasObjectBackgroundColor = "#ffffff";
var canvasObjectShadowColor = "#ffffff";
var canvasObjectBorderStrokeWidth = 0;
var cavasObjectOpacity = 0;
var cavasObjectCorner = 0;
var canvasObjectShadowOffsetX = 0;
var canvasObjectShadowOffsetY = 0;
var canvasObjectShadowBlur = 0;

///////////Typography//////////////

var fontSelectDropdown = "iOS Fonts";
var fontSelectDropdownSmall = "serif";
var fontSelectDropdownFilter = "";
var fontSelectList = "Arial";
var textDecorating = "left";
var fontStyleBold = "";
var fontStyleUnderline = "";
var fontStyleItalic = "";
var fontWeight = 400;
var fontColor = "#000000";
// var fontColorInput = fontColor;
var fontBackgroundColor = "#ffffff";
// var fontBackgroundColorInput = fontBackgroundColor;
var fontSize = 20;
// var fontSizeInput = fontSize;
var lineHeight = 1;
// var lineHeightInput = lineHeight;
var fontSpacing = 1;
// var fontSpacingInput = fontSpacing;
var fontBorder = 0;
// var fontBorderInput = fontBorder;
var fontBorderColor = "#ffffff";


//////////////Typography//////////

//move objects on the canvas with keyboard

document.onkeydown = function(e) {

    var step = 2;

    switch (e.keyCode) {
        case 38:
            /* Up arrow */
            if (canvas.getActiveObject()) {
                canvas.getActiveObject().top -= step;
                canvas.renderAll();
            }
            break;
        case 40:
            /* Down arrow  */
            if (canvas.getActiveObject()) {
                canvas.getActiveObject().top += step;
                canvas.renderAll();
            }
            break;
        case 37:
            /* Left arrow  */
            if (canvas.getActiveObject()) {
                canvas.getActiveObject().left -= step;
                canvas.renderAll();
            }
            break;
        case 39:
            /* Right arrow  */
            if (canvas.getActiveObject()) {
                canvas.getActiveObject().left += step;
                canvas.renderAll();
            }
            break;

    }
}


/*copy, paste and delete object – shortcuts are defined with keymaster.js https://github.com/madrobby/keymaster (see the index.html)*/


function group() {
    if (!canvas.getActiveObject()) {
        return;
    }
    if (canvas.getActiveObject().type !== 'activeSelection') {
        return;
    }
    canvas.getActiveObject().toGroup();
    canvas.requestRenderAll();
}

function ungroup() {
    if (!canvas.getActiveObject()) {
        return;
    }
    if (canvas.getActiveObject().type !== 'group') {
        var object = canvas.getActiveObject();
        object.set('name', "Grouped Objects");
        object.set('icon', "content-copy");
        return;
    }
    canvas.getActiveObject().toActiveSelection();
    canvas.requestRenderAll();
}

function setCanvasActiveObjectData() {

    if (document.getElementById('objectIn-canvas-background-colorselect')) {
        document.getElementById('objectIn-canvas-background-colorselect').value = canvasObjectBackColor;
        document.getElementById('canv-obj-fill-color').value = canvasObjectBackColor;
        document.getElementById('canvas-border-object-colorSelect').value = canvasObjectBorderColor;
        document.getElementById('canvas-border-object-colorSelect-input').value = canvasObjectBorderColor;
        document.getElementById('canvas-object-border').value = canvasObjectBorderStrokeWidth;
        document.getElementById('canvas-object-border-input').value = canvasObjectBorderStrokeWidth;
        document.getElementById('canv-obj-back-color').value = canvasObjectBackgroundColor;
        document.getElementById('objectIn-canvas-background-colorselect-down').value = canvasObjectBackgroundColor;
        document.getElementById('cavas-object-opacity-input').value = cavasObjectOpacity;
        document.getElementById('cavas-object-corner').value = cavasObjectCorner;
        document.getElementById('canvas-object-corner-input').value = cavasObjectCorner;
        document.getElementById('obj-shadow-color').value = canvasObjectShadowColor;
        document.getElementById('obj-shadow-blur').value = canvasObjectShadowBlur;
    }

    ///////////Typography//////////////
    if (canvas.getActiveObject() && canvas.getActiveObject().hasOwnProperty('text')) {

        fontSelectList = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontFamily : "Arial";
        textDecorating = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.textAlign : "left"; //text styling
        fontStyleBold = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : "";
        // fontStyleUnderline = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : ""; //underline:true
        fontStyleItalic = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontStyle : "";
        fontWeight = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : 400;
        fontColor = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fill : "#000000";
        fontBackgroundColor = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') && canvas._activeObject.backgroundColor != "" ? canvas._activeObject.backgroundColor : "#ffffff";


        fontSize = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontSize : 20;
        lineHeight = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.lineHeight : 1;
        fontSpacing = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.charSpacing : 1;


    }

}

function getCanvasActiveObjectData() {

    canvasObjectBackColor = canvas._activeObject && canvas._activeObject.fill ? canvas._activeObject.fill : "#ffffff";
    canvasObjectBorderColor = canvas._activeObject && canvas._activeObject.stroke ? canvas._activeObject.stroke : "#ffffff";
    canvasObjectBorderStrokeWidth = canvas._activeObject && canvas._activeObject.strokeWidth ? canvas._activeObject.strokeWidth : 0;
    canvasObjectBackgroundColor = canvas._activeObject && canvas._activeObject.backgroundColor ? canvas._activeObject.backgroundColor : "#ffffff";
    cavasObjectOpacity = canvas._activeObject && canvas._activeObject.opacity ? canvas._activeObject.opacity : 0;
    cavasObjectCorner = canvas._activeObject && canvas._activeObject.rx ? canvas._activeObject.rx : 0;
    canvasObjectShadowColor = canvas._activeObject && canvas._activeObject.shadow ? canvas._activeObject.shadow.color : "#ffffff";


    canvasObjectShadowOffsetX = canvas._activeObject && canvas._activeObject.shadow ? canvas._activeObject.shadow.offsetX : 0;
    canvasObjectShadowOffsetY = canvas._activeObject && canvas._activeObject.shadow ? canvas._activeObject.shadow.offsetY : 0;
    canvasObjectShadowBlur = canvas._activeObject && canvas._activeObject.shadow ? canvas._activeObject.shadow.Blur : 0;


    ///////////Typography//////////////


    // fontSelectDropdown = //canvas._activeObject && canvas._activeObject.hasOwnProperty('text')?canvas._activeObject.fontSize:12;//////////To be comfirmed
    //     fontSelectDropdownSmall =   //canvas._activeObject && canvas._activeObject.hasOwnProperty('text')?canvas._activeObject.fontSize: "serif"; //////////To be comfirmed
    //         fontSelectDropdownFilter = //canvas._activeObject && canvas._activeObject.hasOwnProperty('text')?canvas._activeObject.fontSize:";//////////To be comfirmed
    //
    //             fontSelectList = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontFamily : "Arial";
    // //
    // textDecorating = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.textAlign : "left";//text styling
    // fontStyleBold = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : "";
    // // fontStyleUnderline = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : ""; //underline:true
    // fontStyleItalic = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontStyle : "";
    // fontWeight = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fontWeight : 400;
    // fontColor = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.fill : "#000000";
    // fontBackgroundColor = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') && canvas._activeObject.backgroundColor != "" ? canvas._activeObject.backgroundColor : "#ffffff";
    // fontSize = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.backgroundColor : 20;
    // lineHeight = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.lineHeight : 1;
    // fontSpacing = canvas._activeObject && canvas._activeObject.hasOwnProperty('text') ? canvas._activeObject.charSpacing : 1;


    // fontBorder = 0;
    // fontBorderColor = "#ffffff";


    ///////////Typography//////////////

    if (canvas.getActiveObject() && canvas.getActiveObject().hasOwnProperty('text')) {


        // if()

        //////////////////////font style
        [].__proto__.forEach.call(document.getElementsByClassName("font-style"), (item) => {

            item.removeAttribute("disabled");
            item.removeAttribute("toggled");

            if (item.hasAttribute("id")) {
                //in textDecorating we stre button id wich was applied in text

                if ((item.getAttribute("id").search("bold") != -1) && (fontStyleBold == 'bold')) {
                    item.setAttribute("toggled", "true");
                }
                if ((item.getAttribute("id").search("italic") != -1) && (fontStyleItalic == 'italic')) {
                    item.setAttribute("toggled", "true");
                }


            }


        });

        //////////////////text decorating
        [].__proto__.forEach.call(document.getElementsByClassName("text-decorating"), (item) => {
            // console.log(canvasItem.name);

            item.removeAttribute("disabled");

            if (item.hasAttribute("id")) {
                //in textDecorating we stre button id wich was applied in text

                item.removeAttribute("toggled");

                if (item.getAttribute("id").search(textDecorating) != -1) {

                    item.setAttribute("toggled", "true");

                }

            }


        });


        if (document.getElementById("font-color")) {

            //////////////////font-color
            document.getElementById("font-color").removeAttribute("disabled");
            document.getElementById("font-color-input").removeAttribute("disabled");
            document.getElementById("font-color").value = fontColor;
            document.getElementById("font-color-input").value = fontColor;

            //////////////////font-size

            document.getElementById("font-size").removeAttribute("disabled");
            document.getElementById("font-size-input").removeAttribute("disabled");
            document.getElementById("font-size").value = fontSize;
            document.getElementById("font-size-input").value = fontSize;


            //////////////////font-background-color
            document.getElementById("font-background-color").removeAttribute("disabled");
            document.getElementById("font-background-color-input").removeAttribute("disabled");
            document.getElementById("font-background-color").value = fontBackgroundColor;
            document.getElementById("font-background-color-input").value = fontBackgroundColor;

            //////////////////line-height
            document.getElementById("line-height").removeAttribute("disabled");
            document.getElementById("line-height-input").removeAttribute("disabled");
            document.getElementById("line-height").value = lineHeight;
            document.getElementById("line-height-input").value = lineHeight;

            //////////////////font-spacing
            document.getElementById("font-spacing").removeAttribute("disabled");
            document.getElementById("font-spacing-input").removeAttribute("disabled");
            document.getElementById("font-spacing").value = fontSpacing;
            document.getElementById("font-spacing-input").value = fontSpacing;

            //////////////////font-border///it doesnt need
            // document.getElementById("font-border").removeAttribute("disabled");
            // document.getElementById("font-border-input").removeAttribute("disabled");
            document.getElementById("font-border").value = fontBorder;
            document.getElementById("font-border-input").value = fontBorder;


            //////////////////obj-shadow-color
            document.getElementById("obj-shadow-color").removeAttribute("disabled");
            document.getElementById("shadow-Offset-X").removeAttribute("disabled");
            document.getElementById("shadow-Offset-Y").removeAttribute("disabled");

            ///font
            document.getElementById("font-select-dropdown").removeAttribute("disabled");
            document.getElementById("font-select-dropdown-small").removeAttribute("disabled");
            document.getElementById("font-select-dropdown-filter").removeAttribute("disabled");
            document.getElementById("font-add").setAttribute("disabled", "true");

            //font weight
            document.getElementById("font-weight").removeAttribute("disabled");

            //font-border-
            document.getElementById("font-border-input").removeAttribute("disabled");
            document.getElementById("font-border").removeAttribute("disabled");
            document.getElementById("font-border-color").removeAttribute("disabled");
            document.getElementById("font-border-color-input").removeAttribute("disabled");
            //

            document.getElementById("font-border-input").value = canvasObjectBorderStrokeWidth;
            document.getElementById("font-border").value = canvasObjectBorderStrokeWidth;
            document.getElementById("font-border-color").value = canvasObjectBorderColor;
            document.getElementById("font-border-color-input").value = canvasObjectBorderColor;


            if (canvas._activeObject.shadow) {

                document.getElementById("obj-shadow-color").value = canvasObjectShadowColor;
                document.getElementById("shadow-Offset-X").value = canvasObjectShadowOffsetX;
                document.getElementById("shadow-Offset-Y").value = canvasObjectShadowOffsetY;
                //document.getElementById("obj-shadow-color").removeAttribute("disabled");
            }


        }


    } else {

        if (document.getElementById("font-color")) {
            //font
            document.getElementById("font-select-dropdown").setAttribute("disabled", "true");
            document.getElementById("font-select-dropdown-small").setAttribute("disabled", "true");
            document.getElementById("font-select-dropdown-filter").setAttribute("disabled", "true");
            document.getElementById("font-add").setAttribute("disabled", "true");

            //font weight
            document.getElementById("font-weight").setAttribute("disabled", "true");


            // font shadow
            document.getElementById("font-color").setAttribute("disabled", "true");
            document.getElementById("font-color-input").setAttribute("disabled", "true");
            document.getElementById("font-background-color").setAttribute("disabled", "true");
            document.getElementById("font-background-color-input").setAttribute("disabled", "true");
            document.getElementById("font-background-color-input").value = '';

            //////////////////font-size
            document.getElementById("font-size").setAttribute("disabled", "true");
            document.getElementById("font-size").value = 0;
            document.getElementById("font-size-input").setAttribute("disabled", "true");
            document.getElementById("font-size-input").value = '';

            //////////////////line-height
            document.getElementById("line-height").setAttribute("disabled", "true");
            document.getElementById("line-height-input").setAttribute("disabled", "true");
            document.getElementById("line-height").value = 0;
            document.getElementById("line-height-input").value = '';


            //////////////////font-spacing
            document.getElementById("font-spacing").setAttribute("disabled", "true");
            document.getElementById("font-spacing-input").setAttribute("disabled", "true");
            document.getElementById("font-spacing").value = 0;
            document.getElementById("font-spacing-input").value = '';


            //////////////////font-border///it doesnt need
            document.getElementById("font-border").setAttribute("disabled", "true");
            document.getElementById("font-border-input").setAttribute("disabled", "true");
            document.getElementById("font-border").value = 0;
            document.getElementById("font-border-input").value = '';

            //////////////////obj-shadow-color


            document.getElementById("obj-shadow-blur").setAttribute("disabled", "true");
            document.getElementById("shadow-Offset-X").setAttribute("disabled", "true");
            document.getElementById("shadow-Offset-Y").setAttribute("disabled", "true");
            //document.getElementById("obj-shadow-color").setAttribute("disabled", "true");

            document.getElementById("obj-shadow-blur").value = '';
            document.getElementById("obj-shadow-color").value = "#ffffff";
            document.getElementById("shadow-Offset-X").value = '';
            document.getElementById("shadow-Offset-Y").value = '';
            //document.getElementById("font-spacing-input").value = '';


            //font-border-

            document.getElementById("font-border-input").value = '';
            document.getElementById("font-border").value = '';
            document.getElementById("font-border-color").value = "#ffffff";
            document.getElementById("font-border-color-input").value = "#ffffff";


            [].__proto__.forEach.call(document.getElementsByClassName("font-style"), (item) => {

                item.setAttribute("disabled", "true");
                item.removeAttribute("toggled");

            });
            [].__proto__.forEach.call(document.getElementsByClassName("text-decorating"), (item) => {

                item.setAttribute("disabled", "true");
                item.removeAttribute("toggled");

            });

        }


    }


    ///////////Typography//////////////
    //
}


// disable inputs and color picker
function enableDisableElement() {

    if (canvas.getActiveObject() && document.getElementById('objectIn-canvas-background-colorselect') && document.getElementById('objectIn-canvas-background-colorselect-down')) {

        document.getElementById('objectIn-canvas-background-colorselect').removeAttribute('disabled');
        document.getElementById('objectIn-canvas-background-colorselect-down').removeAttribute('disabled');
        document.getElementById('canv-obj-fill-color').removeAttribute('disabled');
        document.getElementById('canv-obj-back-color').removeAttribute('disabled');
        document.getElementById('canvas-object-border').removeAttribute('disabled');
        document.getElementById('canvas-border-object-colorSelect').removeAttribute('disabled');
        document.getElementById('canvas-object-corner').removeAttribute('disabled');
        // document.getElementById('obj-shadow-color').removeAttribute('disabled');
        // document.getElementById('shadow-blur').removeAttribute('disabled');
        // document.getElementById('shadow-Offset-X').removeAttribute('disabled');
        // document.getElementById('shadow-Offset-Y').removeAttribute('disabled');


    }


    if (!canvas.getActiveObject() && document.getElementById('objectIn-canvas-background-colorselect') &&
        document.getElementById('objectIn-canvas-background-colorselect-down')) {


        document.getElementById('objectIn-canvas-background-colorselect').setAttribute('disabled', true);
        document.getElementById('objectIn-canvas-background-colorselect-down').setAttribute('disabled', true);
        document.getElementById('canv-obj-fill-color').setAttribute('disabled', true);
        document.getElementById('canv-obj-back-color').setAttribute('disabled', true);
        document.getElementById('canvas-object-border').setAttribute('disabled', true);
        document.getElementById('canvas-border-object-colorSelect').setAttribute('disabled', true);
        document.getElementById('canvas-object-corner').setAttribute('disabled', true);
        document.getElementById('obj-shadow-color').setAttribute('disabled', true);

        ///
        canvasObjectBackColor = canvas._activeObject && canvas._activeObject.fill ? canvas._activeObject.fill : "";
        canvasObjectBorderColor = canvas._activeObject && canvas._activeObject.stroke ? canvas._activeObject.stroke : "";
        canvasObjectBackgroundColor = canvas._activeObject && canvas._activeObject.backgroundColor ? canvas._activeObject.backgroundColor : "";
    }

    if (document.getElementById('enableShadow') && !document.getElementById('enableShadow').hasAttribute("toggled")) {

        document.getElementById('obj-shadow-color').setAttribute('disabled', true);
        document.getElementById('shadow-blur').setAttribute('disabled', true);
        document.getElementById('shadow-Offset-X').setAttribute('disabled', true);
        document.getElementById('shadow-Offset-Y').setAttribute('disabled', true);


    }

    // removing data from  filters and shadows fields /////////////////
    if ((document.getElementById('shadow-Offset-X') && document.getElementById('shadow-Offset-Y') && !canvas.getActiveObject()) || (document.getElementById('shadow-Offset-X') && document.getElementById('shadow-Offset-Y') && !canvas.getActiveObject().shadow)) {


        document.getElementById('shadow-Offset-X').value = '';
        document.getElementById('shadow-Offset-Y').value = '';
        document.getElementById('shadow-blur').value = '';
    }

    if (canvas.getActiveObject() && canvas.getActiveObject.name != "Image" && canvas.getActiveObject.name != "Text") {


        if (document.getElementById('obj-shadow-color') && document.getElementById('shadow-blur')) {
            document.getElementById('obj-shadow-color').removeAttribute('disabled');
            document.getElementById('shadow-blur').removeAttribute('disabled');
            document.getElementById('shadow-Offset-X').removeAttribute('disabled');
            document.getElementById('shadow-Offset-Y').removeAttribute('disabled');
        }


    }


}

/* This is for adding custom attribute to the objects!
 */
var customProperties = 'name icon'.split(' ');


function copy() {
    // clone what are you copying since you may want copy and paste on different moment.
    // and you do not want the changes happened later to reflect on the copy.
    // maybe.
    canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
    }, customProperties);
}

function paste() {
    // clone again, so you can do multiple copies.
    _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
            // active selection needs a reference to the canvas.
            clonedObj.canvas = canvas;
            clonedObj.forEachObject(function(obj) {
                canvas.add(obj);
            });
            // this should solve the unselectability
            clonedObj.setCoords();
        } else {
            canvas.add(clonedObj);
        }
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
        console.log(clonedObj);

        _clipboard = clonedObj;
    }, customProperties);
}

function remove() {

    if (document.activeElement && document.activeElement.hasAttribute('value') || (document.activeElement && document.activeElement.value)) {
        document.activeElement.value = 0;
    } else {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveObject().type !== 'group';

        if (activeGroup) {
            var objectsInGroup = canvas.getActiveObjects();
            objectsInGroup.forEach(function(object) {
                canvas.remove(object);
            });
        } else if (activeObject) {
            canvas.remove(activeObject);
        }
        canvas.discardActiveObject();
    }

}


//---------------------------

fabric.Object.prototype.set({
    transparentCorners: false,
    borderColor: 'rgba(0, 177, 255, 0.4)',
    cornerColor: '#00b1ff',
    cornerSize: 8,
    cornerStyle: 'circle',
    padding: -1
});

function getActiveStyle(styleName, object) {
    object = object || canvas.getActiveObject();
    if (!object) return '';

    return (object.getSelectionStyles && object.isEditing) ? (object.getSelectionStyles()[styleName] || '') : (object[styleName] || '');
};

function setActiveStyle(styleName, value, object) {
    object = object || canvas.getActiveObject();
    if (!object) return;

    if (object.setSelectionStyles && object.isEditing) {
        var style = {};
        style[styleName] = value;
        object.setSelectionStyles(style);
        object.setCoords();
    } else {
        object.set(styleName, value);
    }

    object.setCoords();
    canvas.renderAll();
};

function getActiveProp(name) {

    var object = canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
}

function setActiveProp(name, value) {
    var object = canvas.getActiveObject();
    if (!object) return;
    object.set(name, value).setCoords();
    canvas.renderAll();
}


////////////


function getActiveShadow(name) {

    if (canvas.getActiveObject() && canvas.getActiveObject().shadow && document.getElementById('enableShadow') && !document.getElementById('enableShadow').hasAttribute('toggled')) {

        document.getElementById('enableShadow').setAttribute('toggled', 'true');

    }
    if ((!canvas.getActiveObject() && document.getElementById('enableShadow')) || (canvas.getActiveObject() && !canvas.getActiveObject().shadow && document.getElementById('enableShadow'))) {
        document.getElementById('enableShadow').removeAttribute('toggled');
    }

    if (document.getElementById('shadow-Offset-X') && document.getElementById('shadow-Offset-Y') && canvas.getActiveObject() && canvas.getActiveObject().shadow) {

        document.getElementById('shadow-Offset-X').value = canvas.getActiveObject().shadow.offsetX;
        document.getElementById('shadow-Offset-Y').value = canvas.getActiveObject().shadow.offsetY;

    }


    if (canvas.getActiveObject() && canvas.getActiveObject().shadow) {

        // document.getElementById()

        return canvas.getActiveObject().shadow;
    } else {
        return '';
    }


}

function setActiveShadow(name, value) {
    var object = canvas.getActiveObject();

    if (!object) return;
    if (object.shadow) {

        object.shadow[name] = value;
    } else {
        var ob = {};
        ob[name] = value;
        object.setShadow(ob);
    }

    object.setCoords();
    canvas.renderAll();
}


///////////

function addAccessors($scope, $rootScope) {


    //	Filter Definition test

    $scope.contrastFilter = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        if (obj.filters[0]) {
            delete obj.filters[0];
        } else {
            obj.filters[0] = new fabric.Image.filters.Contrast({
                contrast: 15
            });
        }
        obj.applyFilters();
        canvas.renderAll();
    };

    $scope.blurFilter = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        if (obj.filters[0]) {
            delete obj.filters[0];
        } else {
            obj.filters[0] = new fabric.Image.filters.Blur({
                blur: 2
            });
        }
        obj.applyFilters();
        canvas.renderAll();
    };


    $scope.setBlur = function(value) {
        getActiveStyle('blur', value);
        canvas.renderAll();
    };

    //////////////////


    $scope.setShadowOffsetX = function(value) {

        setActiveShadow('offsetX', value);
        //canvas.renderAll();
    };

    $scope.getShadowOffsetX = function(value) {

        getActiveShadow('offsetX', value);
    };


    $scope.setShadowOffsetY = function(value) {

        setActiveShadow('offsetY', value);
        canvas.renderAll();
    };

    $scope.getShadowOffsetY = function(value) {

        getActiveShadow('offsetY', value);
    };


    $scope.setShadowBlur = function(value) {
        setActiveShadow('blur', value);
        canvas.renderAll();
    };

    $scope.getShadowBlur = function(value) {
        getActiveShadow('blur', value);
    };

    $scope.setShadowColor = function(value) {
        setActiveShadow('color', value);
        canvas.renderAll();
    };

    $scope.getShadowColor = function(value) {
        getActiveShadow('color', value);
    };

    $scope.shadowify = function() {

        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.shadow) {
            obj.shadow = null;
        } else {
            obj.setShadow({
                color: "#000000",
                blur: 50,
                offsetX: 10,
                offsetY: 10
            });
        }
        canvas.renderAll();
    };


    //////////////////

    $scope.getOpacity =
        function() {

            return getActiveStyle('opacity') * 100;
        };
    $scope.setOpacity = function(value) {

        cavasObjectOpacity = value;
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

    $scope.getFill = function() {
        return getActiveStyle('fill');
    };
    $scope.setFill = function(value) {
        setActiveStyle('fill', value);
    };

    $scope.isBold = function() {
        return getActiveStyle('fontWeight') === 'bold';
    };
    $scope.toggleBold = function() {
        setActiveStyle('fontWeight',
            getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    };
    $scope.isItalic = function() {
        return getActiveStyle('fontStyle') === 'italic';
    };
    $scope.toggleItalic = function() {
        setActiveStyle('fontStyle',
            getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    };

    $scope.isUnderline = function() {
        return getActiveStyle('textDecoration').indexOf('underline') > -1;
    };
    $scope.toggleUnderline = function() {
        var value = $scope.isUnderline() ? getActiveStyle('textDecoration').replace('underline', '') : (getActiveStyle('textDecoration') + ' underline');
        var value = $scope.isUnderline() ? getActiveStyle('textDecoration').replace('underline', '') : (getActiveStyle('textDecoration') + ' underline');

        setActiveStyle('textDecoration', value);
    };

    $scope.isLinethrough = function() {
        return getActiveStyle('textDecoration').indexOf('line-through') > -1;
    };
    $scope.toggleLinethrough = function() {
        var value = $scope.isLinethrough() ? getActiveStyle('textDecoration').replace('line-through', '') : (getActiveStyle('textDecoration') + ' line-through');

        setActiveStyle('textDecoration', value);
    };
    $scope.isOverline = function() {
        return getActiveStyle('textDecoration').indexOf('overline') > -1;
    };
    $scope.toggleOverline = function() {
        var value = $scope.isOverline() ? getActiveStyle('textDecoration').replace('overline', '') : (getActiveStyle('textDecoration') + ' overline');

        setActiveStyle('textDecoration', value);
    };

    $scope.getText = function() {
        return getActiveProp('text');
    };
    $scope.setText = function(value) {
        setActiveProp('text', value);
    };

    $scope.getTextAlign = function() {
        return capitalize(getActiveProp('textAlign'));
    };
    $scope.setTextAlign = function(value) {
        setActiveProp('textAlign', value.toLowerCase());
    };

    $scope.getFontFamily = function() {
        return getActiveProp('fontFamily').toLowerCase();
    };

    $scope.setFontFamily = function(value) {
        setActiveProp('fontFamily', value.toLowerCase());
    };

    //    set text decorations like underline/overline/linethrough
    //    function for respecttive buttons is: changeTextStyle('underline')

    $scope.changeTextStyle = function(val) {
        var text = canvas.getActiveObject();
        console.log(val);
        text[val] = !text[val];
        text.dirty = true;
        canvas.renderAll();
    }

    //	set active text family in the text listbox

    $scope.setActive = function(item, list) {
        list.some(function(item) {
            if (item.active) {
                return item.active = false;
            }
        });
        item.active = true;
    };

    $scope.getBgColor = function() {

        getCanvasActiveObjectData();
        setCanvasActiveObjectData();
        enableDisableElement();
        return getActiveProp('backgroundColor');
    };
    $scope.setBgColor = function(value) {

        setActiveProp('backgroundColor', value);
    };

    $scope.getTextBgColor = function() {
        return getActiveProp('textBackgroundColor');
    };
    $scope.setTextBgColor = function(value) {
        setActiveProp('textBackgroundColor', value);
    };

    $scope.getStroke = function() {
        return getActiveStyle('stroke');
    };
    $scope.setStroke = function(value) {
        setActiveStyle('stroke', value);
    };

    $scope.getStrokeWidth = function() {
        return getActiveStyle('strokeWidth');
    };
    $scope.setStrokeWidth = function(value) {
        setActiveStyle('strokeWidth', parseInt(value, 0));
    };

    $scope.getPropLeft = function() {
        return parseInt(getActiveProp('left'), 0) ? parseInt(getActiveProp('left'), 0) : '';
        console.log(value);
    };

    $scope.setColorInputsColor = function() {


    }
    $scope.setPropLeft = function(value) {
        setActiveProp('left', parseInt(value, 0));
        canvas.renderAll();
    };

    $scope.getPropTop = function() {
        return parseInt(getActiveProp('top'), 0) ? parseInt(getActiveProp('top'), 0) : '';
        console.log(value);
    };

    $scope.setPropTop = function(value) {
        setActiveProp('top', parseInt(value, 0));
        canvas.renderAll();
    };

    $scope.getPropWidth = function() {
        return parseInt(getActiveProp('width'), 0) ? parseInt(getActiveProp('width'), 0) : '';
        console.log(value);
    };

    $scope.setPropWidth = function(value) {
        setActiveProp('width', parseInt(value, 0));
        canvas.renderAll();
    };

    $scope.getPropHeight = function() {
        return parseInt(getActiveProp('height'), 10) ? parseInt(getActiveProp('height'), 10) : '';
        console.log(value);
    };

    $scope.setPropHeight = function(value) {
        setActiveProp('height', parseInt(value, 0));
        canvas.renderAll();
    };

    $scope.getPropAngle = function() { /// if object a=inactive return ""must implement
        if (parseFloat(getActiveProp('angle')) == 0) {
            return parseFloat(getActiveProp('angle'));
        }
        if (getActiveProp('angle')) {
            return parseFloat(getActiveProp('angle')) ? parseFloat(getActiveProp('angle')).toFixed(2) : '';
        }
        return "";

    };

    $scope.customfunc1 = function() {
        return !canvas._activeObject;
    }

    $scope.setPropAngle = function(value) {
        // value = Math.round(value)
        setActiveProp('angle', parseFloat(value.toFixed(2)));
        canvas.renderAll();
    };


    $scope.getPropScaleX = function() {
        return parseFloat(getActiveProp('scaleX')) ? parseFloat(getActiveProp('scaleX').toFixed(2)) : '';
    };

    $scope.setPropScaleX = function(value) {
        if (value) {
            setActiveProp('scaleX', parseFloat(value.toFixed(2)));
            canvas.renderAll();
        } else {
            setActiveProp('scaleX', 0);
            canvas.renderAll();
        }

    };

    $scope.getPropScaleY = function() {
        return parseFloat(getActiveProp('scaleY')) ? parseFloat(getActiveProp('scaleY').toFixed(2)) : '';
    };

    $scope.setPropScaleY = function(value) {

        if (value) {
            setActiveProp('scaleY', parseFloat(value.toFixed(2)));
            canvas.renderAll();
        } else {
            setActiveProp('scaleY', 0);
            canvas.renderAll();
        }
    };


    $scope.getRadius = function() {

        return parseInt(getActiveProp('rx'), 10) ? parseInt(getActiveProp('rx'), 10) : '';
    };

    $scope.getCornerWidth = function() {
        return parseInt(getActiveProp('rx'), 10) ? parseInt(getActiveProp('rx'), 10) : '';
        return parseInt(getActiveProp('ry'), 10) ? parseInt(getActiveProp('ry'), 10) : '';
    };
    $scope.setCornerWidth = function(value) {
        cavasObjectCorner = value;
        setActiveProp('rx', parseInt(value, 10));
        setActiveProp('ry', parseInt(value, 10));
    };

    $scope.getFontSize = function() {
        return parseInt(getActiveStyle('fontSize'), 10) ? parseInt(getActiveStyle('fontSize'), 10) : '';
    };
    $scope.setFontSize = function(value) {
        setActiveStyle('fontSize', parseInt(value, 10));
    };

    $scope.getLineHeight = function() {
        return parseInt(getActiveStyle('lineHeight'), 10) ? parseInt(getActiveStyle('lineHeight'), 10) : '';
    };
    $scope.setLineHeight = function(value) {
        setActiveStyle('lineHeight', parseFloat(value, 10));
    };
    $scope.getCharSpacing = function() {
        return parseInt(getActiveStyle('charSpacing'), 10) ? parseInt(getActiveStyle('charSpacing'), 10) : '';
    };
    $scope.setCharSpacing = function(value) {
        setActiveStyle('charSpacing', value);
    };

    $scope.getBold = function() {
        return getActiveStyle('fontWeight');
    };
    $scope.setBold = function(value) {
        setActiveStyle('fontWeight', value ? 'bold' : '');
    };

    $scope.getFontWeight = function() {
        return getActiveStyle('fontWeight');
    };
    $scope.setFontWeight = function(value) {
        setActiveStyle('fontWeight', value);
    };

    $scope.getCanvasBgColor = function() {

        if (canvasObjectFillColor) {
            document.getElementById("canvas-background-colorselect").value = canvasObjectFillColor;
        }
        if (canvas.getActiveObject() && canvas.getActiveObject().shadow && canvasObjectBackColor) {

            document.getElementById("objectIn-canvas-background-colorselect").value = canvasObjectBackColor;
            document.getElementById("canv-obj-fill-color").value = canvasObjectBackColor;
        }
        return canvas.backgroundColor;
    };


    $scope.setCanvasBgColor = function(value) {

        canvasObjectFillColor = value;
        canvas.backgroundColor = value;
        document.getElementById("select1").value = value;
        canvas.renderAll();
    };

    $scope.setCanvasObjectBgColor = function(value) {

    }

    $scope.flipX = function() {
        var obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipX', !obj.flipX);
            canvas.renderAll();
        }
    }

    $scope.flipY = function() {
        var obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipY', !obj.flipY);
            canvas.renderAll();
        }
    }

    //Testing align functions here

    $scope.alignLeft = function(e) {

        if (canvas.getActiveObject().type === 'activeSelection') {

            var myObj = canvas.getActiveObject();
            var myObjects = canvas.getActiveObjects();
            var groupWidth = myObj.getWidth();
            var groupHeight = myObj.getHeight();


            myObjects.forEachObject(function(obj) {
                var itemWidth = obj.getBoundingRect().width;
                var itemHeight = obj.getBoundingRect().height;

                obj.set({
                    left: -(groupWidth / 2),
                    originX: 'left'
                });
                obj.setCoords();
            });

        }
        console.log('align left');

        canvas.requestRenderAll();
    }


    /* Setting canvas background gradient with x/y to angle settings
     */


    $scope.addBackgroundGradient = function(leftColor, rightColor, angle) {
        var leftColor = document.getElementById('gradLeft').value;
        var rightColor = document.getElementById('gradRight').value;
        var angle = document.getElementById('canvas-angle').value;
        var offset_1 = document.getElementById('offset_1').value;
        var offset_2 = document.getElementById('offset_2').value;

        console.log(leftColor, rightColor, angle);

        var angleCoords = {
            'x1': (Math.round(50 + Math.sin(angle) * 50) * canvas.width) / 100,
            'y1': (Math.round(50 + Math.cos(angle) * 50) * canvas.height) / 100,
            'x2': (Math.round(50 + Math.sin(angle + Math.PI) * 50) * canvas.width) / 100,
            'y2': (Math.round(50 + Math.cos(angle + Math.PI) * 50) * canvas.height) / 100,
        }

        var grad = new fabric.Gradient({
            type: 'linear',
            coords: {
                x1: angleCoords.x1 || 0,
                y1: angleCoords.y1 || 0,
                x2: angleCoords.x2 || 0,
                y2: angleCoords.y2 || 0,
            },
            colorStops: [{
                    color: leftColor,
                    offset: offset_1,
                },
                {
                    color: rightColor,
                    offset: offset_2,
                }
            ]
        });
        canvas.backgroundColor = grad.toLive(canvas.contextContainer);
        canvas.renderAll();
    }

    /* Setting canvas objects gradient with x/y to angle settings
     */


    $scope.gradientify = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;
        var leftColor = document.getElementById('gradLeftO').value;
        var rightColor = document.getElementById('gradRightO').value;
        var angle = document.getElementById('canvas-angleO').value;
        /*         var offset_1 = document.getElementById('offset_1O').value;
                var offset_2 = document.getElementById('offset_2O').value; */

        var angleCoords = {
            'x1': (Math.round(50 + Math.sin(angle) * 50) * obj.width) / 100,
            'y1': (Math.round(50 + Math.cos(angle) * 50) * obj.height) / 100,
            'x2': (Math.round(50 + Math.sin(angle + Math.PI) * 50) * obj.width) / 100,
            'y2': (Math.round(50 + Math.cos(angle + Math.PI) * 50) * obj.height) / 100,
        }

        obj.setGradient('fill', {
            type: 'linear',
            x1: angleCoords.x1 || 0,
            y1: angleCoords.y1 || 0,
            x2: angleCoords.x2 || 0,
            y2: angleCoords.y2 || 0,
            colorStops: {
                0: leftColor,
                1: rightColor,
            }
        });
        canvas.renderAll();
    };



    /* Adding primitives to canvas
     */

    $scope.addRect = function() {
        var coord = getRandomLeftTop();

        var rect = (new fabric.Rect({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 250,
            height: 250,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: '0',
            strokeWidth: 0,
            includeDefaultValues: true,
            name: "Rectangle",
            icon: "content-copy"
        }));

        canvas.add(rect).setActiveObject(rect);
    };




    $scope.bgImage = function() {
        const {
            ipcRenderer
        } = require('electron')
        ipcRenderer.send('openFile', () => {})
        ipcRenderer.once('fileData', (event, filepath) => {
            fabric.Image.fromURL(filepath, function(image) {
                var hCent = canvas.height / 2;
                var wCent = canvas.width / 2;
                var myOffsetX = document.getElementById('offsetX').value;
                var myOffsetY = document.getElementById('offsetY').value;
                document.getElementById('bgButton').style.background = 'url(' + filepath + ') center center / cover';
                document.getElementById('imgIcon').style.display = 'none';
                canvas.setBackgroundImage(filepath, canvas.renderAll.bind(canvas), {
                    originX: 'center',
                    originY: 'center',
                    left: wCent,
                    top: hCent,
                    repeat: 'repeat',
                    scaleX: 1,
                    scaleY: 1
                });
            })
        })
    };

    $scope.bgPattern = function() {
        const {
            ipcRenderer
        } = require('electron')
        ipcRenderer.send('openFile', () => {})
        ipcRenderer.once('fileData', (event, filepath) => {
            fabric.Image.fromURL(filepath, function(image) {
                document.getElementById('bgPattern').style.background = 'url(' + filepath + ') center center / cover';
                document.getElementById('imgIcon2').style.display = 'none';
                canvas.setBackgroundColor({
                    source: filepath,
                    repeat: 'repeat'
                }, canvas.renderAll.bind(canvas));
            })
        })
    };

    $scope.getBgPosX = function() {
        return canvas.backgroundImage.left;
    };

    $scope.setBgPosX = function(value) {
        canvas.backgroundImage.left = canvas.width * value;
        canvas.renderAll();
    };

    $scope.getBgPosY = function() {
        return canvas.backgroundImage.top;
    };

    $scope.setBgPosY = function(value) {
        canvas.backgroundImage.top = canvas.height * value;
        canvas.renderAll();
    };

    $scope.getBgSize = function() {
        return canvas.backgroundImage.scaleX;
    };

    $scope.setBgSize = function(value) {
        canvas.backgroundImage.scaleX = value;
        canvas.backgroundImage.scaleY = value;
        canvas.renderAll();
    };

    $scope.getBgRepeat = function() {
        return canvas.backgroundColor.repeat;
    };

    $scope.setBgRepeat = function(value) {
        canvas.backgroundColor.repeat = value;
        canvas.renderAll();
    };


    $scope.resetBgImage = function() {
        document.getElementById('bgButton').style.background = null;
        document.getElementById('imgIcon').style.display = 'block';
        canvas.backgroundImage = null;
        canvas.renderAll();
    };

    $scope.resetBgPattern = function() {
        document.getElementById('bgPattern').style.background = null;
        document.getElementById('imgIcon2').style.display = 'block';
        canvas.backgroundColor = null;
        canvas.renderAll();
    };


    $scope.addRoundRect = function() {
        var coord = getRandomLeftTop();

        var roundrect = (new fabric.Rect({
            includeDefaultValues: true,
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 250,
            height: 250,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: '0',
            rx: 10,
            ry: 10,
            strokeWidth: 0,
            name: "Rounded Rectangle",
            icon: "crop-square"
        }));
        canvas.add(roundrect).setActiveObject(roundrect);
    };

    $scope.addCircle = function() {
        var coord = getRandomLeftTop();

        var circle = (new fabric.Circle({
            includeDefaultValues: true,
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            radius: 125,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: '0',
            strokeWidth: 0,
            name: "Circle",
            icon: "panorama-fish-eye"
        }));
        canvas.add(circle).setActiveObject(circle);
    };

    $scope.addTriangle = function() {
        var coord = getRandomLeftTop();

        var triangle = (new fabric.Triangle({
            includeDefaultValues: true,
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 250,
            height: 250,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: '0',
            strokeWidth: 0,
            name: "Triangle",
            icon: "details"
        }));
        canvas.add(triangle).setActiveObject(triangle);
    };

    $scope.addLine = function() {
        var coord = getRandomLeftTop();
        var line = new fabric.Line([50, 5, 200, 5], {
            includeDefaultValues: true,
            left: coord.left,
            top: coord.top,
            strokeWidth: 4,
            stroke: '#' + getRandomColor(),
            scaleX: 1,
            scaleY: 1,
            angle: '0',
            name: "Line Object",
            icon: "remove"
        });

        line.setControlsVisibility({
            bl: false,
            br: false,
            tl: false,
            tr: false,
            mt: false,
            mb: false,
        });

        canvas.add(line).setActiveObject(line);


    };


    $scope.addPolygon = function() {
        var coord = getRandomLeftTop();

        this.canvas.add(new fabric.Polygon([{
                x: 185,
                y: 0
            },
            {
                x: 250,
                y: 100
            },
            {
                x: 385,
                y: 170
            },
            {
                x: 0,
                y: 245
            }
        ], {
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor()
        }));
    };

    $scope.addText = function() {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.Text(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true
        });

        canvas.add(textSample);
    };

    $scope.addTextbox = function() {
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida orci eros, sodales imperdiet augue aliquet sed. Aenean finibus ' +
            'commodo mi a egestas. Sed quis lacinia nisl, sit amet maximus metus. Aenean nec vestibulum dolor. Aliquam vitae lectus pretium, tincidunt ' +
            'quam quis, venenatis diam. Aenean porta ipsum nisi, in bibendum lorem pretium non. Vestibulum id rhoncus velit. Morbi sit amet erat eu ' +
            'odio euismod accumsan. Aenean posuere, magna eget pellentesque mattis, velit elit vulputate mi, id egestas purus tellus quis urna. ' +
            'Duis venenatis cursus sem ornare tincidunt. Vivamus rhoncus sem sed viverra consequat.';

        var textSample = new fabric.Textbox(text.slice(0, getRandomInt(0, text.length)), {
            includeDefaultValues: true,
            fontSize: 20,
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'Arial',
            fill: '#000000',
            fontWeight: '',
            originX: 'left',
            width: 300,
            hasRotatingPoint: true,
            centerTransform: true,
            name: "Text",
            icon: "format-size",
            fontWeight: 400,
            charSpacing: '0',
            angle: '0'
        });

        canvas.add(textSample).setActiveObject(textSample);
    };

    $scope.addIText = function() {
        var text = 'Lorem ipsum dolor sit amet,\nconsectetur adipisicing elit,\nsed do eiusmod tempor incididunt\nut labore et dolore magna aliqua.\n' +
            'Ut enim ad minim veniam,\nquis nostrud exercitation ullamco\nlaboris nisi ut aliquip ex ea commodo consequat.';

        var textSample = new fabric.IText(text.slice(0, getRandomInt(0, text.length)), {
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'helvetica',
            fill: '#' + getRandomColor(),
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            originX: 'left',
            hasRotatingPoint: true,
            centerTransform: true,
        });


        canvas.add(textSample);
    };

    var addShape = function(shapeName) {

        console.log('adding shape', shapeName);

        var coord = getRandomLeftTop();

        fabric.loadSVGFromURL('../assets/' + shapeName + '.svg', function(objects, options) {

            var loadedObject = fabric.util.groupSVGElements(objects, options);

            loadedObject.set({
                    left: coord.left,
                    top: coord.top,
                    angle: getRandomInt(-10, 10)
                })
                .setCoords();

            canvas.add(loadedObject);
        });
    };

    $scope.maybeLoadShape = function(e) {
        var $el = $(e.target).closest('button.shape');
        if (!$el[0]) return;

        var id = $el.prop('id'),
            match;
        if (match = /\d+$/.exec(id)) {
            addShape(match[0]);
        }
    };


    /*
    Load Image from file system
    */


    $scope.loadImage = function() {

        const {
            ipcRenderer
        } = require('electron')
        ipcRenderer.send('openFile', () => {})
        ipcRenderer.once('fileData', (event, filepath) => {
            fabric.Image.fromURL(filepath, function(image) {

                image.set({
                    scaleX: 1,
                    scaleY: 1,
                    name: "Image",
                    icon: "photo"
                })


                canvas.add(image).setActiveObject(image);

                if (canvas && canvas._objects.length === 1) {
                    canvas.setHeight(image.height);
                    canvas.setWidth(image.width);
                }

                canvas._activeObject._element.addEventListener('rotating', () => {

                })
                canvas.setZoom(1);
            })
        })

    };


    $scope.dropImage = function() {
        var myAppModule = (function() {
            var outObj = {};

            var file, fileReader, img;
            var cImg;

            var init = function(newFile, newFileReader) {
                file = newFile;
                fileReader = newFileReader;
            };

            var onloadImage = function() {

                cImg = new fabric.Image(img, {
                    left: 0,
                    top: 0,
                    angle: 0,
                    name: "Image",
                    icon: "photo"
                });

                canvas.add(cImg).setActiveObject(cImg);
            };

            var onloadFile = function(e) {
                img = new Image();
                img.onload = onloadImage;
                img.src = fileReader.result;
            };

            outObj.init = init;
            outObj.OnloadFile = onloadFile;

            return outObj;
        })();

        function handleFileSelect(evt) {
            var files = evt.target.files;
            var output = [];
            for (var i = 0, f; f = files[i]; i++) {

                if (!f.type.match('image.*')) {
                    continue;
                }

                var reader = new FileReader();

                myAppModule.init(f, reader);

                reader.onload = myAppModule.OnloadFile;

                reader.readAsDataURL(f);

            }
        }
    };


    /*
    drag and drop images here with electron
    */

    var holder = document.getElementById('wrapper');
    holder.ondragover = function() {
        return false;
    };
    holder.ondragleave = holder.ondragend = function() {
        return false;
    };
    holder.ondrop = function(e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        console.log('File you dragged here is', file.path);
        fabric.Image.fromURL(file.path, function(image) {

            image.set({
                left: 20,
                top: 20
            })


            canvas.add(image);
        });
        return false;
    };

    //-----------------

    /*
    define keycodes
    */

    function dlKeyCode() {
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs) {
                $element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode == $attrs.code) {
                        $scope.$apply(function() {
                            $scope.$eval($attrs.dlKeyCode, {
                                $event: event
                            });
                        });

                    }
                });
            }
        };
    };


    function addImage(imageName) {
        var coord = getRandomLeftTop();

        fabric.Image.fromURL(file.path, function(image) {

            image.set({
                    left: coord.left,
                    top: coord.top,
                    angle: getRandomInt(-10, 10)
                })
                .scale(getRandomNum(minScale, maxScale))
                .setCoords();

            canvas.add(image);
        });
    };

    $scope.addImage1 = function() {
        addImage('fab.png', 0.1, 0.25);
    };


    $scope.addImage2 = function() {
        addImage('logo.png', 0.1, 1);
    };

    $scope.addImage3 = function() {
        addImage('printio.png', 0.5, 0.75);
    };

    $scope.confirmClear = function() {
        if (confirm('Are you sure?')) {
            canvas.clear();
        }
    };

    $scope.rasterize = function() {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('This browser doesn\'t provide means to serialize canvas to an image');
        } else {
            window.open(canvas.toDataURL('png'));
        }
    };

    $scope.rasterizeSVG = function() {
        window.open(
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(canvas.toSVG()));
    };

    $scope.rasterizeJSON = function() {
        $scope.setConsoleJSON(JSON.stringify(canvas));
    };

    $scope.getSelected = function() {
        return canvas.getActiveObject();
    };

    $scope.removeSelected = function() {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();

        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function(object) {
                canvas.remove(object);
            });
        } else if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    $scope.getHorizontalLock = function() {
        return getActiveProp('lockMovementX');
    };
    $scope.setHorizontalLock = function(value) {
        setActiveProp('lockMovementX', value);
    };

    $scope.getVerticalLock = function() {
        return getActiveProp('lockMovementY');
    };
    $scope.setVerticalLock = function(value) {
        setActiveProp('lockMovementY', value);
    };

    $scope.getScaleLockX = function() {
            return getActiveProp('lockScalingX');
        },
        $scope.setScaleLockX = function(value) {
            setActiveProp('lockScalingX', value);
        };

    $scope.getScaleLockY = function() {
        return getActiveProp('lockScalingY');
    };
    $scope.setScaleLockY = function(value) {
        setActiveProp('lockScalingY', value);
    };

    $scope.getRotationLock = function() {
        return getActiveProp('lockRotation');
    };
    $scope.setRotationLock = function(value) {
        setActiveProp('lockRotation', value);
    };


    $scope.getOriginX = function() {
        return getActiveProp('originX');
    };

    $scope.setOriginX = function(value) {
        setActiveProp('originX', value);
    };

    $scope.getOriginY = function() {
        return getActiveProp('originY');
    };
    $scope.setOriginY = function(value) {
        setActiveProp('originY', value);
    };


    $scope.getObjectCaching = function() {
        return getActiveProp('objectCaching');
    };

    $scope.setObjectCaching = function(value) {
        return setActiveProp('objectCaching', value);
    };

    $scope.getNoScaleCache = function() {
        return getActiveProp('noScaleCache');
    };

    $scope.setNoScaleCache = function(value) {
        return setActiveProp('noScaleCache', value);
    };

    $scope.getTransparentCorners = function() {
        return getActiveProp('transparentCorners');
    };

    $scope.setTransparentCorners = function(value) {
        return setActiveProp('transparentCorners', value);
    };

    $scope.getHasBorders = function() {
        return getActiveProp('hasBorders');
    };

    $scope.setHasBorders = function(value) {
        return setActiveProp('hasBorders', value);
    };

    $scope.getHasControls = function() {
        return getActiveProp('hasControls');
    };

    $scope.setHasControls = function(value) {
        return setActiveProp('hasControls', value);
    };

    $scope.sendBackwards = function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendBackwards(activeObject);
        }
    };

    $scope.sendToBack = function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
        }
    };

    $scope.bringForward = function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
        }
    };

    $scope.bringToFront = function() {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
        }
    };

    var pattern = new fabric.Pattern({
        source: 'images/escheresque.png',
        repeat: 'repeat'
    });

    $scope.patternify = function() {
        var obj = canvas.getActiveObject();

        if (!obj) return;

        if (obj.fill instanceof fabric.Pattern) {
            obj.set('fill', null);
        } else {
            if (obj instanceof fabric.PathGroup) {
                obj.getObjects().forEach(function(o) {
                    o.set('fill', pattern);
                });
            } else {
                obj.set('fill', pattern);
            }
        }
        canvas.renderAll();
    };

    $scope.clip = function() {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.clipTo) {
            obj.clipTo = null;
        } else {
            var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
            obj.clipTo = function(ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            };
        }
        canvas.renderAll();
    };


    /*     $scope.gradientify = function() {
            var obj = canvas.getActiveObject();
            if (!obj) return;

            obj.setGradient('fill', {
                x1: 0,
                y1: 0,
                x2: (getRandomInt(0, 1) ? 0 : obj.width),
                y2: (getRandomInt(0, 1) ? 0 : obj.height),
                colorStops: {
                    0: '#' + getRandomColor(),
                    1: '#' + getRandomColor()
                }
            });
            canvas.renderAll();
        }; */

    $scope.execute = function() {
        if (!(/^\s+$/).test(consoleValue)) {
            eval(consoleValue);
        }
    };


    $scope.getConsoleJSON = function() {
        return consoleJSONValue;
    };
    $scope.setConsoleJSON = function(value) {
        consoleJSONValue = value;
    };
    $scope.getConsoleSVG = function() {
        return consoleSVGValue;
    };
    $scope.setConsoleSVG = function(value) {
        consoleSVGValue = value;
    };
    $scope.getConsole = function() {
        return consoleValue;
    };
    $scope.setConsole = function(value) {
        consoleValue = value;
    };

    $scope.loadSVGWithoutGrouping = function() {
        _loadSVGWithoutGrouping(consoleSVGValue);
    };
    $scope.loadSVG = function() {
        _loadSVG(consoleSVGValue);
    };

    var _loadSVG = function(svg) {
        fabric.loadSVGFromString(svg, function(objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).centerObject(obj).renderAll();
            obj.setCoords();
        });
    };

    var _loadSVGWithoutGrouping = function(svg) {
        fabric.loadSVGFromString(svg, function(objects) {
            canvas.add.apply(canvas, objects);
            canvas.renderAll();
        });
    };

    $scope.saveJSON = function() {
        _saveJSON(JSON.stringify(canvas));
    };

    var _saveJSON = function(json) {
        $scope.setConsoleJSON(json);
    };

    $scope.loadJSON = function() {
        _loadJSON(consoleJSONValue);
    };

    var _loadJSON = function(json) {
        canvas.loadFromJSON(json, function() {
            canvas.renderAll();
        });
    };

    function initCustomization() {
        if (typeof Cufon !== 'undefined' && Cufon.fonts.delicious) {
            Cufon.fonts.delicious.offsetLeft = 75;
            Cufon.fonts.delicious.offsetTop = 25;
        }

        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
            fabric.Object.prototype.cornerSize = 30;
        }

        fabric.Object.prototype.transparentCorners = false;

        if (document.location.search.indexOf('guidelines') > -1) {
            initCenteringGuidelines(canvas);
            initAligningGuidelines(canvas);
        }
    }

    //	initCustomization();


    $scope.getPreserveObjectStacking = function() {
        return canvas.preserveObjectStacking;
    };
    $scope.setPreserveObjectStacking = function(value) {
        return canvas.preserveObjectStacking = value;
    };

    $scope.getFreeDrawingMode = function() {
        return canvas.isDrawingMode;
    };
    $scope.setFreeDrawingMode = function(value) {
        canvas.isDrawingMode = !!value;
        $scope.$$phase || $scope.$digest();
    };

    $scope.freeDrawingMode = 'Pencil';

    $scope.getDrawingMode = function() {
        return $scope.freeDrawingMode;
    };
    $scope.setDrawingMode = function(type) {
        $scope.freeDrawingMode = type;

        if (type === 'hline') {
            canvas.freeDrawingBrush = $scope.vLinePatternBrush;
        } else if (type === 'vline') {
            canvas.freeDrawingBrush = $scope.hLinePatternBrush;
        } else if (type === 'square') {
            canvas.freeDrawingBrush = $scope.squarePatternBrush;
        } else if (type === 'diamond') {
            canvas.freeDrawingBrush = $scope.diamondPatternBrush;
        } else if (type === 'texture') {
            canvas.freeDrawingBrush = $scope.texturePatternBrush;
        } else {
            canvas.freeDrawingBrush = new fabric[type + 'Brush'](canvas);
        }

        $scope.$$phase || $scope.$digest();
    };

    $scope.getDrawingLineWidth = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.width;
        }
    };
    $scope.setDrawingLineWidth = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
        }
    };

    $scope.getDrawingLineColor = function() {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.color;
        }
    };
    $scope.setDrawingLineColor = function(value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    $scope.getDrawingLineShadowWidth = function() {
        if (canvas.freeDrawingBrush && canvas.freeDrawingBrush.shadow) {
            return canvas.freeDrawingBrush.shadow.blur || 1;
        } else {
            return 0
        }
    };

    $scope.setDrawingLineShadowWidth = function(value) {
        if (canvas.freeDrawingBrush) {
            var blur = parseInt(value, 10) || 1;
            if (blur > 0) {
                canvas.freeDrawingBrush.shadow = new fabric.Shadow({
                    blur: blur,
                    offsetX: 10,
                    offsetY: 10
                });
            } else {
                canvas.freeDrawingBrush.shadow = null;
            }
        }
    };

    function initBrushes() {
        if (!fabric.PatternBrush) return;

        initVLinePatternBrush();
        initHLinePatternBrush();
        initSquarePatternBrush();
        initDiamondPatternBrush();
        initImagePatternBrush();
    }

    initBrushes();

    function initImagePatternBrush() {
        var img = new Image();
        img.src = 'images/honey_im_subtle.png';

        $scope.texturePatternBrush = new fabric.PatternBrush(canvas);
        $scope.texturePatternBrush.source = img;
    }

    function initDiamondPatternBrush() {
        $scope.diamondPatternBrush = new fabric.PatternBrush(canvas);
        $scope.diamondPatternBrush.getPatternSrc = function() {

            var squareWidth = 10,
                squareDistance = 5;
            var patternCanvas = fabric.document.createElement('canvas');
            var rect = new fabric.Rect({
                width: squareWidth,
                height: squareWidth,
                angle: 45,
                fill: this.color
            });

            var canvasWidth = rect.getBoundingRectWidth();

            patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
            rect.set({
                left: canvasWidth / 2,
                top: canvasWidth / 2
            });

            var ctx = patternCanvas.getContext('2d');
            rect.render(ctx);

            return patternCanvas;
        };
    }

    function initSquarePatternBrush() {
        $scope.squarePatternBrush = new fabric.PatternBrush(canvas);
        $scope.squarePatternBrush.getPatternSrc = function() {

            var squareWidth = 10,
                squareDistance = 2;

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
            var ctx = patternCanvas.getContext('2d');

            ctx.fillStyle = this.color;
            ctx.fillRect(0, 0, squareWidth, squareWidth);

            return patternCanvas;
        };
    }

    function initVLinePatternBrush() {
        $scope.vLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.vLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(0, 5);
            ctx.lineTo(10, 5);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }

    function initHLinePatternBrush() {
        $scope.hLinePatternBrush = new fabric.PatternBrush(canvas);
        $scope.hLinePatternBrush.getPatternSrc = function() {

            var patternCanvas = fabric.document.createElement('canvas');
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext('2d');

            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(5, 0);
            ctx.lineTo(5, 10);
            ctx.closePath();
            ctx.stroke();

            return patternCanvas;
        };
    }
}

function watchCanvas($scope) {

    function updateScope() {
        $scope.$$phase || $scope.$digest();
        canvas.renderAll();
    }

    canvas
        .on('object:selected', updateScope)
        .on('group:selected', updateScope)
        .on('path:created', updateScope)
        .on('selection:cleared', updateScope);
}