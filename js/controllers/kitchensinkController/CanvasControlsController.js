
kitchensink.controller('CanvasControlsController', function ($scope) {

    $scope.canvas = canvas;
    $scope.getActiveStyle = getActiveStyle;
    $scope.zoom = 0;//default zoom

    addAccessors($scope);
    watchCanvas($scope);



    // Editing manipulating the Canvas Size
    // ================================================================




    $scope.setMySize = function () {
        //debugger;
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

        if ( canvas._objects && !canvas.getActiveObject()) {
            //debugger;
            canvas.setActiveObject(canvas._objects[0])

        }
        if (canvas._objects && canvas.getActiveObject() ) {
            //debugger;
            canvas.setZoom(param.zoom / 100);
            //$scope.zoom =(param.zoom / 100);

        }

        else {

            console.log("there is now active objects");
        }
        //debugger;


    }

    $scope.originalSize = function (param) {

        if (canvas._objects && !canvas.getActiveObject()) {
            //debugger;
            canvas.setActiveObject(canvas._objects[0])
        }
        if (canvas._objects && canvas.getActiveObject()) {
            //debugger;
            canvas.getActiveObject().scaleX = 0.5;
            canvas.getActiveObject().scaley = 0.5
            canvas.getActiveObject().left = 0;
            canvas.getActiveObject().top = 0;
            canvas.setZoom(1);
            $scope.zoom = (1) * 100;
        }
        else {
            alert("there is now active objects");
        }



    }

    $scope.fitToWin = function (param) {
        if (canvas._objects && !canvas.getActiveObject()) {
            canvas.setActiveObject(canvas._objects[0])
        }
        if (canvas._objects && canvas.getActiveObject()) {

            //debugger;

            canvas.getActiveObject().scaleX = 0.5;
            canvas.getActiveObject().scaley = 0.5
            canvas.getActiveObject().left = 0;
            canvas.getActiveObject().top = 0;

            if (canvas._activeObject
                && canvas._activeObject.width
                && canvas._activeObject.height
                && canvas._activeObject.width > canvas._activeObject.height) {
                //debugger;
                canvas.setZoom((canvas.height * 2) / canvas._activeObject.height);
                $scope.zoom = ((canvas.height * 2) / canvas._activeObject.height) * 100;
            } else {
                //debugger

                canvas.setZoom((canvas.height * 2) / canvas._activeObject.height);
                // canvas.setZoom(canvas.width / canvas._activeObject.width);
                $scope.zoom = ((canvas.height * 2) / canvas._activeObject.height) * 100;

            }


        }

        else {
            alert("there is now active objects");
        }


    }


})