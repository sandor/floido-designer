kitchensink.controller('pageFlowController', function ($scope, leftPanelTabService, $timeout) {
    // $scope.centerAnchor = true;
    // $scope.toggleCenterAnchor = function () { $scope.centerAnchor = !$scope.centerAnchor }
    // $scope.draggableObjects = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];
    // $scope.droppedObjects1 = [];
    // $scope.droppedObjects2 = [];

    // $scope.onDragComplete = function (data, evt) {
    //     debugger;
    //     console.log("drag success, data:", data);
    // }
    // $scope.onDropComplete = function (data, evt) {
    //     debugger;
    //     console.log("drop success, data:", data);
    // }

    $scope.pageflowHeight = document.getElementById("wrapper").offsetHeight;
    $scope.pageflowWidth = document.getElementById("wrapper").offsetWidth;

    $scope.dropAreaHeight = Math.round((($scope.pageflowHeight - 50) / 4));
    $scope.dropAreaWidth = Math.round((($scope.pageflowWidth - 50) / 4));
    /////////create Dropes Area////////
    //$scope.dropAreas = [];
    //$scope.dropAreas = [[][]];
    $scope.dropAreas = {};

    $scope.dropAreaElCountOnLIne = Math.round($scope.pageflowWidth / $scope.dropAreaWidth);

    // $scope.CreateDropArea = function () {
    $scope.dropAreaCounter = 0;
    $scope.dropAreaLinesCount = 2;

    for (let i = 0; i < $scope.dropAreaLinesCount; i++) {
        $scope.dropAreas["line" + i] = [];

        for (let k = 0; k < $scope.dropAreaElCountOnLIne; k++) {
            $scope.dropAreaCounter++
            $scope.dropAreas["line" + i].push({ name: 'dropArea' + $scope.dropAreaCounter });
        }

    }





    // for (let i = 0; i < $scope.dropAreaLinesCount; i++) {
    //     for (let j = 0; j < $scope.dropAreaElCountOnLIne; j++) {
    //         debugger;
    //         $scope.dropAreas[i].push({ name: 'dropArea' + $scope.dropAreaCounter });
    //         $scope.dropAreaCounter++;
    //     }
    //     //// $scope.dropAreas[i].push({ name: 'dropArea' + i });
    // }


    //  }


    // $scope.additem = function () {

    //     $scope.dropAreas.push({ name: 'dropArea' + $scope.dropAreas.length });
    // }

    //$scope.dropAreas = [{ name: 'dropArea' + 1 }, { name: 'dropArea' + 2 }];

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () { $scope.centerAnchor = !$scope.centerAnchor }

    $scope.droppedObjects1 = [];
    $scope.droppedObjects2 = [];
    $scope.onDropComplete1 = function (data, evt, dropAreaName) {

        if (data) {
            data.dropAreaName = dropAreaName;
        }
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1 && $scope.droppedObjects1.length < 2) {
            // $scope.droppedObjects1.push(data);


            if (data) {
                debugger;
                for (let keydropAreaLine in $scope.dropAreas) {
                    if ($scope.dropAreas.hasOwnProperty(keydropAreaLine)) {

                        let dropAreaLine = $scope.dropAreas[keydropAreaLine];

                        dropAreaLine.forEach((dropAreaLineItem) => {

                            if (dropAreaLineItem.name == dropAreaName) {

                                dropAreaLineItem.data = data;
                            }

                        })

                    }
                }
            }

            ////
        }

    }
    $scope.onDragSuccess1 = function (data, evt) {
        debugger;
        console.log("133", "$scope", "onDragSuccess1", "", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
    }
    $scope.onDragSuccess2 = function (data, evt) {
        debugger;
        var index = $scope.droppedObjects2.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects2.splice(index, 1);
        }
    }
    $scope.onDropComplete2 = function (data, evt) {
        debugger;
        var index = $scope.droppedObjects2.indexOf(data);
        if (index == -1) {
            $scope.droppedObjects2.push(data);
        }
    }
    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }

    $scope.remove = function (param) {
        debugger;
        //param.dropAreaLineItem.data;
        if (param && param.dropAreaLineItem.data) {
            debugger;
            for (let keydropAreaLine in $scope.dropAreas) {
                if ($scope.dropAreas.hasOwnProperty(keydropAreaLine)) {

                    let dropAreaLine = $scope.dropAreas[keydropAreaLine];

                    dropAreaLine.forEach((dropAreaLineItem) => {

                        if (dropAreaLineItem.name == param.dropAreaLineItem.name) {
                            debugger;
                            delete dropAreaLineItem.data;
                        }

                    })

                }
            }
        }
    }


})
