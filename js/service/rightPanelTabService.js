kitchensink.service('rightPanelTabService', function () {
    var selfTabService = this;
    selfTabService.rightTab = [
        {
            title: 'Inspector',
            url: 'templates/inspectorTab.html',
            micon: 'settings',
            custom: 'images/icons.svg'

        },
        {
            title: 'Assets Library',
            url: 'templates/assests.html',
            micon: 'image',
            custom: 'images/icons.svg'

        }
        ,
        {
            title: 'export',
            url: 'templates/export.html',
            micon: 'get-app',
            custom: 'images/icons.svg'

        }
    ];


    selfTabService.tab = selfTabService.rightTab[0];



    selfTabService.getTab = function () {
        
        return selfTabService.tab;

    }

    selfTabService.setTab = function (tab) {
        selfTabService.rightTab.forEach(function (tabItem) {

            if ((tab.url) && (tabItem.url == tab.url)) {
                selfTabService.tab = tab;

            }

        })


    }

});