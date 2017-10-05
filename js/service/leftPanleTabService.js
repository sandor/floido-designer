kitchensink.service('leftPanleTabService', function () {
    var selfTabService = this;
    selfTabService.tabs = [{
            title: 'Layers',
            url: 'templates/layers.html',
            micon: 'layers',
            custom: 'images/icons.svg'
    },
        {
            title: 'Pages',
            url: 'templates/pages.html',
            micon: 'content-copy',
            custom: 'images/icons.svg'
    },
        {
            title: 'Templates',
            url: 'templates/templates.html',
            micon: 'new-releases',
            custom: 'images/icons.svg'
        }
    ];

    selfTabService.temp = 0;

    selfTabService.tab = selfTabService.tabs[0];


    // selfTabService.getTab = function (tab) {
    //
    //     selfTabService.tabs.forEach(function (tabItem) {
    //
    //         if ((tab.url) && (tabItem.url == tab.url)) {
    //             return tabItem;
    //         }
    //
    //     })
    // }

    selfTabService.getTab = function () {
        selfTabService.temp++
            debugger;
        return selfTabService.tab;

    }

    selfTabService.setTab = function (tab) {
        selfTabService.tabs.forEach(function (tabItem) {

            if ((tab.url) && (tabItem.url == tab.url)) {
                selfTabService.tab = tab;

            }

        })


    }

});
