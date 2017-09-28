kitchensink.controller('LeftTabsCtrl', ['$scope', function ($scope) {
    $scope.tabs = [{
            title: 'Layers',
            url: 'templates/layers.html',
            micon: 'layers',
            custom: 'images/icons.svg'

    },
        {
            title: 'Pages',
            url: 'templates/pages.html',
            micon: 'pages',
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
