Framer.Defaults.Layer.force2d = true;


var loadDocs, structure;

loadDocs = (items) => {
    var createLayer, itemName, layerMap, layers, validProps;
    layers = [];
    layerMap = {};
    validProps = ['brightness', 'blur', 'height', 'opacity', 'rotation', 'rotationX', 'rotationY', 'rotationZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'width', 'x', 'y', 'visible', 'cornerRadius'];
    createLayer = (name, info, superLayer) => {
        var child, i, j, layerFrame, layerInfo, layerType, len, len1, p, ref, ref1, subview, totalHeight, totalWidth, type, view;
        console.log("createLayer", name, info, superLayer);
        layerInfo = {
            clip: true
        };
        // Fill in the view name
        info.name = name;
        // Image
        if (info.image) {
            name = info.image.filename || info.name;
            type = info.imageType || "png";
            layerInfo.image = "images/" + name + "." + type;
        }
        if (info.scroll) {
            layerType = ScrollComponent;
        } else {
            layerType = Layer;
            layerFrame = info.layerFrame;
        }
        // If this layer group has a mask, we take the mask bounds
        // as the frame and clip the layer
        if (info.maskFrame) {
            layerFrame = info.maskFrame;
            layerInfo.clip = true;
            // If the layer name has "scroll" we make this a scroll view
            if (info.name.toLowerCase().indexOf("scroll") !== -1) {
                layerType = ScrollComponent;
            }

            // If the layer name has "paging" we make this a paging view
            if (info.name.toLowerCase().indexOf("paging") !== -1) {
                layerType = PageComponent;
            }
        }
        view = new layerType(layerInfo);
        view.frame = layerFrame;
        // If the view has a contentview (like a scrollview) we add it
        // to that one instead.
        if (superLayer && superLayer.contentView) {
            view.superLayer = superLayer.contentView;
        } else {
            view.superLayer = superLayer;
        }
        // Basic configuration
        view.name = info.name;
        view.layerInfo = info;
        // Iterate through properties
        validProps.forEach((prop, index) => {
            if (info.hasOwnProperty(prop)) {
                return view[prop] = info[prop];
            }
        });
        // Apply manual styles
        if (info.css) {
            ref = info.css;
            for (i = 0, len = ref.length; i < len; i++) {
                p = ref[i];
                view.style[p] = info.css[p];
            }
        }
        // If there's HTML content defined, set it
        if (info.html) {
            view.html = info.html;
        }
        // Special properties
        if (info.hasOwnProperty("clickable")) {
            view.style["pointer-events"] = info.clickable ? "auto" : "none";
        } else {
            view.style["pointer-events"] = 'auto';
        }
        if (info.bg != null) {
            view.backgroundColor = info.bg;
        } else if (info.backgroundColor != null) {
            view.backgroundColor = info.backgroundColor;
        } else {
            view.backgroundColor = "transparent";
        }
        // If there are data attributes, store them
        // Used for future reference (eg: target position or scale)
        if (info.data) {
            view.data = info.data;
        }
        // If the layer name contains draggable we create a draggable for this layer
        if (info.name.toLowerCase().indexOf("draggable") !== -1 || info.draggable) {
            view.draggable.enabled = true;
        }
        // Add to array and name map and create layers
        layers.push(view);
        layerMap[info.name] = view;
        for (child in info.children) {
            createLayer(child, info.children[child], view);
        }
        // Make dimensions of non-image layers with children
        // and no specificed dimensions fit their children
        if (info.children) {
            if (!info.height || !info.width) {
                totalHeight = 0;
                totalWidth = 0;
                ref1 = view.subViews;
                for (j = 0, len1 = ref1.length; j < len1; j++) {
                    child = ref1[j];
                    subview = view.subViews[child];
                    totalHeight = Math.max(totalHeight, subview.y + subview.height);
                    totalWidth = Math.max(totalWidth, subview.x + subview.width);
                }
                if (!info.height) {
                    view.height = totalHeight;
                }
                if (!info.width) {
                    return view.width = totalWidth;
                }
            }
        }
    };
    // Loop through all the passed items
    for (itemName in items) {
        createLayer(itemName, items[itemName]);
    }
    return layerMap;
};

structure = {
    wrapper: {
        width: 1024,
        height: 768,
        x: 0,
        y: 0,
        backgroundColor: "#dddddd",
        children: {
            topBar: {
                width: 500,
                height: 500,
                x: 500,
                y: 50,
                backgroundColor: "#ff0000"
            },
            bottomBar: {
                width: 250,
                height: 250,
                x: 50,
                y: 300,
                cornerRadius: 10,
                backgroundColor: "#00ff00"
            }
        }
    }
};

loadDocs(structure);