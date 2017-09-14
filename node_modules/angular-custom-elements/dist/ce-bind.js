;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('angular'));
  } else {
    root.returnExports = factory(root.angular);
  }
}(this, function(angular) {
/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

angular.module('robdodson.ce-bind', []);
/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @desc Enable two-way/interpolated data bindings for Angular + Custom Elements
 * @example <fancy-input message="{{main.greeting}}" ce-interpolated></fancy-input>
 */
angular
  .module('robdodson.ce-bind')
  .directive('ceInterpolated', ['$parse', ceInterpolated]);

// Make Angular 1.x interpolated bindings work.
// Finds interpolated bindings and sets up event listeners
// to hear when the underlying Polymer property updates.
// Because Polymer's interpolated binding system is event based
// we can listen for the [prop]-changed event dispatched
// by a Polymer element and apply the new value to the
// controller's scope.
// This also works for vanilla Custom Elements so long as
// they dispatch a [prop]-changed event where
// event.detail.value equals the new value
function ceInterpolated($parse) {
  return {
    restrict: 'A',
    scope: false,
    compile: function($element, $attrs) {
      var attrMap = {};

      for (var prop in $attrs) {
        if (angular.isString($attrs[prop])) {
          var _match = $attrs[prop].match(/\{\{\s*([\.\w]+)\s*\}\}/);
          if (_match) {
            attrMap[prop] = $parse(_match[1]);
          }
        }
      }

      return function($scope, $element, $attrs) {

        function applyChange(event) {
          var attributeName, newValue, oldValue, getter;
          // Figure out what changed by the event type
          // Convert the event from dash-case to camelCase with $normalize
          // So we can get it out of the attrMap
          attributeName = $attrs.$normalize(
            event.type.substring(0, event.type.indexOf('-changed'))
          );

          if (attributeName in attrMap) {
            // When you modify an array or object using Polymer's set methods,
            // the `prop-changed` event's detail will contain a `path` property;
            // in that case the `value` is the value at that path.
            if (event.detail && event.detail.path) {
              newValue = event.target.get(event.detail.path.split('.')[0]);
            } else {
              newValue = event.detail.value;
            }
            getter = attrMap[attributeName];
            setter = getter.assign;
            oldValue = getter($scope);

            if (!angular.equals(newValue, oldValue) && angular.isFunction(setter)) {
              $scope.$evalAsync(function($scope) {
                if (angular.isArray(newValue)) {
                  // FIXME: This is probably not going to work if we're
                  // mutating the array inside of an ng-repeat. Probably
                  // need to mutate the original array being referenced
                  // so we don't shadow the property on the prototype by
                  // assigning a new object 
                  setter($scope, newValue);
                } else if (angular.isObject(newValue)) {
                  Object.assign(oldValue, newValue);
                } else {
                  setter($scope, newValue);
                }
              });
            }
          }
        }

        // Convert Angular camelCase property to dash-case
        function denormalize(str) {
          return str.replace(/[A-Z]/g, function(c) {
            return '-' + c.toLowerCase();
          });
        }

        for (var prop in attrMap) {
          $element[0].addEventListener(denormalize(prop) + '-changed', applyChange);
        }

        $scope.$on('$destroy', function() {
          for (var prop in attrMap) {
            $element[0].removeEventListener(denormalize(prop) + '-changed', applyChange);
          }
        });
      }
    }
  };
}
/**
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @desc Enable unidirectional data bindings for Angular 1.5 components
 * @example <my-input message="$ctrl.str"
             on-message-changed="$ctrl.onMessageChanged($event)"
             ce-one-way>
           </my-input>
 */
angular
  .module('robdodson.ce-bind')
  .directive('ceOneWay', ceOneWay);

// Make Angular 1.5, one-way bindings work.
// Data is always copied before it is passed into the
// child to prevent the child from modifying state in
// the parent. Because Polymer/Custom Elements don't
// have a notion of passing callbacks in, an Output
// is treated as a regular event handler and passed
// the CustomEvent dispatched by the element
function ceOneWay() {
  return {
    restrict: 'A',
    scope: false,
    compile: function($element, $attrs) {

      // parse an expression and returns its metadata
      var parse = (function () {
        var cache = {};

        return function parse(expression) {
          if (cache[expression]) {
            return cache[expression];
          }

          var matchedPattern = expression.match(/((.*)\.)?(\w*)\((.*)\)/);

          // matchedPattern[0] = expression
          // matchedPattern[1] = controller alias (with dot) i.e. "$ctrl." or "undefined" for non-aliased controllers
          // matchedPattern[2] = controller alias (without dot) i.e. "$ctrl" or "undefined" for non-aliased controllers
          // matchedPattern[3] = event handler
          // matchedPattern[4] = event handler params (i.e. "$event, a, b, c")

          return cache[expression] = {
            handler: matchedPattern[3],
            controllerAlias: matchedPattern[2]
          };
        };
      })();

      // Find the controller alias associated with the $scope
      function getCtrlAlias(expression) {
        var parsedExpression = parse(expression);
        if (parsedExpression) {
          return parsedExpression.controllerAlias;
        }
      }

      // Find the event handler associated with the $ctrl
      function getHandler(expression) {
        var parsedExpression = parse(expression);
        if (parsedExpression) {
          return parsedExpression.handler;
        }
      }

      // Remove Angular's camelCasing of event names and
      // strip on- prefix
      function getEvent(expression) {
        var event = denormalize(expression);
        return event.replace('on-', '');
      }

      // Convert Angular camelCase property to dash-case
      function denormalize(str) {
        return str.replace(/[A-Z]/g, function(c) {
          return '-' + c.toLowerCase();
        });
      }

      // Setup event handler and return a deregister function
      // to be used during $destroy
      function createHandler($scope, element, event, handler, ctrlScope) {
        var listener = function(e) {
          $scope.$evalAsync(handler.bind(ctrlScope, e));
        }
        element.addEventListener(event, listener);
        return function() {
          element.removeEventListener(event, listener);
        }
      }

      return function($scope, $element, $attrs) {
        // Store event handler remover functions in
        // here and use on $destroy
        var cleanup = [];

        // Setup an event handler to act as an output
        // Since elements communicate to the outside world
        // using events, we'll simulate angular's '&'
        // output callbacks using regular event handlers
        function makeOutput(handlerName, eventName) {
          var handler = getHandler(handlerName);
          var ctrlAlias = getCtrlAlias(handlerName);
          var ctrlScope = ($scope[ctrlAlias] || $scope);
          var event = getEvent(eventName);
          var removeHandler = createHandler(
            $scope,
            $element[0],
            event,
            ctrlScope[handler],
            ctrlScope
          );
          cleanup.push(removeHandler);
        }

        // Setup a watcher on the controller property
        // and create a copy when setting data on the
        // element so it can't mutate the parent's data
        // TODO: Don't do a deep watch. Differentiate
        // based on object type and use watchCollection
        function makeInput(ctrlProp, elProp) {
          $scope.$watch(ctrlProp, function(value) {
            if (angular.isArray(value)) {
              $element[0][elProp] = value.slice(0);
            } else if (angular.isObject(value)) {
              $element[0][elProp] = Object.assign({}, value);
            } else {
              $element[0][elProp] = value;
            }
          }, true);
        }

        // Iterate over element attributes and look for one way
        // inputs or outputs
        for (var prop in $attrs) {
          if (angular.isString($attrs[prop]) && $attrs[prop] !== '') {
            // Look for an Output like
            // ==> on-foo="doBar()"
            // ==> on-foo="$ctrl.doBar()"
            // Note that angular's $attr object will camelCase things beginning
            // with "on-". So on-foo becomes onFoo
            if (prop.substr(0, 2) === 'on' && $attrs[prop].indexOf('(') !== -1) {
              makeOutput($attrs[prop], prop);
            } else {
              makeInput($attrs[prop], prop);
            }
          }
        }

        // Listen for $destroy event and remove all event
        // listeners. $watchers should be automatically removed
        // so don't need to do any work there
        $scope.$on('$destroy', function() {
          cleanup.forEach(function(removeFn) {
            removeFn();
          });
        });

      };
    }
  }
}

return 'robdodson.ce-bind';
}));
