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

describe('interpolated, objects', function() {
  it('should have the same sub-property', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-interpolated/test/object-spec.html');

    var ngObject;
    var wcObject;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngObject = element(by.id('ng-object'));
    wcObject = element(by.id('wc-object'));
    expect(ngObject.getText()).toEqual('Lisa');
    expect(wcObject.getText()).toEqual('Lisa');

    ngButton.click();
    expect(ngObject.getText()).toEqual('Joe');
    expect(wcObject.getText()).toEqual('Joe');

    wcButton.click();
    expect(ngObject.getText()).toEqual('Alex');
    expect(wcObject.getText()).toEqual('Alex');
  });
});