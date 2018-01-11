kitchensink.controller('pageFlowController', function ($scope, leftPanelTabService, pageFlowService, $timeout) {


    // $scope.centerAnchor = true;
    // $scope.toggleCenterAnchor = function () { $scope.centerAnchor = !$scope.centerAnchor }
    // $scope.draggableObjects = [{ name: 'one' }, { name: 'two' }, { name: 'three' }];
    // $scope.droppedObjects1 = [];
    // $scope.droppedObjects2 = [];

    // $scope.onDragComplete = function (data, evt) {
    //     
    //     console.log("drag success, data:", data);
    // }
    // $scope.onDropComplete = function (data, evt) {
    //     
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

    $scope.windowRes = (event) => {

        $scope.pageflowHeight = document.getElementById("wrapper").offsetHeight;
        $scope.pageflowWidth = document.getElementById("wrapper").offsetWidth;

        $scope.dropAreaHeight = Math.round((($scope.pageflowHeight - 50) / 4));
        $scope.dropAreaWidth = Math.round((($scope.pageflowWidth - 50) / 4));
    }
    $scope.getdropAreasFromService = () => {
        $scope.dropAreas = pageFlowService.getPageFlowData() ? pageFlowService.getPageFlowData() : {};
    }
    $scope.getdropAreasFromService();



    $scope.dropAreaElCountOnLIne = Math.round($scope.pageflowWidth / $scope.dropAreaWidth);

    // $scope.CreateDropArea = function () {
    if (Object.keys($scope.dropAreas).length == 0) {
        $scope.dropAreaCounter = 0;
        $scope.dropAreaLinesCount = 3;

        for (let i = 0; i < $scope.dropAreaLinesCount; i++) {
            $scope.dropAreas["line" + i] = [];

            for (let k = 0; k < $scope.dropAreaElCountOnLIne; k++) {
                $scope.dropAreaCounter++
                $scope.dropAreas["line" + i].push({ name: 'dropArea' + $scope.dropAreaCounter + "_L" + k });

            }

        }
    }

    ///

    // for (let i = 0; i < $scope.dropAreaLinesCount; i++) {
    //     for (let j = 0; j < $scope.dropAreaElCountOnLIne; j++) {
    //         
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
                for (let keydropAreaLine in $scope.dropAreas) {
                    if ($scope.dropAreas.hasOwnProperty(keydropAreaLine)) {

                        let dropAreaLine = $scope.dropAreas[keydropAreaLine];

                        dropAreaLine.forEach((dropAreaLineItem) => {

                            if (dropAreaLineItem.data && (dropAreaLineItem.data.dropAreaName == data.dropAreaName)) {

                                delete dropAreaLineItem.data;
                            } else {
                                // delete dropAreaLineItem.data;
                            }

                        })
                        dropAreaLine.forEach((dropAreaLineItem) => {

                            if (dropAreaLineItem.name == dropAreaName) {

                                dropAreaLineItem.data = data;
                            } else {
                                // delete dropAreaLineItem.data;
                            }

                        })

                    }
                }
                ///
                dropAreas = null;
                dropAreas = $scope.dropAreas;
                pageFlowService.setPageFlowData($scope.dropAreas);
            }

            ////
        }
        $scope.setPageFlowItemAspectRatio();

    }



    $scope.setPageFlowItemAspectRatio = () => {
        debugger;


        $timeout(() => {

            let pageflowThumbnailArr = document.getElementsByClassName("pageflowThumbnail");
            debugger;


            PagesControllerScope && PagesControllerScope.objects.forEach(element => {

                for (const key in pageflowThumbnailArr) {
                    if (pageflowThumbnailArr.hasOwnProperty(key)) {
                        const item = pageflowThumbnailArr[key].firstChild.nextElementSibling;
                        debugger;
                        if (item.src == element.pageSettings.thumbnail) {
                            if (element.canvas.canvasHeight > element.canvas.canvasWidth) {

                                item.style.height = "161px";
                                //             // item.style.height = $scope.activePage.canvas.canvasHeight
                                item.style.width = ((element.canvas.canvasWidth / element.canvas.canvasHeight) * 161).toString() + "px";
                            } else {

                                item.style.width = "245px";
                                //                 // item.style.height = $scope.activePage.canvas.canvasHeight
                                item.style.height = ((element.canvas.canvasHeight / element.canvas.canvasWidth) * 245).toString() + "px";
                            }
                            continue;
                        }

                    }

                }

            });



        }, 20)


    }



    $scope.onDragSuccess1 = function (data, evt) {

        console.log("133", "$scope", "onDragSuccess1", "", evt);
        var index = $scope.droppedObjects1.indexOf(data);
        if (index > -1) {
            $scope.droppedObjects1.splice(index, 1);
        }
        console.log("is working + onDragSuccess1")
        $scope.setPageFlowItemAspectRatio();

    }
    // $scope.onDragSuccess2 = function (data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects2.splice(index, 1);
    //     }
    //     console.log("is working + onDragSuccess2")
    // }
    // $scope.onDropComplete2 = function (data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index == -1) {
    //         $scope.droppedObjects2.push(data);
    //     }
    //     console.log("is working + onDropComplete2")
    // }
    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }

    $scope.remove = function (param) {
        //param.dropAreaLineItem.data;
        if (param && param.dropAreaLineItem.data) {
            for (let keydropAreaLine in $scope.dropAreas) {
                if ($scope.dropAreas.hasOwnProperty(keydropAreaLine)) {

                    let dropAreaLine = $scope.dropAreas[keydropAreaLine];

                    dropAreaLine.forEach((dropAreaLineItem) => {

                        if (dropAreaLineItem.name == param.dropAreaLineItem.name) {
                            delete dropAreaLineItem.data;
                        }

                    })

                }
            }
            ///
            dropAreas = null;
            dropAreas = $scope.dropAreas;
            pageFlowService.setPageFlowData($scope.dropAreas);

        }

    }

    //remove  latest * rowCount row(s)
    $scope.addRemoveRows = function (rowCount) {
        if (rowCount) {
            let rowCountTemp = rowCount ? rowCount : 1;
            let objPropCount = Object.keys($scope.dropAreas).length;

            if (rowCount < objPropCount) {
                $scope.removeRow(rowCount);
            }
            if (rowCount > objPropCount) {
                $scope.addRow(rowCount);
            }


        }

    }
    $scope.removeRow = function (rowCount) {
        let rowCountTemp = rowCount ? rowCount : 1;
        let objPropCount = Object.keys($scope.dropAreas).length;

        for (let keydropAreaLine in $scope.dropAreas) {

            if (((objPropCount - rowCountTemp) > 0) && ((objPropCount) != rowCountTemp)) {

                delete $scope.dropAreas[keydropAreaLine];
                objPropCount--;


            } else {

            }

        }
        $scope.$apply();
        dropAreas = null;
        dropAreas = $scope.dropAreas;

    }


    $scope.addRow = function (rowCount) {
        let rowCountTemp = rowCount ? rowCount : 1;
        let objPropCount = Object.keys($scope.dropAreas).length;
        let allItemCount = 0;
        let itemCountOn1Line = 0;


        for (let keydropAreaLine in $scope.dropAreas) {

            allItemCount += $scope.dropAreas[keydropAreaLine].length;
            itemCountOn1Line = $scope.dropAreas[keydropAreaLine].length;
        }

        for (let i = 0; i <= rowCount - objPropCount; i++) {

            for (let lineN = 0; lineN < objPropCount + 1; lineN++) {
                if (!$scope.dropAreas["line" + lineN]) {
                    $scope.dropAreas["line" + lineN] = [];
                    for (let ii = 0; ii < itemCountOn1Line; ii++) {
                        $scope.dropAreas["line" + lineN].push({ name: 'dropArea' + allItemCount + "_L" + lineN });
                        allItemCount++;
                    }

                }
            }
            objPropCount++;

        }


        $scope.$apply();
        dropAreas = null;
        dropAreas = $scope.dropAreas;
        pageFlowService.setPageFlowData($scope.dropAreas);
    }


    //remove  latest * Columns columnCount
    $scope.addRemoveColumns = function (columnCount) {
        if (columnCount) {
            let columnCountTemp = columnCount ? columnCount : 4;
            let objPropArraylength = $scope.dropAreas['line0'].length

            if (columnCount < objPropArraylength) {
                $scope.removeColumn(columnCount);
            }
            if (columnCount > objPropArraylength) {
                $scope.addColumn(columnCount);
            }


        }

    }

    $scope.removeColumn = function (columnCount) {
        for (let keydropAreaLine in $scope.dropAreas) {

            columnsCountTemp = $scope.dropAreas[keydropAreaLine].length;
            $scope.dropAreas[keydropAreaLine].splice(columnCount, columnsCountTemp - columnCount)

        }
        $scope.$apply();

        dropAreas = null;
        dropAreas = $scope.dropAreas;

    }

    $scope.addColumn = function (columnCount) {
        let allItemCount = 0;

        for (let keydropAreaLine in $scope.dropAreas) {

            allItemCount += $scope.dropAreas[keydropAreaLine].length;
        }



        for (let keydropAreaLine in $scope.dropAreas) {

            columnsCountTemp = $scope.dropAreas[keydropAreaLine].length;
            for (let i = 0; i < columnCount - columnsCountTemp; i++) {
                $scope.dropAreas[keydropAreaLine].push({ name: 'dropArea' + allItemCount + "_L" + keydropAreaLine });
                allItemCount++;

            }

        }

        $scope.$apply();
        dropAreas = null;
        dropAreas = $scope.dropAreas;
        pageFlowService.setPageFlowData($scope.dropAreas);
    }




    dropAreas = null;
    dropAreas = $scope.dropAreas;
    pageFlowScope = $scope;


})
pageFlowScope = {};
dropAreas = {};

