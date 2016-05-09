sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.MyShop", {
		onInit: function() {
			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("/sfsfdataservice/hcp/getUserDirectReports");
			// this.getView().setModel(oModel);
			var _this = this;
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
			});
		},

		onPress: function(oEvent) {
			this.getRouter().navTo("hiringProcess", {});
		},

		onChange: function(oEvent) {
			var text = oEvent.getParameter("selectedItem").getText();
		//	var _this = this;
            var oActive = this.byId("ActiveList");
            var oInactive = this.byId("InactiveList");
			if (text === "Active" && oInactive.getVisible()) {
			oActive.setVisible(true);
			oInactive.setVisible(false);
			oInactive.destroyItems();
			}
			if(text !== "Active" && oActive.getVisible()){
			    oActive.setVisible(false);
			
			var data = JSON.parse(localStorage.getItem('userinfo'));
				for(var i = 0;i < data.length;i++){
				    var itemList = new sap.m.StandardListItem({
				        title: "Name: "+ data[i].fullname,
				        info: "Position: " + data[i].title
				    });
				    oInactive.addItem(itemList);
				    oInactive.setVisible(true);
				}
			}
		}
	});
});