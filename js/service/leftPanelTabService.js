kitchensink.service('leftPanelTabService', function () {
    var selfTabService = this;
    selfTabService.leftTab = [{
        title: 'Layers',
        url: 'templates/layers.html',
        micon: 'layers',
        custom: 'images/icons.svg'

    },
        {
            title: 'Pages',
            url: 'templates/pages.html',
            micon: 'pages',
            custom: 'images/icons.svg'

        }
    ];


    selfTabService.tab = selfTabService.leftTab[0];

    selfTabService.getTab = function () {


        return selfTabService.tab;

    }

    selfTabService.setTab = function (tab) {
        selfTabService.leftTab.forEach(function (tabItem) {

            if ((tab.url) && (tabItem.url == tab.url)) {
                selfTabService.tab = tab;

            }

        })


    }

});