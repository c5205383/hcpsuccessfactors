sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/mvc/Controller",
	"sap/m/Popover",
	"sap/m/Button"
], function(BaseController, jQuery, Controller, Popover, Button) {
	"use strict";
	return BaseController.extend("hcpsuccessfactors.controller.detail.myForm", {

		onInit: function() {

		},

		onCollapseExapandPress: function(event) {
			var navigationList = this.getView().byId("navigationList");
			var expanded = !navigationList.getExpanded();

			navigationList.setExpanded(expanded);
			navigationList.setWidth(expanded ? "20rem" : "3rem");
		}

	});

});