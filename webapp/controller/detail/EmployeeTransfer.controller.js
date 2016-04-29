sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/m/Button",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(BaseController,jQuery, Button, MessageToast, Controller, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.EmployeeTransfer", {

		onInit: function() {
			// set explored app's demo model on this sample
		//	var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
		//	this.getView().setModel(oModel);

            var isDebug=true;
            if(!isDebug){
                this.bindData();
            }else{
                this.bindMockData();
            }

			// add buttons with javaScript (yet not possible with XML views)
			var oHeaderSelect = this.byId("selectId");
			var fnOnPress = function(oEvt) {
				MessageToast.show("Executed " + oEvt.getSource().getText());
				oHeaderSelect.close();
			};
			oHeaderSelect.addButton(
				new Button({
					text: "Search by Name",
					press: fnOnPress
				})
			);
			this.onButtonPressed();
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
        },
        
		onButtonPressed : function(){
		    var oLayout = this.byId("SelectLayout");
		    if(oLayout.getVisible()){
		        oLayout.setVisible(false);
		    }
		    else{
		        oLayout.setVisible(true);     
		    }
		}
		
	});

});