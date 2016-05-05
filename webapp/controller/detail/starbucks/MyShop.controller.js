sap.ui.define([
	"hcpsuccessfactors/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.MyShop", {
		onPress: function(oEvent) {
			this.getRouter().navTo("hiringProcess", {});
		}
	});

});