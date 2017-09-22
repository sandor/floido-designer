kitchensink.directive('objectButtonsEnabled', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            $scope.$watch($attrs.objectButtonsEnabled, function (newVal) {

                $($element).find('.btn-object-action')
                    .prop('disabled', !newVal);
            });
        }
    };
});