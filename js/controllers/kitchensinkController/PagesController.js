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
            name: 'Page 0',
            thumbnail: 'project/assets/thumbnails/page1.png',
            path: 'project/pages/'
        },
        canvas: {
            canvasWidth: projectSettings.projectSettingsWidth ? projectSettings.projectSettingsWidth : 1024,
            canvasHeight: projectSettings.projectSettingsHeight ? projectSettings.projectSettingsHeight : 768,
            canvasData: canvas.toJSON()

        }

    }];
    $scope.safeScopeApply = () => {
        if ($scope && $scope.$root) {
            var phase = $scope.$root.$$phase;
            if (phase == '$apply' || phase == '$digest') {

            } else {
                $scope.$apply();
            }
        }

    }

    // in loading  project case we need to replace objects array to loaded project pages array
    $scope.replaceObjects = (paramArray) => {

        $scope.objects = paramArray;
        $scope.activePage = $scope.objects[0];

        $scope.safeScopeApply();
    }

    // if there is lastLoadedProjectFile variabel where  saved last project we must load it 
    lastLoadedProject && lastLoadedProject.pages &&
        $scope.replaceObjects(lastLoadedProject.pages);

    $scope.activePage = $scope.objects[0];


    $scope.savePageToObjects = () => {
        //   $timeout(() => {
        $scope.activePage.canvas.canvasData = JSON.parse(JSON.stringify(canvas));
        //  }, 30);

    }


    $scope.addPage = (openedPage) => {
        $scope.refreshSavePage();
        $scope.savePageToObjects();
        // $scope.activePage.canvas.canvasData = JSON.parse(JSON.stringify(canvas));
        let TempPage = {
            pageSettings: {
                name: 'Page 1',
                thumbnail: 'project/assets/thumbnails/page1.png',
                path: 'project/pages/'
            },
            canvas: {
                canvasWidth: projectSettings.projectSettingsWidth ? projectSettings.projectSettingsWidth : 1024,
                canvasHeight: projectSettings.projectSettingsHeight ? projectSettings.projectSettingsHeight : 768,
                canvasData: {}

            }
        }

        TempPage.pageSettings.name = 'Page ' + PagesControllerScope.objects.length;
        canvas.clear();


        if (openedPage) {
            // open page case
            // let imageBase64 = openedPage.canvas.canvasData.toDataURL('png');
            // TempPage.pageSettings.thumbnail = openedPage.pageSettings.thumbnail;
            // //clear canvas and setting it on new page
            // TempPage.canvas.canvasData = openedPage.canvas.canvasData
            openedPage.pageSettings.name = 'Page ' + PagesControllerScope.objects.length;
            $scope.objects.push(openedPage);
            $scope.safeScopeApply();

        } else {
            //create page case
            let imageBase64 = canvas.toDataURL('png');
            TempPage.pageSettings.thumbnail = imageBase64;
            //clear canvas and setting it on new page
            TempPage.canvas.canvasData = {};
            $scope.objects.push(TempPage);
        }





        $scope.setAsActive($scope.objects[$scope.objects.length - 1]);

    }


    $scope.refreshSavePage = () => {
        var thumbnailTeg;
        thumbnailTeg = document.getElementsByClassName("thumbnail");


        var imageBase64 = canvas.toDataURL('png');
        //var base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");

        $scope.activePage.pageSettings.thumbnail = imageBase64;
        $scope.safeScopeApply();
        $scope.savePageToObjects();


        if (PagesControllerScope.refreshSavePage) {

            for (const key in thumbnailTeg) {
                if (thumbnailTeg.hasOwnProperty(key)) {
                    const item = thumbnailTeg[key].firstChild.nextElementSibling;
                    if ($scope.objects[key].canvas.canvasHeight > $scope.objects[key].canvas.canvasWidth) {
                        /* width: 245px; */
                        /* height: 161px; */
                        item.style.height = "161px";
                        // item.style.height = $scope.activePage.canvas.canvasHeight
                        item.style.width = (($scope.objects[key].canvas.canvasWidth / $scope.objects[key].canvas.canvasHeight) * 161).toString() + "px";
                    } else {
                        item.style.width = "245px";
                        // item.style.height = $scope.activePage.canvas.canvasHeight
                        item.style.height = (($scope.objects[key].canvas.canvasHeight / $scope.objects[key].canvas.canvasWidth) * 245).toString() + "px";
                    }

                }
            }

            // if (document.getElementsByClassName("pageflowThumbnail ").length > 0) {

            //     let pageflowThumbnailArr = document.getElementsByClassName("pageflowThumbnail");
            //     // document.getElementsByClassName("pageflowThumbnail ")[0].firstChild.nextElementSibling.style.height = "150px"


            //     for (const key in pageflowThumbnailArr) {
            //         debugger;
            //         if (pageflowThumbnailArr.hasOwnProperty(key)) {
            //             const item = pageflowThumbnailArr[key].firstChild.nextElementSibling;
            //             debugger;
            //             if ($scope.objects[key].canvas.canvasHeight > $scope.objects[key].canvas.canvasWidth) {
            //                 /* width: 245px; */
            //                 /* height: 161px; */
            //                 item.style.height = "161px";
            //                 // item.style.height = $scope.activePage.canvas.canvasHeight
            //                 item.style.width = (($scope.objects[key].canvas.canvasWidth / $scope.objects[key].canvas.canvasHeight) * 161).toString() + "px";
            //             } else {
            //                 item.style.width = "245px";
            //                 // item.style.height = $scope.activePage.canvas.canvasHeight
            //                 item.style.height = (($scope.objects[key].canvas.canvasHeight / $scope.objects[key].canvas.canvasWidth) * 245).toString() + "px";
            //             }

            //         }
            //     }
            // }

            // var item = document.getElementsByClassName("thumbnail")[0].firstChild.nextElementSibling;
            // debugger;
            // if ($scope.activePage.canvas.canvasHeight > $scope.activePage.canvas.canvasWidth) {
            //     /* width: 245px; */
            //     /* height: 161px; */
            //     item.style.height = "161px"
            //     // item.style.height = $scope.activePage.canvas.canvasHeight
            //     item.style.width = (($scope.activePage.canvas.canvasWidth / $scope.activePage.canvas.canvasHeight) * 161).toString() + "px";
            // } else {
            //     item.style.width = "245px"
            //     // item.style.height = $scope.activePage.canvas.canvasHeight
            //     item.style.height = (($scope.activePage.canvas.canvasHeight / $scope.activePage.canvas.canvasWidth) * 245).toString() + "px";
            // }



        }

    }

    $scope.setAsActive = (page) => {
        if (page) {
            $scope.activePage = page;
            if ($scope.activePage.canvas &&
                $scope.activePage.canvas.canvasData &&
                $scope.activePage.canvas.canvasData.hasOwnProperty("_objects") &&
                $scope.activePage.canvas.canvasData._objects.length > 0) {

                canvas.loadFromJSON($scope.activePage.canvas.canvasData, () => {
                    canvas.renderAll();
                })
                canvas.setHeight(canvas.canvasHeight);
                canvas.setWidth(canvas.canvasWidth);

            } if ($scope.activePage.canvas &&
                $scope.activePage.canvas.canvasData) {
                canvas.loadFromJSON($scope.activePage.canvas.canvasData, () => {
                    canvas.renderAll();
                })
                canvas.setHeight($scope.activePage.canvas.canvasHeight);
                canvas.setWidth($scope.activePage.canvas.canvasWidth);
            }
            else {
                canvas.clear();
                canvas.renderAll();
            }


            if (page.canvas.backgroundColor) {
                $scope.addBackgroundGradient(page);
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
    //     
    //     console.log("drag success, data:", data);
    // }
    // $scope.onDropComplete = function (data, evt) {
    //     
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