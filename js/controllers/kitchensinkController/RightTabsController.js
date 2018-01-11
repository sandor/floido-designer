
kitchensink.controller('RightTabsCtrl', ['$scope', function ($scope, $timeout) {


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
            if (document.getElementById("flow_cols")) {
                document.getElementById("flow_cols").setAttribute('disabled', 'true');
                document.getElementById("flow_rows").setAttribute('disabled', 'true');
            }

        }
        //document.getElementById("objectIn-canvas-background-colorselect").value = canvasObjectBackColor;
    }

    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentLeftTab;
    }

    $scope.setProjectSize = function () {

        var setWidth = document.getElementById('myWidth').value;
        var setHeight = document.getElementById('myHeight').value;

        projectSettings.projectSettingsWidth = setWidth
        projectSettings.projectSettingsHeight = setHeight


        // projectSettings: {
        //     leftColor: document.getElementById('gradLeft') ? document.getElementById('gradLeft').value : "#ffffff",
        //         rightColor: document.getElementById('gradRight') ? document.getElementById('gradRight').value : "#ffffff",
        //             dropAreas: dropAreas,
        //                 projectSettingsWidth: projectSettings.projectSettingsWidth ? projectSettings.projectSettingsWidth : 1024,
        //                     projectSettingsHeight: projectSettings.projectSettingsHeight ? projectSettings.projectSettingsHeight : 768,
        //                         projectSettingsName: projectSettings.projectSettingsName ? projectSettings.projectSettingsName : "Project Name",
        //                             projectSettingsDescription: projectSettings.projectSettingsDescription ? projectSettings.projectSettingsDescription : "Project Description"
        // },
        // pages: PagesControllerScope && PagesControllerScope.objects ? PagesControllerScope.objects :
        //     [{
        //         pageSettings: {
        //             name: 'Page 1',
        //             thumbnail: 'project/assets/thumbnails/page1.png',
        //             path: 'project/pages/'
        //         },
        //         canvas: {
        //             canvasWidth: canvas ? canvas.width : 1024,
        //             canvasHeight: canvas ? canvas.height : 768,
        //             canvasData: canvas.toJSON()

        //         }
        //     }]




        canvas.setWidth(setWidth);
        canvas.setHeight(setHeight);
        console.info(setWidth, setHeight);
        canvas.calcOffset();
        //pageFlowScope.setPageFlowItemAspectRatio();

    };

    $scope.setPageSize = function () {
        debugger;
        let currentPage;
        var setWidth = document.getElementById('myWidth').value;
        var setHeight = document.getElementById('myHeight').value;
        if (PagesControllerScope) {
            debugger;
            PagesControllerScope.activePage.canvas.canvasHeight = setHeight;
            PagesControllerScope.activePage.canvas.canvasWidth = setWidth;

        } {
            currentPage = lastLoadedProject.pages[lastLoadedProject.pages.length - 1]
            canvas.setWidth(setWidth);
            canvas.setHeight(setHeight);
            currentPage.canvas.canvasHeight = setHeight;
            currentPage.canvas.canvasWidth = setWidth;
            canvas.calcOffset();

            layersControllerScope.clearObject();

        }

        setTimeout(() => {
            PagesControllerScope && PagesControllerScope.refreshSavePage();
        }, 0)


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

