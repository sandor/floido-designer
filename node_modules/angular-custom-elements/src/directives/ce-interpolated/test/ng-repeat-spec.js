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

describe('interpolated, ng-repeat', function() {
  it('should update the value in the local and parent scopes', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-interpolated/test/ng-repeat-spec.html');
    
    var ngItem = element.all(by.css('.ng-repeat-item')).last();
    var wcItem = element.all(by.css('.wc-repeat-item')).last();
    var parentItem = element(by.id('parent-item'));
    var wcButton = element.all(by.css('.wc-button')).last();
    var ngButton = element.all(by.css('.ng-button')).last();

    ngItem.getText().then(function(text) {
      expect(text).toEqual('Alice');
    });
    wcItem.getText().then(function(text) {
      expect(text).toEqual('Alice');
    });
    expect(parentItem.getAttribute('value')).toEqual('Alice');

    ngButton.click();
    ngItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng');
    });
    wcItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng');
    });
    expect(parentItem.getAttribute('value')).toEqual('Alice-ng');

    wcButton.click();
    ngItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng-poly');
    });
    wcItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng-poly');
    });
    expect(parentItem.getAttribute('value')).toEqual('Alice-ng-poly');

    parentItem.sendKeys('-abc');
    ngItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng-poly-abc');
    });
    wcItem.getText().then(function(text) {
      expect(text).toEqual('Alice-ng-poly-abc');
    });
    expect(parentItem.getAttribute('value')).toEqual('Alice-ng-poly-abc');
  });
});