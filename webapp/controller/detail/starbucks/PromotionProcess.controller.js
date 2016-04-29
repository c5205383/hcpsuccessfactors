sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/m/Button",
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.PromotionProcess", {
		onInit: function() {
			this.onButtonPressed();
			this.onButtonPressedData();
		},

		onButtonPressed: function() {
			var oLayout = this.byId("PromotionProcess");
			if (!oLayout.getVisible()) {
				oLayout.setVisible(true);
			} else {
				oLayout.setVisible(false);
			}
		},
		onButtonPressedData: function() {
			var oLayout = this.byId("DispayPromotionData");
			if (oLayout.getVisible()) {
				oLayout.setVisible(false);
			} else {
				oLayout.setVisible(true);
			}
		},
		redoPromotion: function() {

		},
		addPromotion: function() {

		}

	});

});