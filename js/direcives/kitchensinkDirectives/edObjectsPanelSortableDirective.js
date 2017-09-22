kitchensink.directive('edObjectsPanelSortable', ['$rootScope', function ($rootScope) {
    return {
        link: function ($scope, el) {
            var oldIndex, newIndex, obj;

            el.sortable({
                items: '.object:visible',
                scroll: false,
                containment: 'parent',
                start: function (e, ui) {
                    //oldIndex = $(ui.item).index();
                    ui.item.data('start', ui.item.index());
                },
                update: function (e, ui) {
                    //newIndex = $(ui.item).index();

                    var start = ui.item.data('start'),
                        end = ui.item.index();

                    canvas.fabric._objects.splice(end, 0,
                        canvas.fabric._objects.splice(start, 1)[0]);
                    $scope.objects = canvas._objects;

                    $scope.$apply();

                    console.log($scope.objects);

                    obj = canvas.getObjects()[start];

                    if (!obj) return;

                    if (end > start) {
                        //send object forwards by the amount of objects it passed
                        for (var i = 0; i < (end - start); i++) {
                            canvas.bringForward(obj);
							canvas.renderAll();
                        }
                    } else {
                        //send object backwards by the amount of objects it passed
                        for (var i = 0; i < (start - end); i++) {
                            canvas.sendBackwards(obj);
							canvas.renderAll();
                        }
                    }

                    $rootScope.$apply(function () {
                        canvas.renderAll();
                        start = false;
                    });
                }
            })
        }
    };
}]);