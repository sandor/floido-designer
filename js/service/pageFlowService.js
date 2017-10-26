kitchensink.service('pageFlowService', function () {
    var pageFlowService = this;

    pageFlowService.pageFlowData = {};


    pageFlowService.setPageFlowData = function (param) {
        pageFlowService.allPages = param;

    }


    pageFlowService.getPageFlowData = function () {
        return pageFlowService.pageFlowData;

    }

});