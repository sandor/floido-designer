kitchensink.controller('bgContrl', ["$scope", function ($scope) {
    $scope.change = 'data';
    $scope.getVal = function () {

        console.log($scope.changedVal);
        $scope.change = $scope.changedVal;
    }
}])
