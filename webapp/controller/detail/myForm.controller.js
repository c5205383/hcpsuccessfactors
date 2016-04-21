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
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();
 
			this._setToggleButtonTooltip(sideExpanded);
 
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},
 
		_setToggleButtonTooltip : function(bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		}

	});

});