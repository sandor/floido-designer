kitchensink.service('pageFlowService', function () {
    var pageFlowService = this;




    pageFlowService.setPageFlowData = function (param) {

        pageFlowService.allPages = param;

    }


    pageFlowService.getPageFlowData = function () {

        pageFlowService.setOpenedPageFlowData();

        return pageFlowService.pageFlowData;

    }

    pageFlowService.setOpenedPageFlowData = function () {

        if (isEmpty(dropAreas)) {
            pageFlowService.pageFlowData = {};
        } else {
            pageFlowService.pageFlowData = dropAreas;
        }

    }

});