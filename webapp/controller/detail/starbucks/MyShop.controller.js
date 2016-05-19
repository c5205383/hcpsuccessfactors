sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.MyShop", {
		onInit: function() {
			var DRModel = new JSONModel();
			DRModel.loadData("/sfsfdataservice/hcp/getUserDirectReports");
			this.getView().setModel(DRModel, "DRModel");
			
			//var InactiveModel = new JSONModel();
			//InactiveModel.loadData();
			//this.getView().setModel(InactiveModel, "InactiveModel");
			
			/*var _this = this;
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserDirectReports",
				type: "GET",
				async: true,
				success: function(tdata) {
					var oModel = new JSONModel(JSON.parse(tdata));
					_this.getView().setModel(oModel);
				},
				error: function() {
					alert("failed to get MyShop.");
				}
			});*/
		},

		onAddButtonPress: function( /*oEvent*/ ) {
			this.getRouter().navTo("hiringProcess", {});
		},

		onActiveChange: function(oEvent) {
			var selectValue = oEvent.getParameter("selectedItem").getText();
			if (selectValue === "Active") {
                //
			} else {
                //
			}
		}

	});
});