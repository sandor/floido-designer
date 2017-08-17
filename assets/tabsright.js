angular.module('example', [])

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
}]);