
kitchensink.controller('CanvasControls', function ($scope) {
    
        $scope.canvas = canvas;
        $scope.getActiveStyle = getActiveStyle;
    
        addAccessors($scope);
        watchCanvas($scope);
    
    
    
        // Editing manipulating the Canvas Size
        // ================================================================
    
    
    
    
        $scope.setMySize = function () {
            var setWidth = document.getElementById('myWidth').value;
            var setHeight = document.getElementById('myHeight').value;
            canvas.setWidth(setWidth);
            canvas.setHeight(setHeight);
            console.log(setWidth, setHeight);
            canvas.calcOffset();
        };
    
        $scope.presetSizes = [{
                name: 'iPad Landscape',
                height: 768,
                width: 1024
        },
            {
                name: 'iPad Portrait',
                height: 1024,
                width: 766
        },
            {
                name: 'iPad Pro Landscape',
                height: 1024,
                width: 1366
        },
            {
                name: 'iPad Pro Portrait',
                height: 1366,
                width: 1024
        }
      ];
    
    
        $scope.setCanvasSize = function (width, height) {
            canvas.setWidth(width);
            canvas.setHeight(height);
            canvas.calcOffset();
            console.log("resising now...");
    
        };
    
    
    })