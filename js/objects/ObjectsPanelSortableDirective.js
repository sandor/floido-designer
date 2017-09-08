angular.module('ImageEditor')

.directive('edObjectsPanelSortable', ['$rootScope', 'canvas', function ($rootScope, canvas) {
    return {
        link: function ($scope, el) {
            var oldIndex, newIndex, obj;

            el.sortable({
                items: '.object:visible',
                scroll: false,
                containment: 'parent',
                start: function(e, ui) {
                    //oldIndex = $(ui.item).index();
                    ui.item.data('start', ui.item.index());
                },
                update: function(e, ui) {
                    //newIndex = $(ui.item).index();
                    
                    var start = ui.item.data('start'),
                        end   = ui.item.index();

                    canvas.fabric._objects.splice(end, 0,
                        canvas.fabric._objects.splice(start, 1)[0]);
                    $scope.objects = canvas.fabric._objects;

                    $scope.$apply();

                    console.log($scope.objects);

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

                    $rootScope.$apply(function() {
                        canvas.fabric.renderAll();
                        start = false;
                    });
                }
            })
        }
    };
}]);
