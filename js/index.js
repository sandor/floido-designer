angular.module('example', [
	'common.fabric',
	'common.fabric.utilities',
	'common.fabric.constants'
])

.controller('ExampleCtrl', ['$scope', 'Fabric', 'FabricConstants', 'Keypress', function ($scope, Fabric, FabricConstants, Keypress) {

	$scope.fabric = {};
	$scope.FabricConstants = FabricConstants;

	//
	// Creating Canvas Objects
	// ================================================================
	$scope.addShape = function (path) {
		$scope.fabric.addShape('http://fabricjs.com/assets/15.svg');
	};

	$scope.addImage = function (image) {
		$scope.fabric.addImage('http://stargate-sg1-solutions.com/blog/wp-content/uploads/2007/08/daniel-season-nine.jpg');
	};

	$scope.addImageUpload = function (data) {
		var obj = angular.fromJson(data);
		$scope.addImage(obj.filename);
	};

	//
	// Editing Canvas Size
	// ================================================================
	$scope.selectCanvas = function () {
		$scope.canvasCopy = {
			width: $scope.fabric.canvasOriginalWidth,
			height: $scope.fabric.canvasOriginalHeight
		};
	};

	$scope.setCanvasSize = function () {
		$scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
		$scope.fabric.setDirty(true);
		delete $scope.canvasCopy;
	};

	//
	// Init
	// ================================================================
	$scope.init = function () {
		$scope.fabric = new Fabric({
			JSONExportProperties: FabricConstants.JSONExportProperties,
			textDefaults: FabricConstants.textDefaults,
			shapeDefaults: FabricConstants.shapeDefaults,
			rectDefaults: FabricConstants.rectDefaults,
			canvasDefaults: FabricConstants.canvasDefaults,
			activeGroup: FabricConstants.activeGroup,
			json: {}
		});
	};

	$scope.$on('canvas:created', $scope.init);

	Keypress.onSave(function () {
		$scope.updatePage();
	});

}])

.controller('TabsCtrl', ['$scope', function ($scope) {
	$scope.tabs = [{
			title: 'One',
			url: 'templates/project_menu.html',
			ticon: 'phonelink-setup',
			custom: 'images/icons.svg'
        }, {
			title: 'insert-drive-file',
			url: 'templates/page_menu.html',
			ticon: 'insert-drive-file',
			custom: 'images/icons.svg'
        }, {
			title: 'Three',
			url: 'templates/layout_menu.html',
			ticon: 'perm-data-setting',
			custom: 'images/icons.svg'
    }, {
			title: 'Four',
			url: 'templates/style_menu.html',
			ticon: 'style',
			custom: 'images/icons.svg'
    }, {
			title: 'Five',
			url: 'templates/text_menu.html',
			ticon: 'format-size',
			custom: 'images/icons.svg'
    }, {
			title: 'Six',
			url: 'templates/actions_menu.html',
			ticon: 'stars',
			custom: 'images/icons.svg'
    }

				  ];

	$scope.currentTab = 'templates/project_menu.html';

	$scope.onClickTab = function (tab) {
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function (tabUrl) {
		return tabUrl == $scope.currentTab;
	}
}])

;
