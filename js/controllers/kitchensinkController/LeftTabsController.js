kitchensink.controller('LeftTabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'One',
            url: 'templates/layers.html',
            micon: 'layers',
            custom: 'images/icons.svg'
    }
  ];

    $scope.currentTab = 'templates/layers.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}])