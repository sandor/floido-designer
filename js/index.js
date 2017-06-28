angular.module('example', [
	'common.fabric',
	'common.fabric.utilities',
	'common.fabric.constants'
])

.controller('ExampleCtrl', ['$scope', 'Fabric', 'FabricConstants', 'Keypress', function($scope, Fabric, FabricConstants, Keypress) {

	$scope.fabric = {};
	$scope.FabricConstants = FabricConstants;

	//
	// Creating Canvas Objects
	// ================================================================
	$scope.addShape = function(path) {
		$scope.fabric.addShape('http://fabricjs.com/assets/15.svg');
	};

	$scope.addImage = function(image) {
		$scope.fabric.addImage('http://stargate-sg1-solutions.com/blog/wp-content/uploads/2007/08/daniel-season-nine.jpg');
	};

	$scope.addImageUpload = function(data) {
		var obj = angular.fromJson(data);
		$scope.addImage(obj.filename);
	};

	//
	// Editing Canvas Size
	// ================================================================
	$scope.selectCanvas = function() {
		$scope.canvasCopy = {
			width: $scope.fabric.canvasOriginalWidth,
			height: $scope.fabric.canvasOriginalHeight
		};
	};

	$scope.setCanvasSize = function() {
		$scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
		$scope.fabric.setDirty(true);
		delete $scope.canvasCopy;
	};

	//
	// Init
	// ================================================================
	$scope.init = function() {
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

	Keypress.onSave(function() {
		$scope.updatePage();
	});

}]);