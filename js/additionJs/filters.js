(function() {
    var $ = function(id){return document.getElementById(id)};
  
    function applyFilter(index, filter) {
      var obj = canvas.getActiveObject();
      obj.filters[index] = filter;
      var timeStart = +new Date();
      obj.applyFilters();
      canvas.renderAll();
    }
  
    function getFilter(index) {
      var obj = canvas.getActiveObject();
      return obj.filters[index];
    }
  
    function applyFilterValue(index, prop, value) {
      var obj = canvas.getActiveObject();
      if (obj.filters[index]) {
        obj.filters[index][prop] = value;
        var timeStart = +new Date();
        obj.applyFilters();
        canvas.renderAll();
      }
    }
  
  
    f = fabric.Image.filters;
  
    canvas.on({
      'object:selected': function() {
        fabric.util.toArray(document.getElementsByTagName('input'))
                            .forEach(function(el){ el.disabled = false; })
  
        var filters = ['grayscale', 'sepia', 'brightness', 'contrast', 'saturation',
                        'blur', 'blend-color', 'hue'];
  
        for (var i = 0; i < filters.length; i++) {
          filters[i] && (
          $(filters[i]).checked = !!canvas.getActiveObject().filters[i]);
        }
      },
      'selection:cleared': function() {
        fabric.util.toArray(document.getElementsByTagName('input'))
        .forEach(function(el){ el.disabled = true; })
      }
    });
  
    var indexF;


    $('blackwhite').onclick = function() {
      applyFilter(19, this.checked && new f.BlackWhite());
    };
    $('grayscale').onclick = function() {
      applyFilter(0, this.checked && new f.Grayscale());
    };
    $('invert').onclick = function() {
      applyFilter(1, this.checked && new f.Invert());
    };
    $('sepia').onclick = function() {
      applyFilter(3, this.checked && new f.Sepia());
    };
    $('brightness').onclick = function () {
      applyFilter(5, this.checked && new f.Brightness({
        brightness: parseFloat($('brightness-value').value)
      }));
    };
    $('brightness-value').oninput = function() {
      applyFilterValue(5, 'brightness', parseFloat(this.value));
    };
    $('contrast').onclick = function () {
      applyFilter(6, this.checked && new f.Contrast({
        contrast: parseFloat($('contrast-value').value)
      }));
    };
    $('contrast-value').oninput = function() {
      applyFilterValue(6, 'contrast', parseFloat(this.value));
    };
    $('saturation').onclick = function () {
      applyFilter(7, this.checked && new f.Saturation({
        saturation: parseFloat($('saturation-value').value)
      }));
    };
    $('saturation-value').oninput = function() {
      applyFilterValue(7, 'saturation', parseFloat(this.value));
    };
    $('blur').onclick = function() {
      applyFilter(11, this.checked && new f.Blur({
        value: parseFloat($('blur-value').value)
      }));
    };
    $('blur-value').oninput = function() {
      applyFilterValue(11, 'blur', parseFloat(this.value, 10));
    };
    $('blend').onclick= function() {
      applyFilter(16, this.checked && new f.BlendColor({
        color: document.getElementById('blend-color').value,
        mode: document.getElementById('blend-mode').value,
        alpha: document.getElementById('blend-alpha').value
      }));
    };
  
    $('blend-mode').onchange = function() {
      applyFilterValue(16, 'mode', this.value);
    };
  
    $('blend-color').onchange = function() {
      applyFilterValue(16, 'color', this.value);
    };
  
    $('blend-alpha').oninput = function() {
      applyFilterValue(16, 'alpha', this.value);
    };
  
    $('hue').onclick= function() {
      applyFilter(21, this.checked && new f.HueRotation({
        rotation: document.getElementById('hue-value').value,
      }));
    };
  
    $('hue-value').oninput = function() {
      applyFilterValue(21, 'rotation', this.value);
    };
    var imageElement = document.createElement('img');
    imageElement.src = '../images/woman.png';
    var fImage = new fabric.Image(imageElement);
    fImage.scaleX = 1;
    fImage.scaleY = 1;
    fImage.top = 15;
    fImage.left = 15;
  })();