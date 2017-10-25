kitchensink.service('pageFlowService', function () {
    var pageFlowService = this;

    pageFlowService.pageFlowData = {};


    pageFlowService.setPageFlowData = function (param) {
        debugger;
        pageFlowService.allPages = param;

    }


    pageFlowService.getPageFlowData = function () {
        debugger;
        return pageFlowService.pageFlowData;

    }

});