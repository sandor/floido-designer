kitchensink.controller('RightTabsCtrl', ['$scope', function ($scope) {

    const { dialog } = require('electron').remote;

    var fs = require('fs');


    $scope.hasShadow;
    $scope.leftTab = [{
        title: 'projectSettings',
        url: 'templates/project_menu.html',
        micon: 'phonelink-setup',
        custom: 'images/icons.svg'
    }, {
        title: 'pageSettings',
        url: 'templates/page_menu.html',
        micon: 'insert-drive-file',
        custom: 'images/icons.svg'
    }, {
        title: 'elementLayout',
        url: 'templates/layout_menu.html',
        micon: 'perm-data-setting',
        custom: 'images/icons.svg'
    }, {
        title: 'elementStyling',
        url: 'templates/style_menu.html',
        micon: 'style',
        custom: 'images/icons.svg'
    }, {
        title: 'typography',
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

    $scope.currentLeftTab = 'templates/style_menu.html';
    currentActiveLeftTab = $scope.currentLeftTab;

    $scope.onClickLeftTab = function (tab) {
        currentActiveLeftTab = tab;
        $scope.currentLeftTab = tab.url;
        if (tab.title == 'projectSettings') {
            setTimeout(function () {
                if (document.getElementById("page-flow-button").hasAttribute('toggled')) {
                    document.getElementById("flow_cols").removeAttribute('disabled');
                    document.getElementById("flow_rows").removeAttribute('disabled');

                }
            }, 0)

        }
        else {
            document.getElementById("flow_cols").setAttribute('disabled', 'true');
            document.getElementById("flow_rows").setAttribute('disabled', 'true');

        }
        //document.getElementById("objectIn-canvas-background-colorselect").value = canvasObjectBackColor;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentLeftTab;
    }

    $scope.getInputState = function () {
        return canvas._activeObject ? false : true;
    }

    function download(text, name, type) {
        var a = document.createElement("a");
        var file = new Blob([text], { type: type });
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    var fileSavedPath = "";



    $scope.columnsCount = columnsCount;


    //////////////

}])
function columnsCount(params) {


}

// bind-value-to="fontSize"