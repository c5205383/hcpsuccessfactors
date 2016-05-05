sap.ui.define([
	"hcpsuccessfactors/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.HiringProcess", {
	onCheckBoxPressed: function() {
			var oHbox = this.byId("reason");
			if (oHbox.getVisible()) {
				oHbox.setVisible(false);
			} else {
				oHbox.setVisible(true);
			}
		},
		onInit: function() {
			this.onCheckBoxPressed();
		}
	});

});