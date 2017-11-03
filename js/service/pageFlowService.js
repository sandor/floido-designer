kitchensink.service('pageFlowService', function () {
    var pageFlowService = this;

  


    // if (isEmpty(dropAreas)) {
    //     debugger;
    //     pageFlowService.pageFlowData = {};
    // } else {
    //     debugger;
    //     pageFlowService.pageFlowData = dropAreas;
    // }




    pageFlowService.setPageFlowData = function (param) {
        debugger;
        pageFlowService.allPages = param;

    }


    pageFlowService.getPageFlowData = function () {
        debugger;
        pageFlowService.setOpenedPageFlowData();
        debugger;
        return pageFlowService.pageFlowData;

    }

    pageFlowService.setOpenedPageFlowData = function () {
        debugger;
        if (isEmpty(dropAreas)) {
            pageFlowService.pageFlowData = {};
        } else {
            pageFlowService.pageFlowData = dropAreas;
        }

    }

});