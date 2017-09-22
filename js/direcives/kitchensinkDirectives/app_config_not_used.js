//  var kitchensink = angular.module('kitchensink', ['ui.sortable', 'electangular']);

// /*kitchensink.config(function($interpolateProvider) {
//   $interpolateProvider
//     .startSymbol('{[')
//     .endSymbol(']}');
// });*/

// kitchensink.directive('bindValueTo', function () {
//     return {
//         restrict: 'A',

//         link: function ($scope, $element, $attrs) {

//             var prop = capitalize($attrs.bindValueTo),
//                 getter = 'get' + prop,
//                 setter = 'set' + prop;

//             $element.on('change keyup select', function () {
//                 if ($element[0].type !== 'checkbox') {
//                     $scope[setter] && $scope[setter](this.value);
//                 }
//             });

//             $element.on('click', function () {
//                 if ($element[0].type === 'checkbox') {
//                     if ($element[0].checked) {
//                         $scope[setter] && $scope[setter](true);
//                     } else {
//                         $scope[setter] && $scope[setter](false);
//                     }
//                 }
//             })

//             $scope.$watch($scope[getter], function (newVal) {
//                 if ($element[0].type === 'radio') {
//                     var radioGroup = document.getElementsByName($element[0].name);
//                     for (var i = 0, len = radioGroup.length; i < len; i++) {
//                         radioGroup[i].checked = radioGroup[i].value === newVal;
//                     }
//                 } else if ($element[0].type === 'checkbox') {
//                     $element[0].checked = newVal;
//                 } else {
//                     $element.val(newVal);
//                 }
//             });
//         }
//     };
// });

// kitchensink.directive('objectButtonsEnabled', function () {
//     return {
//         restrict: 'A',

//         link: function ($scope, $element, $attrs) {
//             $scope.$watch($attrs.objectButtonsEnabled, function (newVal) {

//                 $($element).find('.btn-object-action')
//                     .prop('disabled', !newVal);
//             });
//         }
//     };
// });

// kitchensink.directive('edObjectsPanelSortable', ['$rootScope', function ($rootScope) {
//     return {
//         link: function ($scope, el) {
//             var oldIndex, newIndex, obj;

//             el.sortable({
//                 items: '.object:visible',
//                 scroll: false,
//                 containment: 'parent',
//                 start: function (e, ui) {
//                     //oldIndex = $(ui.item).index();
//                     ui.item.data('start', ui.item.index());
//                 },
//                 update: function (e, ui) {
//                     //newIndex = $(ui.item).index();

//                     var start = ui.item.data('start'),
//                         end = ui.item.index();

//                     canvas.fabric._objects.splice(end, 0,
//                         canvas.fabric._objects.splice(start, 1)[0]);
//                     $scope.objects = canvas._objects;

//                     $scope.$apply();

//                     console.log($scope.objects);

//                     obj = canvas.getObjects()[start];

//                     if (!obj) return;

//                     if (end > start) {
//                         //send object forwards by the amount of objects it passed
//                         for (var i = 0; i < (end - start); i++) {
//                             canvas.bringForward(obj);
// 							canvas.renderAll();
//                         }
//                     } else {
//                         //send object backwards by the amount of objects it passed
//                         for (var i = 0; i < (start - end); i++) {
//                             canvas.sendBackwards(obj);
// 							canvas.renderAll();
//                         }
//                     }

//                     $rootScope.$apply(function () {
//                         canvas.renderAll();
//                         start = false;
//                     });
//                 }
//             })
//         }
//     };
// }]);
