// Layer panel test implementation
// ================================================================

kitchensink.controller('PagesController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {


    // $scope.objects = [{
    //     name: 'Page 1',
    //     thumbnail: 'project/assets/thumbnails/page1.png',
    //     path: 'project/pages/',

    // }
    // ,
    // {
    //     name: 'Page 2',
    //     thumbnail: 'project/assets/thumbnails/page2.png',
    //     path: 'project/pages/'
    // },
    // {
    //     name: 'Page 3',
    //     thumbnail: 'project/assets/thumbnails/page3.png',
    //     path: 'project/pages/'
    // },
    // {
    //     name: 'Page 4',
    //     thumbnail: 'project/assets/thumbnails/page4.png',
    //     path: 'project/pages/'
    // }
    // ];

    $scope.objects = [{
        pageSettings: {
            name: 'Page 1',
            thumbnail: 'project/assets/thumbnails/page1.png',
            path: 'project/pages/'
        },
        canvas: {
            canvasWidth: canvas ? canvas.width : 1024,
            canvasHeight: canvas ? canvas.height : 768,
            canvasData: canvas.toJSON()

        }

    }];

    // in loading  project case we need to replace objects array to loaded project pages array
    $scope.replaceObjects = (paramArray) => {
        debugger;
        $scope.objects = paramArray;
        $scope.activePage = $scope.objects[0];
        var fn = () => {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {

            } else {
                $scope.$apply();
            }
        }
        fn();

    }
    debugger;
    // if there is lastLoadedProjectFile variabel where  saved last project we must load it 
    lastLoadedProject && lastLoadedProject.pages &&
        $scope.replaceObjects(lastLoadedProject.pages);

    $scope.activePage = $scope.objects[0];


    $scope.savePageToObjects = () => { 
        $scope.activePage.canvas.canvasData = JSON.parse(JSON.stringify(canvas)); 
    }


    $scope.addPage = () => {
        $scope.refreshSavePage();
        $scope.savePageToObjects();
        // $scope.activePage.canvas.canvasData = JSON.parse(JSON.stringify(canvas));
        debugger;
        let TempPage = {
            pageSettings: {
                name: 'Page 1',
                thumbnail: 'project/assets/thumbnails/page1.png',
                path: 'project/pages/'
            },
            canvas: {
                canvasWidth: canvas ? canvas.width : 1024,
                canvasHeight: canvas ? canvas.height : 768,
                // canvasData: canvas.toJSON()
                canvasData: {}

            }
        }

        TempPage.pageSettings.name = 'Page ' + PagesControllerScope.objects.length;
        debugger;
        canvas.clear();
        debugger;
        var imageBase64 = canvas.toDataURL('png');

        TempPage.pageSettings.thumbnail = imageBase64;
        //clear canvas and setting it on new page
        TempPage.canvas.canvasData = {};


        $scope.objects.push(TempPage);

        $scope.setAsActive($scope.objects[$scope.objects.length - 1]);

    }

    $scope.refreshSavePage = () => {


        var imageBase64 = canvas.toDataURL('png');
        //var base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");

        $scope.activePage.pageSettings.thumbnail = imageBase64;
        var fn = () => {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {

            } else {
                $scope.$apply();
            }
        }
        fn();
        // toJSON()
    }

    $scope.setAsActive = (page) => {

        if (page) {
            $scope.activePage = page;
            if ($scope.activePage.canvas &&
                $scope.activePage.canvas.canvasData &&
                $scope.activePage.canvas.canvasData.hasOwnProperty("objects") &&
                $scope.activePage.canvas.canvasData.objects.length > 0) {
                debugger;
                canvas.loadFromJSON($scope.activePage.canvas.canvasData, () => {
                    canvas.renderAll();
                })

            } else {
                debugger;
                canvas.clear();
                canvas.renderAll();
            }

            // $scope.objects.push(page);
        } else {

        }

    }

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
                for (var i = 0; i < (end - start); i++) {
                    canvas.bringForward(obj);
                }
            } else {
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


    $scope.setAsActiveLayer = function (item, list) {
        list.some(function (item) {
            if (item.active) {
                return item.active = false;
            }
        });
        item.active = true;
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

    // $scope.onDragComplete = function (data, evt) {
    //     debugger;
    //     console.log("drag success, data:", data);
    // }
    // $scope.onDropComplete = function (data, evt) {
    //     debugger;
    //     console.log("drop success, data:", data);
    // }

    $scope.centerAnchor = true;
    $scope.toggleCenterAnchor = function () { $scope.centerAnchor = !$scope.centerAnchor }
    // $scope.droppedObjects1 = [];
    // $scope.droppedObjects2 = [];
    $scope.onDropComplete1 = function (data, evt) {
        var index = $scope.droppedObjects1.indexOf(data);
        if (index == -1)
            $scope.droppedObjects1.push(data);

        cosole.log("page controller onDropComplete1 ");
    }
    // $scope.onDragSuccess1 = function (data, evt) {
    //     console.log("133", "$scope", "onDragSuccess1", "", evt);
    //     var index = $scope.droppedObjects1.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects1.splice(index, 1);
    //     }
    //     cosole.log("page controller onDragSuccess1 ");
    // }
    // $scope.onDragSuccess2 = function (data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index > -1) {
    //         $scope.droppedObjects2.splice(index, 1);
    //     }
    // }
    // $scope.onDropComplete2 = function (data, evt) {
    //     var index = $scope.droppedObjects2.indexOf(data);
    //     if (index == -1) {
    //         $scope.droppedObjects2.push(data);
    //     }
    // }
    var inArray = function (array, obj) {
        var index = array.indexOf(obj);
    }

    PagesControllerScope = $scope;
}])
var PagesControllerScope;