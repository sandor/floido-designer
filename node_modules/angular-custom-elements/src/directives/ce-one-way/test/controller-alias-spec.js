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

describe('one-way, use given controller alias', function() {

  it('should have the same sub-property, with no ctrl alias', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-one-way/test/controller-alias-spec.html');
    runTestFor('#test1');
  });

  it('should have the same sub-property, with simple "ctrl" alias', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-one-way/test/controller-alias-spec.html');
    runTestFor('#test2');
  });

  it('should have the same sub-property, with "$ctrl" alias', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-one-way/test/controller-alias-spec.html');
    runTestFor('#test3');
  });

  it('should have the same sub-property, with "$$$_ctrl42$$$" alias', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-one-way/test/controller-alias-spec.html');
    runTestFor('#test4');
  });
});

function runTestFor(selector) {
  var ngObject;
  var wcObject;
  var ngButton = element(by.css(selector + ' > button'));

  // TODO: Deep selector /deep/ has been deprecated. Find another way.
  var wcButton = element(by.css(selector + ' /deep/ #wc-button'));


  ngObject = element(by.css(selector + ' > p > span'));
  wcObject = element(by.css(selector + ' /deep/ #wc-object'));
  expect(ngObject.getText()).toEqual('Lisa');
  expect(wcObject.getText()).toEqual('Lisa');

  ngButton.click();
  expect(ngObject.getText()).toEqual('Joe');
  expect(wcObject.getText()).toEqual('Joe');

  wcButton.click();
  expect(ngObject.getText()).toEqual('Alex');
  expect(wcObject.getText()).toEqual('Alex');
}
