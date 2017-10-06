kitchensink.controller('RightTabsCtrl', ['$scope', function ($scope) {
    $scope.hasShadow;
    $scope.leftTab = [{
        title: 'One',
        url: 'templates/project_menu.html',
        micon: 'phonelink-setup',
        custom: 'images/icons.svg'
    }, {
        title: 'insert-drive-file',
        url: 'templates/page_menu.html',
        micon: 'insert-drive-file',
        custom: 'images/icons.svg'
    }, {
        title: 'Three',
        url: 'templates/layout_menu.html',
        micon: 'perm-data-setting',
        custom: 'images/icons.svg'
    }, {
        title: 'Four',
        url: 'templates/style_menu.html',
        micon: 'style',
        custom: 'images/icons.svg'
    }, {
        title: 'Five',
        url: 'templates/text_menu.html',
        micon: 'format-size',
        custom: 'images/icons.svg'
    }, {
        title: 'Six',
        url: 'templates/actions_menu.html',
        micon: 'stars',
        custom: 'images/icons.svg'
    }

    ];

    $scope.currentLeftTab = 'templates/page_menu.html';

    $scope.onClickLeftTab = function (tab) {

        $scope.currentLeftTab = tab.url;
        //document.getElementById("objectIn-canvas-background-colorselect").value = canvasObjectBackColor;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentLeftTab;
    }

    $scope.getInputState = function () {
        return canvas._activeObject ? false : true;
    }



}])