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
                // if (document.getElementById("page-flow-button").hasAttribute('toggled')) {
                if (document.getElementById("page-flow-button").hasAttribute("toggled")) {
                    document.getElementById("flow_cols").removeAttribute('disabled');
                    document.getElementById("flow_rows").removeAttribute('disabled');
                }

                $scope.setPageFlowRowAndColumn();

                //store projetc settings data to projectSettings variable in jsFromIndex
                // $scope.getProjectSettings();
                // }

                $scope.setProjectSettings();


            }, 30)
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

    $scope.setMySize = function () {
        //;
        var setWidth = document.getElementById('myWidth').value;
        var setHeight = document.getElementById('myHeight').value;
        canvas.setWidth(setWidth);
        canvas.setHeight(setHeight);
        console.info(setWidth, setHeight);
        canvas.calcOffset();
        pageFlowScope.setPageFlowItemAspectRatio();


    };
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

    ///set project settings page flow  row and column count after openeing project///
    $scope.setPageFlowRowAndColumn = () => {
        if (currentActiveLeftTab.title == "projectSettings") {

            let rowCount = 0;
            let colCount = 0;
            for (let keydropAreaLine in dropAreas) {
                rowCount++;
                colCount = dropAreas[keydropAreaLine].length;
            }


            document.getElementById("flow_cols").value = colCount == 0 ? 4 : colCount;
            document.getElementById("flow_rows").value = rowCount == 0 ? 3 : rowCount;

        }

    }
    $scope.getProjectSettings = () => {
        if (currentActiveLeftTab.title == "projectSettings") {
            projectSettings.projectSettingsWidth = document.getElementById("myWidth").value;
            projectSettings.projectSettingsHeight = document.getElementById("myHeight").value;
            projectSettings.projectSettingsName = document.getElementById("project-sett-name").value;
            projectSettings.projectSettingsDescription = document.getElementById("project-sett-description").value;

        }


    }

    $scope.setProjectSettings = () => {
        if (currentActiveLeftTab.title == "projectSettings") {
            document.getElementById("myWidth").value = projectSettings.projectSettingsWidth ? projectSettings.projectSettingsWidth : 1024;
            document.getElementById("myHeight").value = projectSettings.projectSettingsHeight ? projectSettings.projectSettingsHeight : 768;
            document.getElementById("project-sett-name").value = projectSettings.projectSettingsName ? projectSettings.projectSettingsName : "Project Name";
            document.getElementById("project-sett-description").value = projectSettings.projectSettingsDescription ? projectSettings.projectSettingsDescription : "Project Description";
        }
    }

    //$scope.columnsCount = columnsCount;
    //////////////

    rightTabControllerScope = $scope;
}])
// function columnsCount(params) {


// }

// // bind-value-to="fontSize"

rightTabControllerScope = {};

