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

describe('interpolated, ng-if', function() {
  it('should receive binding as ng-if is toggled', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-interpolated/test/ng-if-spec.html');

    var ngString = element(by.id('ng-string'));
    var wcString = element(by.id('wc-string'));
    var ngCheckbox = element(by.id('ng-checkbox'));
    var wcButton = element(by.id('wc-button'));

    ngCheckbox.click();
    expect(ngString.getText()).toEqual('Hello, from Angular!');
    expect(wcString.getText()).toEqual('Hello, from Angular!');

    wcButton.click();
    expect(ngString.getText()).toEqual('String changed in Polymer');
    expect(wcString.getText()).toEqual('String changed in Polymer');
  });
});