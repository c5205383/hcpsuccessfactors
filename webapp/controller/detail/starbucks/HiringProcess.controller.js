sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/ui/core/mvc/Controller",
	"sap/m/Popover"
], function(BaseController, jQuery, Fragment, Dialog,Controller, Popover) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.HiringProcess", {
		onCheckBoxPressed: function() {
			var oLabel = sap.ui.getCore().byId("reason1");
			var oTextarea = sap.ui.getCore().byId("reason2");
			if (oLabel.getVisible() && oTextarea.getVisible()) {
				oLabel.setVisible(false);
				oTextarea.setVisible(false);
			} else {
				oLabel.setVisible(true);
				oTextarea.setVisible(true);
			}
		},
		onInit: function() {
		    
		},
		handleResponsivePopoverPress: function(oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("hcpsuccessfactors.view.detail.starbucks.HiringPopover", this);
				this.getView().addDependent(this._oPopover);
				this._oPopover.bindElement("/ProductCollection/0");
			}

			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function() {
				this._oPopover.openBy(oButton);
			});
		},
		changeCheckbox: function(oEvent) {
			var CId = oEvent.getSource().getId();
			var CBId = sap.ui.getCore().byId(CId);
			var otable = this.byId("hiringtable");
			var str = CId.substring((CId.lastIndexOf("i") + 1));
			var col = parseInt(str);
			if (CBId.getSelected()) {
				otable.getColumns()[col].setVisible(true);
				otable.getItems()[col].setVisible(true);
			} else {
				otable.getColumns()[col].setVisible(false);
				otable.getItems()[col].setVisible(false);
			}
		},
		handleTableSelectDialogPress: function(oEvent) {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("hcpsuccessfactors.view.detail.starbucks.Dialog", this);
			}

			this.getView().addDependent(this._oDialog);
			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);

			this._oDialog.open();
		},
		onCloseDialog: function (oEvent) {
			this._oDialog.close();
		},
		onPress: function(oEvent) {
			this.getRouter().navTo("myShop", {});
		}
	});

});