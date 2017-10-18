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