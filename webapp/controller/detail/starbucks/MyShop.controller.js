sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.MyShop", {
		onInit: function() {
			var DRModel = new JSONModel();
			this.getView().setModel(DRModel, "DRModel");
			
			this.loadData();
			
			//var InactiveModel = new JSONModel();
			//InactiveModel.loadData();
			//this.getView().setModel(InactiveModel, "InactiveModel");
		},
		
        onRefreshPressed: function() {
            this.loadData();    
        },
        
        loadData: function(){
			this.byId("ActiveList").setVisible(false);
            this.showBusyIndicator(true);
			//this.getView().getModel("DRModel").loadData("/sfsfdataservice/hcp/getUserDirectReports", null, true);
			var _this = this;
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserDirectReports",
				type: "GET",
				async: true,
				success: function(drdata) {
				    _this.getView().getModel("DRModel").setData(JSON.parse(drdata));
				},
				error: function() {
					console.error("failed to get MyShop.");
				},
				complete: function() {
				    _this.showBusyIndicator(false);
			        _this.byId("ActiveList").setVisible(true);
				}
			});
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
		},
		
        showBusyIndicator: function(busy) {
			this.busyIndicator = this.getView().byId("flexBox");
			this.busyIndicator.setVisible(busy);
		},
		
		onListItemPress: function(oEvent) {
			var oItem = oEvent.getSource();
			var uid = oItem.getBindingContext("DRModel").getObject().userId;
			this.getRouter().navTo("navToMyProfile", {
				id: uid
			});
		}
		
	});
});