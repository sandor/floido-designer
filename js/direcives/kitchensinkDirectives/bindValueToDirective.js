'use strict';

var kitchensink = angular.module('kitchensink', ['ui.sortable']);

/*kitchensink.config(function($interpolateProvider) {
  $interpolateProvider
    .startSymbol('{[')
    .endSymbol(']}');
});*/



kitchensink.directive('bindValueTo', function () {
    return {
        restrict: 'A',

        link: function ($scope, $element, $attrs) {
            ;
            var prop = capitalize($attrs.bindValueTo),
                getter = 'get' + prop,
                setter = 'set' + prop;

            $element.on('change keyup select', function () {
                if ($element[0].type !== 'checkbox') {
                    if (typeof ($element[0].value) == "string" && $element[0].value.search("hsl") != -1) {
                        this.value = $element[0].value;
                    }

                    if ($element[0]._shadowRoot.getElementById('tracks') != undefined) {
                        //// tracker 
                        this.value = $element[0]._shadowRoot.getElementById('tracks').childNodes[3].scrollWidth;
                    }

                    //line below added for buinding works  with xel-toolkit.org
                    if ($element[0].type == 'input') {
                        this.value = Number($element[0]._shadowRoot.getElementById('editor').innerText);
                    }

                    if ($element[0]._shadowRoot.getElementById('tracks') == undefined && $element[0]._shadowRoot.getElementById('editor') && typeof (Number($element[0]._shadowRoot.getElementById('editor').innerText)) == "number") {
                        this.value = Number($element[0]._shadowRoot.getElementById('editor').innerText);
                    }

                    $scope[setter] && $scope[setter](this.value);
                }
            });

            $element.on('click', function () {
                if ($element[0].type === 'checkbox') {
                    if ($element[0].checked) {
                        $scope[setter] && $scope[setter](true);
                    } else {
                        $scope[setter] && $scope[setter](false);
                    }
                }
            })

            $scope.$watch($scope[getter], function (newVal) {
                ;
                if ($element[0].type === 'radio') {
                    var radioGroup = document.getElementsByName($element[0].name);
                    for (var i = 0, len = radioGroup.length; i < len; i++) {
                        radioGroup[i].checked = radioGroup[i].value === newVal;
                    }
                } else if ($element[0].type === 'checkbox') {
                    $element[0].checked = newVal;
                } else if ($element.length > 0 && $element[0] && $element[0].tagName == "X-NUMBERINPUT") {
                    newVal = (newVal == " " || newVal == "" || newVal == '') ? 0 : Number(newVal);
                    $element[0].value = newVal;
                }
                else {
                    newVal && !isEmpty(newVal) && $element.val(newVal);
                }
            });
            PagesControllerScope && PagesControllerScope.refreshSavePage();
        }

    };

});
