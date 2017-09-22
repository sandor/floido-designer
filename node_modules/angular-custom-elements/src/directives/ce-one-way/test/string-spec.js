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

describe('one-way, strings', function() {
  it('should have the same string', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-one-way/test/string-spec.html');

    var ngString;
    var wcString;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngString = element(by.id('ng-string'));
    wcString = element(by.id('wc-string'));
    expect(ngString.getText()).toEqual('Hello, from Angular!');
    expect(wcString.getText()).toEqual('Hello, from Angular!');

    ngButton.click();
    expect(ngString.getText()).toEqual('String changed in Angular');
    expect(wcString.getText()).toEqual('String changed in Angular');

    wcButton.click();
    expect(ngString.getText()).toEqual('String changed in Polymer');
    expect(wcString.getText()).toEqual('String changed in Polymer');
  });
});