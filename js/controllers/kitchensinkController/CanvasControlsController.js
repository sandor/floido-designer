kitchensink.controller('CanvasControlsController', function ($scope) {

    $scope.canvas = canvas;
    $scope.getActiveStyle = getActiveStyle;
    $scope.zoom = 0;//default zoom

    $scope.insideRulerWidth = document.getElementsByClassName("rul_wrapper")[0].offsetWidth
        - document.getElementsByClassName("rul_ruler_Vertical")[0].offsetHeight - 70;
    $scope.insideRulerheight = document.getElementsByClassName("rul_wrapper")[0].offsetHeight - document.getElementsByClassName("toolbar-header")[0].offsetHeight
        - document.getElementsByClassName("toolbar-footer")[0].offsetHeight - 90;

    addAccessors($scope);
    watchCanvas($scope);

//get canvas Angle and set it

    canvas.on('object:rotating', function (options) {
        console.log(options.target);
        if (document.getElementById("canvas-angle")) {
            document.getElementById("canvas-angle").value = Math.round(options.target.angle);
        }


        //document.getElementById("position-y").value = Math.round(options.target.angle);
    });
    canvas.on('object:modified', function (options) {
        if (document.getElementById("position-x")) {
            document.getElementById("transform-angle").value = Math.round(options.target.angle);
            document.getElementById("position-x").value = Math.round(options.target.left);
            document.getElementById("position-y").value = Math.round(options.target.top);
            document.getElementById("size-propWidth").value = Math.round(options.target.width);
            document.getElementById("size-propHeight").value = Math.round(options.target.height);
            document.getElementById("scale-scaleX").value = Math.round(options.target.scaleX);
            document.getElementById("scale-scaleY").value = Math.round(options.target.scaleY);
        }
    })

    // $scope.canvasAngle = canvasAngle;
    // Editing manipulating the Canvas Size
    // ================================================================


    $scope.setMySize = function () {
        //;
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



    $scope.setZoom = function (param) {

        [].__proto__.forEach.call(canvas._objects, (canvasItem) => {

            console.log(canvasItem.name);
            if (canvas.getActiveObject().name != 'Image' && canvasItem.name == 'Image') {
                canvas.setActiveObject(canvasItem);

            }

        });

        let scaleFactor = param.zoom / 100;
        if (canvas._objects && !canvas.getActiveObject()) {
            canvas.setActiveObject(canvas._objects[0])

        }
        if (canvas._objects && canvas.getActiveObject()) {

            // canvas.setZoom(param.zoom / 100);//Working line
            //$scope.zoom =(param.zoom / 100);
            canvas.setZoom(scaleFactor);
            canvas.setWidth(canvas.getZoom() * canvas.getActiveObject().width);
            canvas.setHeight(canvas.getZoom() * canvas.getActiveObject().height);
            // canvas.setHeight(canvas.height * scaleFactor);
            // canvas.setWidth(canvas.width * scaleFactor);
            //canvas.getActiveObject().scaleX=1
        }

        else {

            console.log("there is now active objects");
        }
        //;


    }


    $scope.originalSize = function (param) {
        ;
        [].__proto__.forEach.call(canvas._objects, (canvasItem) => {
            ;
            console.log(canvasItem.name);
            if (canvas.getActiveObject().name != 'Image' && canvasItem.name == 'Image') {
                canvas.setActiveObject(canvasItem);

            }

        });

        if (canvas._objects && !canvas.getActiveObject()) {
            //;
            canvas.setActiveObject(canvas._objects[0])
        }
        if (canvas._objects && canvas.getActiveObject()) {
            canvas.getActiveObject().scaleX = 1;
            canvas.getActiveObject().scaley = 1;
            canvas.getActiveObject().left = 0;
            canvas.getActiveObject().top = 0;
            canvas.setZoom(1);
            canvas.setWidth(canvas.getZoom() * canvas.getActiveObject().width);
            canvas.setHeight(canvas.getZoom() * canvas.getActiveObject().height);
            $scope.zoom = (1) * 100;
        }
        else {
            alert("there is now active objects");
        }


    }

    $scope.fitToWin = function (param) {

        [].__proto__.forEach.call(canvas._objects, (canvasItem) => {

            console.log(canvasItem.name);
            if (canvas.getActiveObject().name != 'Image' && canvasItem.name == 'Image') {
                canvas.setActiveObject(canvasItem);

            }

        });

        $scope.insideRulerWidth = document.getElementsByClassName("rul_wrapper")[0].offsetWidth
            - document.getElementsByClassName("rul_ruler_Vertical")[0].offsetHeight - 70;
        $scope.insideRulerheight = document.getElementsByClassName("rul_wrapper")[0].offsetHeight
            - document.getElementsByClassName("toolbar-header")[0].offsetHeight
            - document.getElementsByClassName("toolbar-footer")[0].offsetHeight - 90;


        if (canvas._objects && !canvas.getActiveObject()) {
            canvas.setActiveObject(canvas._objects[0])
        }
        if (canvas._objects && canvas.getActiveObject()) {

            //;

            canvas.getActiveObject().left = 0;
            canvas.getActiveObject().top = 0;
            canvas.setWidth($scope.insideRulerWidth);
            canvas.setHeight($scope.insideRulerheight);

            canvas.getActiveObject().scaleY = 1;
            canvas.getActiveObject().scaleX = 1;

            if (canvas._activeObject && canvas._activeObject.width > canvas._activeObject.height) {


                // $scope.zoom = ((canvas.width ) / canvas._activeObject.width) * 100;
                $scope.zoom = ((canvas.width ) / canvas._activeObject.width) > ((canvas.height ) / canvas._activeObject.height)
                    ? (((canvas.height ) / canvas._activeObject.height) * 100) : (((canvas.width ) / canvas._activeObject.width) * 100);


                let scaleFactorWidth = ((canvas.width / canvas._activeObject.width) * canvas._activeObject.width);
                let scaleFactorHeight = ((canvas.height / canvas._activeObject.height) * canvas._activeObject.height);

            }
            else {
                let tempScale = (window.innerHeight - 170) / canvas.getActiveObject().height;
                let tempZoom = ((canvas.width ) / canvas._activeObject.width) > ((canvas.height ) / canvas._activeObject.height)
                    ? (tempScale * 100) : (tempScale * 100);
                $scope.zoom = tempZoom

            }


        }

        else {
            alert("there is now active objects");
        }


    }


})