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

describe('interpolated, multiple instances', function() {
  it('should only update the instance that changed', function() {
    browser.get('http://127.0.0.1:8000/src/directives/ce-interpolated/test/multiple-instances-spec.html');

    var ngString2 = element.all(by.css('.ng-string')).get(1);
    var ngString3 = element.all(by.css('.ng-string')).last();
    
    var wcString2 = element.all(by.css('#wc-string')).get(1);
    var wcString3 = element.all(by.css('#wc-string')).last();
    
    var ngButton = element(by.id('ng-button'));
    var wcButton = element.all(by.css('#wc-button')).get(1);

    expect(ngString2.getText()).toEqual('Second string from Angular');
    expect(wcString2.getText()).toEqual('Second string from Angular');
    expect(ngString3.getText()).toEqual('Third string from Angular');
    expect(wcString3.getText()).toEqual('Third string from Angular');

    ngButton.click();
    expect(ngString2.getText()).toEqual('Second string from Angular, updated!');
    expect(wcString2.getText()).toEqual('Second string from Angular, updated!');
    expect(ngString3.getText()).toEqual('Third string from Angular, updated!');
    expect(wcString3.getText()).toEqual('Third string from Angular, updated!');

    wcButton.click();
    expect(ngString2.getText()).toEqual('String changed in Polymer');
    expect(wcString2.getText()).toEqual('String changed in Polymer');
    expect(ngString3.getText()).toEqual('Third string from Angular, updated!');
    expect(wcString3.getText()).toEqual('Third string from Angular, updated!');
  });
});