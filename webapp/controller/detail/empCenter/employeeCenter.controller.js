sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.empCenter.employeeCenter", {
		onInit: function() {
			var isDebug = true;
			if (!isDebug) {
				//
			} else {
				this.bindMockData();
			}
		},

		bindMockData: function() {
			var usersModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/users.json");
			var usersModel = new JSONModel();
			sap.ui.getCore().getModel("UsersModel").loadData(usersModelPath, null, false);
			usersModel.loadData(usersModelPath, null, false);
			this.getView().setModel(usersModel, "UsersModel");
		},
		
		onItemPress: function(oEvent) {
			//alert("click");
			var oItem = oEvent.getSource();
			var spath = oItem.getBindingContext("UsersModel");
			this.getRouter().navTo("userDetail", {
				id: spath.getPath().substr(11)
			});
		}

	});

});