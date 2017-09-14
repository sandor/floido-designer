//		var kitchensink = {};
//		var canvas = new fabric.Canvas('canvas', {
//			backgroundColor: "#FFFFFF",
//			selectionColor: "rgba(0, 108, 223, 0.05)",
//			selectionBorderColor: "rgba(0, 108, 223, 0.3)",
//			selectionDashArray: [2, 2]
//		});
//		initAligningGuidelines(canvas);
//		initCenteringGuidelines(canvas);

//dumb test with filters
function addFilters($scope) {

    // manually initialize 2 filter backend to give ability to switch:
    var webglBackend = new fabric.WebglFilterBackend();
    var canvas2dBackend = new fabric.Canvas2dFilterBackend()

    fabric.filterBackend = webglBackend;
    var $ = function (id) {
        return document.getElementById(id)
    };

    function applyFilter(index, filter) {
        var obj = canvas.getActiveObject();
        obj.filters[index] = filter;
        var timeStart = +new Date();
        obj.applyFilters();
        var timeEnd = +new Date();
        var dimString = canvas.getActiveObject().width + ' x ' +
            canvas.getActiveObject().height;
        $('bench').innerHTML = dimString + 'px ' +
            parseFloat(timeEnd - timeStart) + 'ms';
        canvas.renderAll();
    }

    function getFilter(index) {
        var obj = canvas.getActiveObject();
        return obj.filters[index];
    }

    function applyFilterValue(index, prop, value) {
        var obj = canvas.getActiveObject();
        if (obj.filters[index]) {
            obj.filters[index][prop] = value;
            var timeStart = +new Date();
            obj.applyFilters();
            var timeEnd = +new Date();
            var dimString = canvas.getActiveObject().width + ' x ' +
                canvas.getActiveObject().height;
            $('bench').innerHTML = dimString + 'px ' +
                parseFloat(timeEnd - timeStart) + 'ms';
            canvas.renderAll();
        }
    }

    fabric.Object.prototype.padding = 5;
    fabric.Object.prototype.transparentCorners = false;

    f = fabric.Image.filters;

    canvas.on({
        'object:selected': function () {


            var filters = ['grayscale', 'invert', 'remove-color', 'sepia', 'brownie',
							'brightness', 'contrast', 'saturation', 'noise', 'vintage',
							'pixelate', 'blur', 'sharpen', 'emboss', 'technicolor',
							'polaroid', 'blend-color', 'gamma', 'kodachrome',
							'blackwhite', 'blend-image', 'hue'
						];

            for (var i = 0; i < filters.length; i++) {
                filters[i] && (
                    $(filters[i]).checked = !!canvas.getActiveObject().filters[i]);
            }
        },

    });

    fabric.Image.fromURL('images/woman.png', function (img) {
        var oImg = img.set({
            left: 0,
            top: 0
        }).scale(1);
        canvas.add(oImg);
    });
    var indexF;
    $scope.webgl = function () {
        if (this.checked) {
            fabric.filterBackend = webglBackend;
        } else {
            fabric.filterBackend = canvas2dBackend;
        }
    };
    $scope.brownie = function () {
        applyFilter(4, this.checked && new f.Brownie());
    };
    $scope.vintage = function () {
        applyFilter(9, this.checked && new f.Vintage());
    };
    $('technicolor').onclick = function () {
        applyFilter(14, this.checked && new f.Technicolor());
    };
    $('polaroid').onclick = function () {
        applyFilter(15, this.checked && new f.Polaroid());
    };
    $('kodachrome').onclick = function () {
        applyFilter(18, this.checked && new f.Kodachrome());
    };
    $('blackwhite').onclick = function () {
        applyFilter(19, this.checked && new f.BlackWhite());
    };
    $('grayscale').onclick = function () {
        applyFilter(0, this.checked && new f.Grayscale());
    };
    $('average').onclick = function () {
        applyFilterValue(0, 'mode', 'average');
    };
    $('luminosity').onclick = function () {
        applyFilterValue(0, 'mode', 'luminosity');
    };
    $('lightness').onclick = function () {
        applyFilterValue(0, 'mode', 'lightness');
    };
    $('invert').onclick = function () {
        applyFilter(1, this.checked && new f.Invert());
    };
    $('sepia').onclick = function () {
        applyFilter(3, this.checked && new f.Sepia());
    };
    $('brightness').onclick = function () {
        applyFilter(5, this.checked && new f.Brightness({
            brightness: parseFloat($('brightness-value').value)
        }));
    };
    $('brightness-value').oninput = function () {
        applyFilterValue(5, 'brightness', parseFloat(this.value));
    };
    $('contrast').onclick = function () {
        applyFilter(6, this.checked && new f.Contrast({
            contrast: parseFloat($('contrast-value').value)
        }));
    };
    $('contrast-value').oninput = function () {
        applyFilterValue(6, 'contrast', parseFloat(this.value));
    };
    $('saturation').onclick = function () {
        applyFilter(7, this.checked && new f.Saturation({
            saturation: parseFloat($('saturation-value').value)
        }));
    };
    $('saturation-value').oninput = function () {
        applyFilterValue(7, 'saturation', parseFloat(this.value));
    };
    $('noise').onclick = function () {
        applyFilter(8, this.checked && new f.Noise({
            noise: parseInt($('noise-value').value, 10)
        }));
    };
    $('noise-value').oninput = function () {
        applyFilterValue(8, 'noise', parseInt(this.value, 10));
    };
    $('blur').onclick = function () {
        applyFilter(11, this.checked && new f.Blur({
            value: parseFloat($('blur-value').value)
        }));
    };
    $('blur-value').oninput = function () {
        applyFilterValue(11, 'blur', parseFloat(this.value, 10));
    };

    $('blend').onclick = function () {
        applyFilter(16, this.checked && new f.BlendColor({
            color: document.getElementById('blend-color').value,
            mode: document.getElementById('blend-mode').value,
            alpha: document.getElementById('blend-alpha').value
        }));
    };

    $('blend-mode').onchange = function () {
        applyFilterValue(16, 'mode', this.value);
    };

    $('blend-color').onchange = function () {
        applyFilterValue(16, 'color', this.value);
    };

    $('blend-alpha').oninput = function () {
        applyFilterValue(16, 'alpha', this.value);
    };

    $('hue').onclick = function () {
        applyFilter(21, this.checked && new f.HueRotation({
            rotation: document.getElementById('hue-value').value,
        }));
    };

    $('hue-value').oninput = function () {
        applyFilterValue(21, 'rotation', this.value);
    };

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

//function copy() {
//    canvas.getActiveObject().clone(function (cloned) {
//        _clipboard = cloned;
//    });
//}




var customProperties = 'name icon'.split(' ');

function copy() {
    canvas.getActiveObject().clone(function (cloned) {
        console.log(cloned);
        _clipboard = cloned;
    }, customProperties);
}

//function paste() {
//    _clipboard.clone(function (clonedObj) {
//        canvas.discardActiveObject();
//        clonedObj.set({
//            left: clonedObj.left + 10,
//            top: clonedObj.top + 10,
//            evented: true,
//            name: clonedObj.name,
//            icon: clonedObj.icon,
//        });
//        if (clonedObj.type === 'activeSelection') {
//            clonedObj.canvas = canvas;
//            clonedObj.forEachObject(function (obj) {
//                canvas.add(obj);
//            });
//            clonedObj.setCoords();
//        } else {
//            canvas.add(clonedObj);
//        }
//        canvas.setActiveObject(clonedObj);
//        canvas.requestRenderAll();
//    });
//}

function paste() {
    var clonedObj = _clipboard;
    console.log(clonedObj);
    canvas.discardActiveObject();
    clonedObj.set({
        left: clonedObj.left + 10,
        top: clonedObj.top + 10,
        evented: true,
    });
    if (clonedObj.type === 'activeSelection') {
        clonedObj.canvas = canvas;
        clonedObj.forEachObject(function (obj) {
            canvas.add(obj);
        });
        clonedObj.setCoords();
    } else {
        canvas.add(clonedObj);
    }
    canvas.setActiveObject(clonedObj);
    canvas.renderAll();
}

function remove() {
    var activeObject = canvas.getActiveObject(),
        activeGroup = canvas.getActiveObject().type !== 'group';

    if (activeGroup) {
        var objectsInGroup = canvas.getActiveObjects();
        objectsInGroup.forEach(function (object) {
            canvas.remove(object);
        });
    } else if (activeObject) {
        canvas.remove(activeObject);
    }
    canvas.discardActiveObject();
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
    var object = canvas.getActiveObject();
    if (!object) return '';

    return object[name] || '';
}

function setActiveShadow(name, value) {

    var object = canvas.getActiveObject();
    if (!object) return;
    if (object.shadow)
        object.shadow[name] = value;
    else {
        var ob = {};
        ob[name] = value;
        object.setShadow(ob);
    }

    object.setCoords();
}






///////////

function addAccessors($scope) {

    //////////////////


    var offsetXVal = 10;
    $scope.setShadowOffsetX = function (value) {
        value = offsetXVal += 5;
        setActiveShadow('offsetX', value);
        canvas.renderAll();
    };

    var offsetYVal = 10;
    $scope.setShadowOffsetY = function (value) {
        value = offsetYVal += 5;
        setActiveShadow('offsetY', value);
        canvas.renderAll();
    };
    //var offBlurVal = 10;
    $scope.setShadowBlur = function (value) {
        //    value =  offBlurVal += 5;
        setActiveShadow('blur', value);
        canvas.renderAll();
    };

    $scope.setShadowColor = function (value) {
        value = 'black';
        setActiveShadow('color', value);
        canvas.renderAll();
    };

    $scope.shadowify = function () {
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
        function () {
            return getActiveStyle('opacity') * 100;
        };
    $scope.setOpacity = function (value) {
        setActiveStyle('opacity', parseInt(value, 10) / 100);
    };

    $scope.getFill = function () {
        return getActiveStyle('fill');
    };
    $scope.setFill = function (value) {
        setActiveStyle('fill', value);
    };

    $scope.isBold = function () {
        return getActiveStyle('fontWeight') === 'bold';
    };
    $scope.toggleBold = function () {
        setActiveStyle('fontWeight',
            getActiveStyle('fontWeight') === 'bold' ? '' : 'bold');
    };
    $scope.isItalic = function () {
        return getActiveStyle('fontStyle') === 'italic';
    };
    $scope.toggleItalic = function () {
        setActiveStyle('fontStyle',
            getActiveStyle('fontStyle') === 'italic' ? '' : 'italic');
    };

    $scope.isUnderline = function () {
        return getActiveStyle('textDecoration').indexOf('underline') > -1;
    };
    $scope.toggleUnderline = function () {
        var value = $scope.isUnderline() ? getActiveStyle('textDecoration').replace('underline', '') : (getActiveStyle('textDecoration') + ' underline');

        setActiveStyle('textDecoration', value);
    };

    $scope.isLinethrough = function () {
        return getActiveStyle('textDecoration').indexOf('line-through') > -1;
    };
    $scope.toggleLinethrough = function () {
        var value = $scope.isLinethrough() ? getActiveStyle('textDecoration').replace('line-through', '') : (getActiveStyle('textDecoration') + ' line-through');

        setActiveStyle('textDecoration', value);
    };
    $scope.isOverline = function () {
        return getActiveStyle('textDecoration').indexOf('overline') > -1;
    };
    $scope.toggleOverline = function () {
        var value = $scope.isOverline() ? getActiveStyle('textDecoration').replace('overline', '') : (getActiveStyle('textDecoration') + ' overline');

        setActiveStyle('textDecoration', value);
    };

    $scope.getText = function () {
        return getActiveProp('text');
    };
    $scope.setText = function (value) {
        setActiveProp('text', value);
    };

    $scope.getTextAlign = function () {
        return capitalize(getActiveProp('textAlign'));
    };
    $scope.setTextAlign = function (value) {
        setActiveProp('textAlign', value.toLowerCase());
    };

    $scope.getFontFamily = function () {
        return getActiveProp('fontFamily').toLowerCase();
    };
    $scope.setFontFamily = function (value) {
        setActiveProp('fontFamily', value.toLowerCase());
    };

    $scope.getBgColor = function () {
        return getActiveProp('backgroundColor');
    };
    $scope.setBgColor = function (value) {
        setActiveProp('backgroundColor', value);
    };

    $scope.getTextBgColor = function () {
        return getActiveProp('textBackgroundColor');
    };
    $scope.setTextBgColor = function (value) {
        setActiveProp('textBackgroundColor', value);
    };

    $scope.getStroke = function () {
        return getActiveStyle('stroke');
    };
    $scope.setStroke = function (value) {
        setActiveStyle('stroke', value);
    };

    $scope.getStrokeWidth = function () {
        return getActiveStyle('strokeWidth');
    };
    $scope.setStrokeWidth = function (value) {
        setActiveStyle('strokeWidth', parseInt(value, 10));
    };

    $scope.getPropLeft = function () {
        return getActiveProp('left');
        console.log(value);
    };
    $scope.setPropLeft = function (value) {
        setActiveProp('left', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropTop = function () {
        return getActiveProp('top');
        console.log(value);
    };

    $scope.setPropTop = function (value) {
        setActiveProp('top', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropWidth = function () {
        return getActiveProp('width');
        console.log(value);
    };

    $scope.setPropWidth = function (value) {
        setActiveProp('width', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropHeight = function () {
        return getActiveProp('height');
        console.log(value);
    };

    $scope.setPropHeight = function (value) {
        setActiveProp('height', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropAngle = function () {
        return getActiveProp('angle');
        console.log(value);
    };

    $scope.setPropAngle = function (value) {
        setActiveProp('angle', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropScaleX = function () {
        return getActiveProp('scaleX');
    };

    $scope.setPropScaleX = function (value) {
        setActiveProp('scaleX', parseInt(value, 10));
        canvas.renderAll();
    };

    $scope.getPropScaleY = function () {
        return getActiveProp('scaleY');
    };

    $scope.setPropScaleY = function (value) {
        setActiveProp('scaleY', parseInt(value, 10));
        canvas.renderAll();
    };


    $scope.getRadius = function () {
        return getActiveProp('rx');
    };

    $scope.getCornerWidth = function () {
        return getActiveProp('rx');
        return getActiveProp('ry');
    };
    $scope.setCornerWidth = function (value) {
        setActiveProp('rx', parseInt(value, 10));
        setActiveProp('ry', parseInt(value, 10));
    };

    $scope.getFontSize = function () {
        return getActiveStyle('fontSize');
    };
    $scope.setFontSize = function (value) {
        setActiveStyle('fontSize', parseInt(value, 10));
    };

    $scope.getLineHeight = function () {
        return getActiveStyle('lineHeight');
    };
    $scope.setLineHeight = function (value) {
        setActiveStyle('lineHeight', parseFloat(value, 10));
    };
    $scope.getCharSpacing = function () {
        return getActiveStyle('charSpacing');
    };
    $scope.setCharSpacing = function (value) {
        setActiveStyle('charSpacing', value);
    };

    $scope.getBold = function () {
        return getActiveStyle('fontWeight');
    };
    $scope.setBold = function (value) {
        setActiveStyle('fontWeight', value ? 'bold' : '');
    };

    $scope.getCanvasBgColor = function () {
        return canvas.backgroundColor;
        console.log(value);
    };
    $scope.setCanvasBgColor = function (value) {
        canvas.backgroundColor = value;
        console.log(value);
        canvas.renderAll();
    };


    $scope.flipX = function () {
        var obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipX', !obj.flipX);
            canvas.renderAll();
        }
    }

    $scope.flipY = function () {
        var obj = canvas.getActiveObject();
        if (obj) {
            obj.set('flipY', !obj.flipY);
            canvas.renderAll();
        }
    }

    //Testing align functions here

    $scope.alignLeft = function (e) {

        if (canvas.getActiveObject().type === 'activeSelection') {

            var myObj = canvas.getActiveObject();
            var myObjects = canvas.getActiveObjects();
            var groupWidth = myObj.getWidth();
            var groupHeight = myObj.getHeight();


            myObjects.forEachObject(function (obj) {
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

    $scope.addGradient = function (left, right) {
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

    $scope.addRect = function () {
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
            angle: 0,
            strokeWidth: 0,
            includeDefaultValues: true,
            name: "Rectangle",
            icon: "content-copy"
        }));

        canvas.add(rect).setActiveObject(rect);
    };


    $scope.bgImage = function () {
        const {
            ipcRenderer
        } = require('electron')
        ipcRenderer.send('openFile', () => {})
        ipcRenderer.once('fileData', (event, filepath) => {
            fabric.Image.fromURL(filepath, function (image) {
                var hCent = canvas.getHeight / 2;
                var wCent = canvas.getWidth / 2;
                canvas.setBackgroundColor({
                    source: filepath,
                    repeat: 'no-repeat'
                }, canvas.renderAll.bind(canvas));
            })
        })
    };



    $scope.resetBgImage = function () {

        if (canvas.backgroundColor instanceof fabric.Pattern) {
            canvas.setBackgroundColor('#ffffff', canvas.renderAll.bind(canvas));
        } else {

        }

    };


    $scope.addRoundRect = function () {
        var coord = getRandomLeftTop();

        var roundrect = (new fabric.Rect({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 250,
            height: 250,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            rx: 10,
            ry: 10,
            strokeWidth: 0,
            name: "Rounded Rectangle",
            icon: "crop-square"
        }));
        canvas.add(roundrect).setActiveObject(roundrect);
    };

    $scope.addCircle = function () {
        var coord = getRandomLeftTop();

        var circle = (new fabric.Circle({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            radius: 125,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            strokeWidth: 0,
            name: "Circle",
            icon: "panorama-fish-eye"
        }));
        canvas.add(circle).setActiveObject(circle);
    };

    $scope.addTriangle = function () {
        var coord = getRandomLeftTop();

        var triangle = (new fabric.Triangle({
            left: coord.left,
            top: coord.top,
            fill: '#' + getRandomColor(),
            width: 250,
            height: 250,
            opacity: 1,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            strokeWidth: 0,
            name: "Triangle",
            icon: "details"
        }));
        canvas.add(triangle).setActiveObject(triangle);
    };

    $scope.addLine = function () {
        var coord = getRandomLeftTop();
        var line = new fabric.Line([50, 5, 200, 5], {
            left: coord.left,
            top: coord.top,
            strokeWidth: 4,
            stroke: '#' + getRandomColor(),
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            name: "Line Object",
            icon: "remove"
        });

        /*		canvas.add(new fabric.Line([50, 5, 200, 5], {
        			left: coord.left,
        			top: coord.top,
        			strokeWidth: 10,
        			stroke: '#' + getRandomColor()
        		}));*/

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




    $scope.addPolygon = function () {
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

    $scope.addText = function () {
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

    $scope.addTextbox = function () {
        var text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida orci eros, sodales imperdiet augue aliquet sed. Aenean finibus ' +
            'commodo mi a egestas. Sed quis lacinia nisl, sit amet maximus metus. Aenean nec vestibulum dolor. Aliquam vitae lectus pretium, tincidunt ' +
            'quam quis, venenatis diam. Aenean porta ipsum nisi, in bibendum lorem pretium non. Vestibulum id rhoncus velit. Morbi sit amet erat eu ' +
            'odio euismod accumsan. Aenean posuere, magna eget pellentesque mattis, velit elit vulputate mi, id egestas purus tellus quis urna. ' +
            'Duis venenatis cursus sem ornare tincidunt. Vivamus rhoncus sem sed viverra consequat.';


        var textSample = new fabric.Textbox(text.slice(0, getRandomInt(0, text.length)), {
            fontSize: 20,
            left: getRandomInt(350, 400),
            top: getRandomInt(350, 400),
            fontFamily: 'roboto',
            fill: '#000000',
            fontWeight: '',
            originX: 'left',
            width: 300,
            hasRotatingPoint: true,
            centerTransform: true,
            name: "Text",
            icon: "format-size"
        });

        canvas.add(textSample).setActiveObject(textSample);
    };

    $scope.addIText = function () {
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

    var addShape = function (shapeName) {

        console.log('adding shape', shapeName);

        var coord = getRandomLeftTop();

        fabric.loadSVGFromURL('../assets/' + shapeName + '.svg', function (objects, options) {

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

    $scope.maybeLoadShape = function (e) {
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


    $scope.loadImage = function () {

        const {
            ipcRenderer
        } = require('electron')
        ipcRenderer.send('openFile', () => {})
        ipcRenderer.once('fileData', (event, filepath) => {
            fabric.Image.fromURL(filepath, function (image) {

                image.set({
                    scaleX: 0.5,
                    scaleY: 0.5,
                    name: "Image",
                    icon: "photo"
                })


                canvas.add(image).setActiveObject(image);
            })
        })

    };



    $scope.dropImage = function () {
        var myAppModule = (function () {
            var outObj = {};

            var file, fileReader, img;
            var cImg;

            var init = function (newFile, newFileReader) {
                file = newFile;
                fileReader = newFileReader;
            };

            var onloadImage = function () {

                cImg = new fabric.Image(img, {
                    left: 0,
                    top: 0,
                    angle: 0,
                    name: "Image",
                    icon: "photo"
                });

                canvas.add(cImg).setActiveObject(cImg);
            };

            var onloadFile = function (e) {
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
    holder.ondragover = function () {
        return false;
    };
    holder.ondragleave = holder.ondragend = function () {
        return false;
    };
    holder.ondrop = function (e) {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        console.log('File you dragged here is', file.path);
        fabric.Image.fromURL(file.path, function (image) {

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
            link: function ($scope, $element, $attrs) {
                $element.bind("keypress", function (event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode == $attrs.code) {
                        $scope.$apply(function () {
                            $scope.$eval($attrs.dlKeyCode, {
                                $event: event
                            });
                        });

                    }
                });
            }
        };
    };


    //-----

    function addImage(imageName) {
        var coord = getRandomLeftTop();

        fabric.Image.fromURL(file.path, function (image) {

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

    $scope.addImage1 = function () {
        addImage('fab.png', 0.1, 0.25);
    };



    $scope.addImage2 = function () {
        addImage('logo.png', 0.1, 1);
    };

    $scope.addImage3 = function () {
        addImage('printio.png', 0.5, 0.75);
    };

    $scope.confirmClear = function () {
        if (confirm('Are you sure?')) {
            canvas.clear();
        }
    };

    $scope.rasterize = function () {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('This browser doesn\'t provide means to serialize canvas to an image');
        } else {
            window.open(canvas.toDataURL('png'));
        }
    };

    $scope.rasterizeSVG = function () {
        window.open(
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(canvas.toSVG()));
    };

    $scope.rasterizeJSON = function () {
        $scope.setConsoleJSON(JSON.stringify(canvas));
    };

    $scope.getSelected = function () {
        return canvas.getActiveObject();
    };

    $scope.removeSelected = function () {
        var activeObject = canvas.getActiveObject(),
            activeGroup = canvas.getActiveGroup();

        if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                canvas.remove(object);
            });
        } else if (activeObject) {
            canvas.remove(activeObject);
        }
    };

    $scope.getHorizontalLock = function () {
        return getActiveProp('lockMovementX');
    };
    $scope.setHorizontalLock = function (value) {
        setActiveProp('lockMovementX', value);
    };

    $scope.getVerticalLock = function () {
        return getActiveProp('lockMovementY');
    };
    $scope.setVerticalLock = function (value) {
        setActiveProp('lockMovementY', value);
    };

    $scope.getScaleLockX = function () {
            return getActiveProp('lockScalingX');
        },
        $scope.setScaleLockX = function (value) {
            setActiveProp('lockScalingX', value);
        };

    $scope.getScaleLockY = function () {
        return getActiveProp('lockScalingY');
    };
    $scope.setScaleLockY = function (value) {
        setActiveProp('lockScalingY', value);
    };

    $scope.getRotationLock = function () {
        return getActiveProp('lockRotation');
    };
    $scope.setRotationLock = function (value) {
        setActiveProp('lockRotation', value);
    };



    $scope.getOriginX = function () {
        return getActiveProp('originX');
    };

    $scope.setOriginX = function (value) {
        setActiveProp('originX', value);
    };

    $scope.getOriginY = function () {
        return getActiveProp('originY');
    };
    $scope.setOriginY = function (value) {
        setActiveProp('originY', value);
    };



    $scope.getObjectCaching = function () {
        return getActiveProp('objectCaching');
    };

    $scope.setObjectCaching = function (value) {
        return setActiveProp('objectCaching', value);
    };

    $scope.getNoScaleCache = function () {
        return getActiveProp('noScaleCache');
    };

    $scope.setNoScaleCache = function (value) {
        return setActiveProp('noScaleCache', value);
    };

    $scope.getTransparentCorners = function () {
        return getActiveProp('transparentCorners');
    };

    $scope.setTransparentCorners = function (value) {
        return setActiveProp('transparentCorners', value);
    };

    $scope.getHasBorders = function () {
        return getActiveProp('hasBorders');
    };

    $scope.setHasBorders = function (value) {
        return setActiveProp('hasBorders', value);
    };

    $scope.getHasControls = function () {
        return getActiveProp('hasControls');
    };

    $scope.setHasControls = function (value) {
        return setActiveProp('hasControls', value);
    };

    $scope.sendBackwards = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendBackwards(activeObject);
        }
    };

    $scope.sendToBack = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.sendToBack(activeObject);
        }
    };

    $scope.bringForward = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringForward(activeObject);
        }
    };

    $scope.bringToFront = function () {
        var activeObject = canvas.getActiveObject();
        if (activeObject) {
            canvas.bringToFront(activeObject);
        }
    };

    var pattern = new fabric.Pattern({
        source: 'images/escheresque.png',
        repeat: 'repeat'
    });

    $scope.patternify = function () {
        var obj = canvas.getActiveObject();

        if (!obj) return;

        if (obj.fill instanceof fabric.Pattern) {
            obj.set('fill', null);
        } else {
            if (obj instanceof fabric.PathGroup) {
                obj.getObjects().forEach(function (o) {
                    o.set('fill', pattern);
                });
            } else {
                obj.set('fill', pattern);
            }
        }
        canvas.renderAll();
    };

    $scope.clip = function () {
        var obj = canvas.getActiveObject();
        if (!obj) return;

        if (obj.clipTo) {
            obj.clipTo = null;
        } else {
            var radius = obj.width < obj.height ? (obj.width / 2) : (obj.height / 2);
            obj.clipTo = function (ctx) {
                ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
            };
        }
        canvas.renderAll();
    };


    $scope.gradientify = function () {
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
    };

    $scope.execute = function () {
        if (!(/^\s+$/).test(consoleValue)) {
            eval(consoleValue);
        }
    };



    $scope.getConsoleJSON = function () {
        return consoleJSONValue;
    };
    $scope.setConsoleJSON = function (value) {
        consoleJSONValue = value;
    };
    $scope.getConsoleSVG = function () {
        return consoleSVGValue;
    };
    $scope.setConsoleSVG = function (value) {
        consoleSVGValue = value;
    };
    $scope.getConsole = function () {
        return consoleValue;
    };
    $scope.setConsole = function (value) {
        consoleValue = value;
    };

    $scope.loadSVGWithoutGrouping = function () {
        _loadSVGWithoutGrouping(consoleSVGValue);
    };
    $scope.loadSVG = function () {
        _loadSVG(consoleSVGValue);
    };

    var _loadSVG = function (svg) {
        fabric.loadSVGFromString(svg, function (objects, options) {
            var obj = fabric.util.groupSVGElements(objects, options);
            canvas.add(obj).centerObject(obj).renderAll();
            obj.setCoords();
        });
    };

    var _loadSVGWithoutGrouping = function (svg) {
        fabric.loadSVGFromString(svg, function (objects) {
            canvas.add.apply(canvas, objects);
            canvas.renderAll();
        });
    };

    $scope.saveJSON = function () {
        _saveJSON(JSON.stringify(canvas));
    };

    var _saveJSON = function (json) {
        $scope.setConsoleJSON(json);
    };

    $scope.loadJSON = function () {
        _loadJSON(consoleJSONValue);
    };

    var _loadJSON = function (json) {
        canvas.loadFromJSON(json, function () {
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



    $scope.getPreserveObjectStacking = function () {
        return canvas.preserveObjectStacking;
    };
    $scope.setPreserveObjectStacking = function (value) {
        return canvas.preserveObjectStacking = value;
    };

    $scope.getFreeDrawingMode = function () {
        return canvas.isDrawingMode;
    };
    $scope.setFreeDrawingMode = function (value) {
        canvas.isDrawingMode = !!value;
        $scope.$$phase || $scope.$digest();
    };

    $scope.freeDrawingMode = 'Pencil';

    $scope.getDrawingMode = function () {
        return $scope.freeDrawingMode;
    };
    $scope.setDrawingMode = function (type) {
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

    $scope.getDrawingLineWidth = function () {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.width;
        }
    };
    $scope.setDrawingLineWidth = function (value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = parseInt(value, 10) || 1;
        }
    };

    $scope.getDrawingLineColor = function () {
        if (canvas.freeDrawingBrush) {
            return canvas.freeDrawingBrush.color;
        }
    };
    $scope.setDrawingLineColor = function (value) {
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    };

    $scope.getDrawingLineShadowWidth = function () {
        if (canvas.freeDrawingBrush && canvas.freeDrawingBrush.shadow) {
            return canvas.freeDrawingBrush.shadow.blur || 1;
        } else {
            return 0
        }
    };

    $scope.setDrawingLineShadowWidth = function (value) {
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
        $scope.diamondPatternBrush.getPatternSrc = function () {

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
        $scope.squarePatternBrush.getPatternSrc = function () {

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
        $scope.vLinePatternBrush.getPatternSrc = function () {

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
        $scope.hLinePatternBrush.getPatternSrc = function () {

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


kitchensink.controller('bgContrl', ["$scope", function ($scope) {
    $scope.change = 'data';
    $scope.getVal = function () {

        console.log($scope.changedVal);
        $scope.change = $scope.changedVal;
    }
}])




kitchensink.controller('CanvasControls', function ($scope) {

    $scope.canvas = canvas;
    $scope.getActiveStyle = getActiveStyle;

    addAccessors($scope);
    watchCanvas($scope);



    // Editing manipulating the Canvas Size
    // ================================================================




    $scope.setMySize = function () {
        var setWidth = document.getElementById('myWidth').value;
        var setHeight = document.getElementById('myHeight').value;
        canvas.setWidth(setWidth);
        canvas.setHeight(setHeight);
        console.log(setWidth, setHeight);
        canvas.calcOffset();
    };

    $scope.presetSizes = [{
            name: 'iPad Landscape',
            height: 768,
            width: 1024
    },
        {
            name: 'iPad Portrait',
            height: 1024,
            width: 766
    },
        {
            name: 'iPad Pro Landscape',
            height: 1024,
            width: 1366
    },
        {
            name: 'iPad Pro Portrait',
            height: 1366,
            width: 1024
    }
  ];


    $scope.setCanvasSize = function (width, height) {
        canvas.setWidth(width);
        canvas.setHeight(height);
        canvas.calcOffset();
        console.log("resising now...");

    };


})

// Layer panel test implementation
// ================================================================

kitchensink.controller('LayersController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {

    $scope.objects = canvas._objects || [];

    $scope.sortableOptions = {
        items: '.object:visible',
        scroll: false,
        axis: 'y',
        containment: 'parent',
        start: function (e, ui) {
            ui.item.data('start', ui.item.index());
        },
        update: function (e, ui) {
            var start = ui.item.data('start'),
                end = ui.item.index();


            obj = canvas.getObjects()[start];

            if (!obj) return;

            if (end > start) {
                //send object forwards by the amount of objects it passed
                for (var i = 0; i < (end - start); i++) {
                    canvas.bringForward(obj);
                }
            } else {
                //send object backwards by the amount of objects it passed
                for (var i = 0; i < (start - end); i++) {
                    canvas.sendBackwards(obj);
                }
            }

            $timeout(function () {
                canvas.renderAll();
                start = false;
                end = false;
            });
        },
    }

    $scope.setAsActive = function (object) {
        if (object) {
            canvas.setActiveObject(object);
        }
    };

    $scope.toggleVisibility = function (object) {
        if (!object) return;

        if (object.visible) {
            object.set({
                visible: false,
                evented: false,
                selectable: false,
                hasBorders: false,
                hasCorners: false
            });
        } else {
            object.set({
                visible: true,
                evented: true,
                selectable: true,
                hasBorders: true,
                hasCorners: true
            });
            canvas.setActiveObject(object);
        }

        canvas.renderAll();
    };

    $scope.deleteObject = function (object) {
        if (object) {
            canvas.remove(object);
            canvas.renderAll();
        }
    };

    $scope.toggleLock = function (object) {
        if (!object) return;

        if (object.locked) {
            object.set({
                locked: false,
                selectable: true,
                evented: true,
                lockMovementX: false,
                lockMovementY: false,
                lockRotation: false,
                lockScalingX: false,
                lockScalingY: false,
                lockUniScaling: false,
                hasControls: true,
                hasBorders: true
            });

            canvas.setActiveObject(object);
        } else {
            object.set({
                locked: true,
                selectable: false,
                evented: false,
                lockMovementX: true,
                lockMovementY: true,
                lockRotation: true,
                lockScalingX: true,
                lockScalingY: true,
                lockUniScaling: true,
                hasControls: false,
                hasBorders: false
            });
        }

        canvas.renderAll();
    }
}])


//Controller for manipulating the canvas size


kitchensink.controller('RightTabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'One',
            url: 'templates/project_menu.html',
            micon: 'phonelink-setup',
            custom: 'images/icons.svg'
    }, {
            title: 'insert-drive-file',
            url: 'templates/page_menu.html',
            micon: 'insert-drive-file',
            custom: 'images/icons.svg'
    }, {
            title: 'Three',
            url: 'templates/layout_menu.html',
            micon: 'perm-data-setting',
            custom: 'images/icons.svg'
    }, {
            title: 'Four',
            url: 'templates/style_menu.html',
            micon: 'style',
            custom: 'images/icons.svg'
    }, {
            title: 'Five',
            url: 'templates/text_menu.html',
            micon: 'format-size',
            custom: 'images/icons.svg'
    }, {
            title: 'Six',
            url: 'templates/actions_menu.html',
            micon: 'stars',
            custom: 'images/icons.svg'
    }

  ];

    $scope.currentTab = 'templates/style_menu.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}])

kitchensink.controller('LeftTabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'One',
            url: 'templates/layers.html',
            micon: 'phonelink-setup',
            custom: 'images/icons.svg'
    }
  ];

    $scope.currentTab = 'templates/layers.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}])
