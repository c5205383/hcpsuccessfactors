jQuery.sap.require("hcpsuccessfactors.util.format");
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/m/Popover",
	"sap/ui/model/json/JSONModel",
	"sap/m/Button",
	"sap/m/CheckBox"
], function(BaseController, jQuery,Fragment, Controller, Popover, JSONModel, Button, CheckBox) {
	"use strict";
	return BaseController.extend("hcpsuccessfactors.controller.detail.form.myForm", {

		onInit: function(){
			var isDebug=true;
			if(!isDebug){
				//
			}else{
				this.bindMockData();
			}
		},
		
		bindMockData: function(){
			var formModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/myforms.json");
			var formModel = new JSONModel();
			formModel.loadData(formModelPath, null, false);
			this.getView().setModel(formModel, "FormModel");
			
			this.onCollapseExapandPress();
		},
		handleResponsivePopoverPress: function (oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("hcpsuccessfactors.view.detail.form.Popover", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("/ProductCollection/0");
			}
 
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oPopover.openBy(oButton);
			});
		},
 
		handleCloseButton: function (oEvent) {
			this._oPopover.close();
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