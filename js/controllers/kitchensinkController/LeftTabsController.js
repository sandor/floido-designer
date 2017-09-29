kitchensink.controller('LeftTabsCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
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
        debugger;
        $scope.currentTab = tab.url;

    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }

}])
