sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.EmployeeTransfer", {
        init: function(){
            var isDebug=true;
            if(!isDebug){
                this.bindData();
            }else{
                this.bindMockData();
            }
        },
        
        bindData: function(){
            var _this = this;
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserDirectReports",
				type: "GET",
				async: true,
				success: function(drdata) {
				    var directReportsModel = new JSONModel(JSON.parse(drdata));
					_this.getView().setModel(directReportsModel, "DirectReportsModel");
				},
				error: function(){
				    alert("failed to get direct reports");
				}
			});
        },
        
        bindMockData: function(){
            var directReportsModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/directReports.json");
			var directReportsModel = new JSONModel();
			directReportsModel.loadData(directReportsModelPath, null, false);
			this.getView().setModel(directReportsModel, "directReportsModel");
        }
	});

});