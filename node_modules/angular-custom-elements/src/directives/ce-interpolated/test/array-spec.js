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

describe('interpolated, arrays', function() {
  it('should have the same array', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-interpolated/test/array-spec.html');
    
    var ngArrayItems;
    var wcArrayItems;
    var ngButton = element(by.id('ng-button'));
    var wcButton = element(by.id('wc-button'));

    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Alice');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Alice');
    });

    ngButton.click();
    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Paul');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Paul');
    });

    wcButton.click();
    ngArrayItems = element.all(by.css('.ng-array-item'));
    ngArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Sam');
    });
    wcArrayItems = element.all(by.css('.wc-array-item'));
    wcArrayItems.last().getText().then(function(text) {
      expect(text).toEqual('Sam');
    });
  });
});