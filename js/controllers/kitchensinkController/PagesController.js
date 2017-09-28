// Layer panel test implementation
// ================================================================

kitchensink.controller('PagesController', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
    
       $scope.objects = [{
                name: 'Page 1',
                thumbnail: 'project/assets/thumbnails/page1.png',
                path: 'project/pages/'
        },
            {
                name: 'Page 2',
                thumbnail: 'project/assets/thumbnails/page2.png',
                path: 'project/pages/'
        },
            {
                name: 'Page 3',
                thumbnail: 'project/assets/thumbnails/page3.png',
                path: 'project/pages/'
        },
            {
                name: 'Page 4',
                thumbnail: 'project/assets/thumbnails/page4.png',
                path: 'project/pages/'
        }
      ];
    
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
    }])