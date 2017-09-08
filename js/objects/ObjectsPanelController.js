angular.module('ImageEditor')

.controller('ObjectsPanelController', ['$scope', '$rootScope', '$timeout', 'canvas', function($scope, $rootScope, $timeout, canvas) {
	$scope.objects = canvas.fabric._objects || [];

    $scope.sortableOptions = {
        items: '.object:visible',
        scroll: false,
        containment: 'parent',
        start: function(e, ui) {
            ui.item.data('start', ui.item.index());
        },
        update: function(e, ui) {
            var start = ui.item.data('start'),
            end   = ui.item.index();

           
            obj = canvas.fabric.getObjects()[start];

            if ( ! obj) return;

            if (end > start) {
                //send object forwards by the amount of objects it passed
                for (var i = 0; i < (end - start); i++) {
                    canvas.fabric.bringForward(obj);
                }
            } else {
                //send object backwards by the amount of objects it passed
                for (var i = 0; i < (start - end); i++) {
                    canvas.fabric.sendBackwards(obj);
                }
            }
               
            $timeout(function() {
                canvas.fabric.renderAll();
                start = false; end = false;
            });
        },
    }

    $scope.setAsActive = function(object) {
        if (object) {
            canvas.fabric.setActiveObject(object);
        }
    };

    $scope.toggleVisibility = function(object) {
        if ( ! object) return;

        if (object.visible) {
            object.set({ visible: false, evented: false, selectable: false, hasBorders: false, hasCorners: false });
        } else {
            object.set({ visible: true, evented: true, selectable: true, hasBorders: true, hasCorners: true });
            canvas.fabric.setActiveObject(object);
        }

        canvas.fabric.renderAll();
    };

    $scope.deleteObject = function(object) {
        if (object) {
            canvas.fabric.remove(object);
            canvas.fabric.renderAll();
        }
    };

    $scope.toggleLock = function(object) {
        if ( ! object) return;

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

            canvas.fabric.setActiveObject(object);
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

        canvas.fabric.renderAll();
    }
}]);