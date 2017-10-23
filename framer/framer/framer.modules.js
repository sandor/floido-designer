require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ParallaxComponents":[function(require,module,exports){
var applyParallax, defaultParallaxOriginZ, setupParallax, updateLayerParallax,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaultParallaxOriginZ = 200;

setupParallax = function(component) {
  var axis, descendant, fn, fn1, i, j, k, l, len, len1, len2, len3, len4, m, ref, ref1, ref2, ref3, ref4, results, segment;
  ref = component.content.children;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    segment = ref[i];
    segment._initPoint = segment.point;
    if (segment._hasListeners == null) {
      segment.onChange("size", function() {
        return this._initPoint = this.point;
      });
      segment.onChange("z", function() {
        return applyParallax(component);
      });
      ref1 = ["x", "y"];
      fn = function(axis) {
        return segment.onChange(axis, function() {
          if (!this._parallaxUpdate) {
            return this._initPoint[axis] = this.point[axis];
          }
        });
      };
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        axis = ref1[j];
        fn(axis);
      }
      segment._hasListeners = true;
    }
    ref2 = segment.descendants;
    for (k = 0, len2 = ref2.length; k < len2; k++) {
      descendant = ref2[k];
      ref3 = ["x", "y"];
      for (l = 0, len3 = ref3.length; l < len3; l++) {
        axis = ref3[l];
        if (component._parallaxOrigin[axis] === null) {
          component._parallaxOrigin[axis] = segment[axis];
        }
      }
      descendant._segment = segment;
      descendant._initPoint = descendant.point;
      if (descendant._hasListeners == null) {
        descendant.onChange("size", function() {
          var len4, m, ref4, results1;
          this._initPoint = this.point;
          ref4 = ["x", "y"];
          results1 = [];
          for (m = 0, len4 = ref4.length; m < len4; m++) {
            axis = ref4[m];
            results1.push(updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin));
          }
          return results1;
        });
        descendant.onChange("z", function() {
          return applyParallax(component);
        });
        ref4 = ["x", "y"];
        fn1 = function(axis) {
          return descendant.onChange(axis, function() {
            if (!this._parallaxUpdate) {
              this._initPoint[axis] = this.point[axis];
            }
            return updateLayerParallax(this, axis, component.content[axis], component._parallaxOrigin);
          });
        };
        for (m = 0, len4 = ref4.length; m < len4; m++) {
          axis = ref4[m];
          fn1(axis);
        }
        descendant._hasListeners = true;
      }
    }
    results.push(Utils.delay(0, function() {
      return applyParallax(component);
    }));
  }
  return results;
};

updateLayerParallax = function(layer, axis, offset, origin) {
  layer._parallaxUpdate = true;
  try {
    layer[axis] = (offset + layer._segment._initPoint[axis] - origin[axis]) / origin.z * layer.z + layer._initPoint[axis];
  } catch (error) {}
  return layer._parallaxUpdate = false;
};

applyParallax = function(component, axes, offset) {
  var axis, descendant, i, len, results, segment;
  if (axes == null) {
    axes = ["x", "y"];
  }
  if (offset == null) {
    offset = 0;
  }
  results = [];
  for (i = 0, len = axes.length; i < len; i++) {
    axis = axes[i];
    results.push((function() {
      var j, len1, ref, results1;
      ref = component.content.children;
      results1 = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        segment = ref[j];
        if (segment.children.length === 0) {
          segment._parallaxUpdate = true;
          try {
            segment[axis] = offset / component._parallaxOrigin.z * segment.z + segment._initPoint[axis];
          } catch (error) {}
          results1.push(segment._parallaxUpdate = false);
        } else {
          results1.push((function() {
            var k, len2, ref1, results2;
            ref1 = segment.descendants;
            results2 = [];
            for (k = 0, len2 = ref1.length; k < len2; k++) {
              descendant = ref1[k];
              results2.push(updateLayerParallax(descendant, axis, offset, component._parallaxOrigin));
            }
            return results2;
          })());
        }
      }
      return results1;
    })());
  }
  return results;
};

exports.ParallaxScrollComponent = (function(superClass) {
  extend(ParallaxScrollComponent, superClass);

  ParallaxScrollComponent.define("parallaxOrigin", {
    "default": {
      x: null,
      y: null,
      z: defaultParallaxOriginZ
    },
    get: function() {
      return this._parallaxOrigin;
    },
    set: function(val) {
      var base, base1, base2, key;
      this._parallaxOrigin = {};
      for (key in val) {
        this._parallaxOrigin[key] = val[key];
      }
      if ((base = this._parallaxOrigin).x == null) {
        base.x = null;
      }
      if ((base1 = this._parallaxOrigin).y == null) {
        base1.y = null;
      }
      return (base2 = this._parallaxOrigin).z != null ? base2.z : base2.z = defaultParallaxOriginZ;
    }
  });

  function ParallaxScrollComponent() {
    var axis, fn, i, len, ref;
    ParallaxScrollComponent.__super__.constructor.apply(this, arguments);
    this.content.onChange("children", (function(_this) {
      return function() {
        return setupParallax(_this);
      };
    })(this));
    ref = ["x", "y", "z"];
    fn = (function(_this) {
      return function(axis) {
        return _this.content.onChange(axis, function() {
          return applyParallax(_this, axis, _this.content[axis]);
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      axis = ref[i];
      fn(axis);
    }
  }

  return ParallaxScrollComponent;

})(ScrollComponent);

exports.ParallaxPageComponent = (function(superClass) {
  extend(ParallaxPageComponent, superClass);

  ParallaxPageComponent.define("parallaxOrigin", {
    "default": {
      x: null,
      y: null,
      z: defaultParallaxOriginZ
    },
    get: function() {
      return this._parallaxOrigin;
    },
    set: function(val) {
      var base, base1, base2, key;
      this._parallaxOrigin = {};
      for (key in val) {
        this._parallaxOrigin[key] = val[key];
      }
      if ((base = this._parallaxOrigin).x == null) {
        base.x = null;
      }
      if ((base1 = this._parallaxOrigin).y == null) {
        base1.y = null;
      }
      return (base2 = this._parallaxOrigin).z != null ? base2.z : base2.z = defaultParallaxOriginZ;
    }
  });

  function ParallaxPageComponent() {
    var axis, fn, i, len, ref;
    ParallaxPageComponent.__super__.constructor.apply(this, arguments);
    this.content.onChange("children", (function(_this) {
      return function() {
        return setupParallax(_this);
      };
    })(this));
    ref = ["x", "y", "z"];
    fn = (function(_this) {
      return function(axis) {
        return _this.content.onChange(axis, function() {
          return applyParallax(_this, axis, _this.content[axis]);
        });
      };
    })(this);
    for (i = 0, len = ref.length; i < len; i++) {
      axis = ref[i];
      fn(axis);
    }
  }

  return ParallaxPageComponent;

})(PageComponent);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL0hvbWUvRGVza3RvcC9GUkFNRVJfU1RVRkYvbXVsdGlQYWdlci5mcmFtZXIvbW9kdWxlcy9teU1vZHVsZS5jb2ZmZWUiLCIuLi8uLi8uLi8uLi8uLi9Vc2Vycy9Ib21lL0Rlc2t0b3AvRlJBTUVSX1NUVUZGL211bHRpUGFnZXIuZnJhbWVyL21vZHVsZXMvUGFyYWxsYXhDb21wb25lbnRzLmNvZmZlZSIsIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsIlxuZGVmYXVsdFBhcmFsbGF4T3JpZ2luWiA9IDIwMFxuXG5zZXR1cFBhcmFsbGF4ID0gKGNvbXBvbmVudCkgLT5cblx0Zm9yIHNlZ21lbnQgaW4gY29tcG9uZW50LmNvbnRlbnQuY2hpbGRyZW5cblx0XHRzZWdtZW50Ll9pbml0UG9pbnQgPSBzZWdtZW50LnBvaW50XG5cblx0XHR1bmxlc3Mgc2VnbWVudC5faGFzTGlzdGVuZXJzP1xuXHRcdFx0IyBBZGQgbGlzdGVuZXJzIHRvIHJlY2FsY3VsYXRlIHBhcmFsbGF4IHdoZW4gc2l6ZSBvciBwb3NpdGlvbiB3YXMgbW9kaWZpZWRcblx0XHRcdHNlZ21lbnQub25DaGFuZ2UgXCJzaXplXCIsIC0+IEBfaW5pdFBvaW50ID0gQHBvaW50XG5cdFx0XHRzZWdtZW50Lm9uQ2hhbmdlIFwielwiLCAtPiBhcHBseVBhcmFsbGF4KGNvbXBvbmVudClcblxuXHRcdFx0Zm9yIGF4aXMgaW4gW1wieFwiLCBcInlcIl1cblx0XHRcdFx0ZG8gKGF4aXMpIC0+XG5cdFx0XHRcdFx0c2VnbWVudC5vbkNoYW5nZSBheGlzLCAtPlxuXHRcdFx0XHRcdFx0QF9pbml0UG9pbnRbYXhpc10gPSBAcG9pbnRbYXhpc10gdW5sZXNzIEBfcGFyYWxsYXhVcGRhdGVcblxuXHRcdFx0c2VnbWVudC5faGFzTGlzdGVuZXJzID0gdHJ1ZVxuXG5cdFx0Zm9yIGRlc2NlbmRhbnQgaW4gc2VnbWVudC5kZXNjZW5kYW50c1xuXG5cdFx0XHQjIFRyeSB0byBndWVzcyB0aGUgcmlnaHQgcGFyYWxsYXhPcmlnaW57eCx5fSBmb3IgUGFyYWxsYXhTY3JvbGxDb21wb25lbnRcblx0XHRcdGZvciBheGlzIGluIFtcInhcIiwgXCJ5XCJdXG5cdFx0XHRcdGNvbXBvbmVudC5fcGFyYWxsYXhPcmlnaW5bYXhpc10gPSBzZWdtZW50W2F4aXNdIGlmIGNvbXBvbmVudC5fcGFyYWxsYXhPcmlnaW5bYXhpc10gaXMgbnVsbFxuXG5cdFx0XHRkZXNjZW5kYW50Ll9zZWdtZW50ID0gc2VnbWVudFxuXHRcdFx0ZGVzY2VuZGFudC5faW5pdFBvaW50ID0gZGVzY2VuZGFudC5wb2ludFxuXG5cdFx0XHR1bmxlc3MgZGVzY2VuZGFudC5faGFzTGlzdGVuZXJzP1xuXHRcdFx0XHQjIEFkZCBsaXN0ZW5lcnMgdG8gcmVjYWxjdWxhdGUgcGFyYWxsYXggd2hlbiBzaXplIG9yIHBvc2l0aW9uIHdhcyBtb2RpZmllZFxuXHRcdFx0XHRkZXNjZW5kYW50Lm9uQ2hhbmdlIFwic2l6ZVwiLCAtPlxuXHRcdFx0XHRcdEBfaW5pdFBvaW50ID0gQHBvaW50XG5cdFx0XHRcdFx0Zm9yIGF4aXMgaW4gW1wieFwiLCBcInlcIl1cblx0XHRcdFx0XHRcdHVwZGF0ZUxheWVyUGFyYWxsYXgodGhpcywgYXhpcywgY29tcG9uZW50LmNvbnRlbnRbYXhpc10sIGNvbXBvbmVudC5fcGFyYWxsYXhPcmlnaW4pXG5cblx0XHRcdFx0ZGVzY2VuZGFudC5vbkNoYW5nZSBcInpcIiwgLT4gYXBwbHlQYXJhbGxheChjb21wb25lbnQpXG5cdFx0XHRcdGZvciBheGlzIGluIFtcInhcIiwgXCJ5XCJdXG5cdFx0XHRcdFx0ZG8gKGF4aXMpIC0+XG5cdFx0XHRcdFx0XHRkZXNjZW5kYW50Lm9uQ2hhbmdlIGF4aXMsIC0+XG5cdFx0XHRcdFx0XHRcdEBfaW5pdFBvaW50W2F4aXNdID0gQHBvaW50W2F4aXNdIHVubGVzcyBAX3BhcmFsbGF4VXBkYXRlXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZUxheWVyUGFyYWxsYXgodGhpcywgYXhpcywgY29tcG9uZW50LmNvbnRlbnRbYXhpc10sIGNvbXBvbmVudC5fcGFyYWxsYXhPcmlnaW4pXG5cblx0XHRcdFx0ZGVzY2VuZGFudC5faGFzTGlzdGVuZXJzID0gdHJ1ZVxuXG5cdFx0IyBVZ2x5IHdvcmthcm91bmQ6IFdhaXQgdW50aWwgbmV4dCB0aWssIHNvIGFsbCBjaGlsZHJlbi9kZXNjZW5kYW50cyBhcmUgZ3VhcmFudGVlZCB0byBiZSByZWFkeVxuXHRcdFV0aWxzLmRlbGF5IDAsIC0+IGFwcGx5UGFyYWxsYXgoY29tcG9uZW50KVxuXG5cbiMgQXBwbHkgLyB1cGRhdGUgcGFyYWxsYXggb2Ygc2luZ2xlIGxheWVyXG51cGRhdGVMYXllclBhcmFsbGF4ID0gKGxheWVyLCBheGlzLCBvZmZzZXQsIG9yaWdpbikgLT5cblx0bGF5ZXIuX3BhcmFsbGF4VXBkYXRlID0gdHJ1ZVxuXHR0cnkgbGF5ZXJbYXhpc10gPSAob2Zmc2V0ICsgbGF5ZXIuX3NlZ21lbnQuX2luaXRQb2ludFtheGlzXSAtIG9yaWdpbltheGlzXSkgLyBvcmlnaW4ueiAqIGxheWVyLnogKyBsYXllci5faW5pdFBvaW50W2F4aXNdXG5cdGxheWVyLl9wYXJhbGxheFVwZGF0ZSA9IGZhbHNlXG5cblxuIyBBcHBseSAvIHVwZGF0ZSBwYXJhbGxheCBvZiBhbGwgbGF5ZXJzXG5hcHBseVBhcmFsbGF4ID0gKGNvbXBvbmVudCwgYXhlcyA9IFtcInhcIiwgXCJ5XCJdLCBvZmZzZXQgPSAwKSAtPlxuXHRmb3IgYXhpcyBpbiBheGVzXG5cdFx0Zm9yIHNlZ21lbnQgaW4gY29tcG9uZW50LmNvbnRlbnQuY2hpbGRyZW5cblx0XHRcdGlmIHNlZ21lbnQuY2hpbGRyZW4ubGVuZ3RoIGlzIDBcblx0XHRcdFx0c2VnbWVudC5fcGFyYWxsYXhVcGRhdGUgPSB0cnVlXG5cdFx0XHRcdHRyeSBzZWdtZW50W2F4aXNdID0gb2Zmc2V0IC8gY29tcG9uZW50Ll9wYXJhbGxheE9yaWdpbi56ICogc2VnbWVudC56ICsgc2VnbWVudC5faW5pdFBvaW50W2F4aXNdXG5cdFx0XHRcdHNlZ21lbnQuX3BhcmFsbGF4VXBkYXRlID0gZmFsc2Vcblx0XHRcdGVsc2Vcblx0XHRcdFx0Zm9yIGRlc2NlbmRhbnQgaW4gc2VnbWVudC5kZXNjZW5kYW50c1xuXHRcdFx0XHRcdHVwZGF0ZUxheWVyUGFyYWxsYXgoZGVzY2VuZGFudCwgYXhpcywgb2Zmc2V0LCBjb21wb25lbnQuX3BhcmFsbGF4T3JpZ2luKVxuXG5cbmNsYXNzIGV4cG9ydHMuUGFyYWxsYXhTY3JvbGxDb21wb25lbnQgZXh0ZW5kcyBTY3JvbGxDb21wb25lbnRcblxuXHRAZGVmaW5lIFwicGFyYWxsYXhPcmlnaW5cIixcblx0XHRkZWZhdWx0OiB7eDogbnVsbCwgeTogbnVsbCwgejogZGVmYXVsdFBhcmFsbGF4T3JpZ2luWn0sXG5cdFx0Z2V0OiAtPiBAX3BhcmFsbGF4T3JpZ2luXG5cdFx0c2V0OiAodmFsKSAtPlxuXHRcdFx0QF9wYXJhbGxheE9yaWdpbiA9IHt9XG5cdFx0XHRmb3Iga2V5IG9mIHZhbFxuXHRcdFx0XHRAX3BhcmFsbGF4T3JpZ2luW2tleV0gPSB2YWxba2V5XVxuXG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luLnggPz0gbnVsbFxuXHRcdFx0QF9wYXJhbGxheE9yaWdpbi55ID89IG51bGxcblx0XHRcdEBfcGFyYWxsYXhPcmlnaW4ueiA/PSBkZWZhdWx0UGFyYWxsYXhPcmlnaW5aXG5cblxuXHRjb25zdHJ1Y3RvcjogLT5cblx0XHRzdXBlclxuXG5cdFx0QGNvbnRlbnQub25DaGFuZ2UgXCJjaGlsZHJlblwiLCA9PiBzZXR1cFBhcmFsbGF4KHRoaXMpXG5cblx0XHRmb3IgYXhpcyBpbiBbXCJ4XCIsIFwieVwiLCBcInpcIl1cblx0XHRcdGRvIChheGlzKSA9PiBAY29udGVudC5vbkNoYW5nZSBheGlzLCA9PiBhcHBseVBhcmFsbGF4KHRoaXMsIGF4aXMsIEBjb250ZW50W2F4aXNdKVxuXG5cbmNsYXNzIGV4cG9ydHMuUGFyYWxsYXhQYWdlQ29tcG9uZW50IGV4dGVuZHMgUGFnZUNvbXBvbmVudFxuXG5cdEBkZWZpbmUgXCJwYXJhbGxheE9yaWdpblwiLFxuXHRcdGRlZmF1bHQ6IHt4OiBudWxsLCB5OiBudWxsLCB6OiBkZWZhdWx0UGFyYWxsYXhPcmlnaW5afSxcblx0XHRnZXQ6IC0+IEBfcGFyYWxsYXhPcmlnaW5cblx0XHRzZXQ6ICh2YWwpIC0+XG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luID0ge31cblx0XHRcdGZvciBrZXkgb2YgdmFsXG5cdFx0XHRcdEBfcGFyYWxsYXhPcmlnaW5ba2V5XSA9IHZhbFtrZXldXG5cblx0XHRcdEBfcGFyYWxsYXhPcmlnaW4ueCA/PSBudWxsXG5cdFx0XHRAX3BhcmFsbGF4T3JpZ2luLnkgPz0gbnVsbFxuXHRcdFx0QF9wYXJhbGxheE9yaWdpbi56ID89IGRlZmF1bHRQYXJhbGxheE9yaWdpblpcblxuXG5cdGNvbnN0cnVjdG9yOiAtPlxuXHRcdHN1cGVyXG5cblx0XHRAY29udGVudC5vbkNoYW5nZSBcImNoaWxkcmVuXCIsID0+IHNldHVwUGFyYWxsYXgodGhpcylcblxuXHRcdGZvciBheGlzIGluIFtcInhcIiwgXCJ5XCIsIFwielwiXVxuXHRcdFx0ZG8gKGF4aXMpID0+IEBjb250ZW50Lm9uQ2hhbmdlIGF4aXMsID0+IGFwcGx5UGFyYWxsYXgodGhpcywgYXhpcywgQGNvbnRlbnRbYXhpc10pXG5cblxuI1RPRE86IGFkZCBQYXJhbGxheEZsb3dDb21wb25lbnQgXG5cblxuIiwiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFFQUE7QURDQSxJQUFBLHlFQUFBO0VBQUE7OztBQUFBLHNCQUFBLEdBQXlCOztBQUV6QixhQUFBLEdBQWdCLFNBQUMsU0FBRDtBQUNmLE1BQUE7QUFBQTtBQUFBO09BQUEscUNBQUE7O0lBQ0MsT0FBTyxDQUFDLFVBQVIsR0FBcUIsT0FBTyxDQUFDO0lBRTdCLElBQU8sNkJBQVA7TUFFQyxPQUFPLENBQUMsUUFBUixDQUFpQixNQUFqQixFQUF5QixTQUFBO2VBQUcsSUFBQyxDQUFBLFVBQUQsR0FBYyxJQUFDLENBQUE7TUFBbEIsQ0FBekI7TUFDQSxPQUFPLENBQUMsUUFBUixDQUFpQixHQUFqQixFQUFzQixTQUFBO2VBQUcsYUFBQSxDQUFjLFNBQWQ7TUFBSCxDQUF0QjtBQUVB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
