# angular-custom-elements

[![Build Status](https://travis-ci.org/robdodson/angular-custom-elements.svg?branch=master)](https://travis-ci.org/robdodson/angular-custom-elements)

Angular 1.x directive to hold all yr Custom Element bindings together 😁

*note: This is still experimental so use at your own risk*

## Install

```
npm install --save angular-custom-elements
```

## Usage

- Include the `dist/ce-bind.(min).js` script in your page.
- Add `robdodson.ce-bind` as a module dependency to your app.
- **For interpolated/two-way bindings**: Add the `ce-interpolated` directive to
any Custom Element or Polymer Element to keep your interpolated bindings in sync.

```html
<div ng-controller="MainCtrl as main">
  {{main.greeting}}
  <fancy-input message="{{main.greeting}}" ce-interpolated></fancy-input>
</div>
```

- **For one-way bindings**: Add the `ce-one-way` directive to any Custom
Element or Polymer Element, to keep its one-way bindings in sync.

```js
app.component('fooComponent', {
 template: `
   <p>Angular string is: {{$ctrl.str}}</p>
   <my-input message="$ctrl.str"
             on-message-changed="$ctrl.onMessageChanged($event)"
             ce-one-way>
   </my-input>
  `
```

## How does it work?

### Interpolated bindings

Polymer's two-way binding system is event based. Anytime a bindable property
changes it fires an event named: `[property]-changed`. For example, a two-way
bindable property named `foo` would fire a `foo-changed` event.

This means we can listen for the `*-changed` events coming off of an element,
and take the new value and pass it into our scope using `$evalAsync`.

This also means you could write your own Custom Elements that didn't use Polymer
and so long as they fired a `[property]-changed` event, and the
`event.detail.value` contained the new value, it would also work.

### One-way bindings

For Angular 1.5 style one-way bindings, we look at the Input, e.g.
`friend="$ctrl.person"`, set the property on the Custom Element using the value
from `$ctrl.person`, and create a watcher to update the Custom Element anytime
the `$ctrl.person` property changes.

For Outputs, we look for any attribute starting with `on-` and create an event
listener which triggers the corresponding handler in our Angular controller.
E.g. `on-person-changed="$ctrl.updatePerson($event)"` will listen for the
`person-changed` event and call the controller's `updatePerson` method,
passing the event object to it. The controller can then take the value of
`event.detail` and choose what to do with it. Because Custom Elements typically
communicate to the outside world using Events, this binding will **only** create
event listeners. This means you cannot use the Angular 1.5 approach of creating
a callback with named arguments:

```
// This will NOT work. The argument will be ignored and the handler
// will always be called with the event object
on-person-changed="$ctrl.updatePerson({name: 'Bob'})"
```

Instead, treat these as regular event listeners and use the value(s) passed
via `event.detail`.

## How is this different from other Polymer + Angular adapters?

The two adapters I've found are
[angular-bind-polymer](https://github.com/eee-c/angular-bind-polymer) and
[ng-polymer-elements](https://gabiaxel.github.io/ng-polymer-elements/). Both are
very cool but they have limitations which this project (hopefully) fixes.

**angular-bind-polymer** relies on Mutation Observers to notify the scope when an
element's attributes change. This only works if the element chooses to serialize
its internal state back to strings and reflect them to attributes. Most Polymer
elements do not do this, meaning they can't be used with angular-bind-polymer.

**ng-polymer-elements** attempts to create directives for specific attributes
exposed by Polymer elements but this becomes a bit of an arms race as every time
an element creates a new attribute/property then `ng-polymer-elements` needs to
be updated. It also relies on `Object.observe` which has been removed from the
platform, so an additional polyfill is required.
