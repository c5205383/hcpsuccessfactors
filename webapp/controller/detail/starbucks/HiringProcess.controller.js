sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/ui/core/mvc/Controller",
	"sap/m/Popover"
], function(BaseController, jQuery, Fragment, Dialog, Controller, Popover) {
	"use strict";

	var array = [];
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
			var len = otable.getItems().length;
			var i, j;
			if (CBId.getSelected()) {
				otable.getColumns()[col].setVisible(true);
				for (i = 0; i < len; i++) {
					otable.getItems()[i].getCells()[col].setVisible(true);
				}
			} else {
				otable.getColumns()[col].setVisible(false);
				for (j = 0; j < len; j++) {
					otable.getItems()[j].getCells()[col].setVisible(false);
				}
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

		onCloseDialog: function(oEvent) {
			this._oDialog.close();
		},

		onOKDialog: function() {
			var oTable = this.byId("hiringtable");
			var itemList = new sap.m.ColumnListItem({});
			itemList.setType("Active");
			/*itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item7").getSelected().toString(),
					wrapping: false
				}));
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item1").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item2").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item3").getSelectedItem().getText(),
					wrapping: false
				}));
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item8").getSelectedItem().getText(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item5").getValue(),
					wrapping: false
				}));
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item6").getValue(),
					wrapping: false
				}));

			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item9").getSelectedItem().getText(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item10").getValue(),
					wrapping: false
				}));

			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item4").getValue(),
					wrapping: false
				}));
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("item11").getValue(),
					wrapping: false
				}));*/
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_uname").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_uid").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_eid").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_fn").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_ln").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_gender").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_init").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_company").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_job").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_start").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_status").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_unit").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_manger").getValue(),
					wrapping: false
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: sap.ui.getCore().byId("hp_event").getValue(),
					wrapping: false
				})
			);
			oTable.addItem(itemList);
			this.onCloseDialog();
		},

		onBack: function() {
			//  var name = [];
			//  var position = [];
			var i;
			var otable = this.byId("hiringtable");
			for (i = 0; i < otable.getItems().length; i++) {
				//  var add = "{fullname:" + otable.getItems()[i].getCells()[5].getText() + ", Title:" + otable.getItems()[i].getCells()[3].getText() + "}";
				//  data.push(add);
				var currentUser = {};
				currentUser.fullname = otable.getItems()[i].getCells()[5].getText();
				currentUser.title = otable.getItems()[i].getCells()[3].getText();
				array.push(currentUser);
			}
			/*   var data = JSON.stringify({
						FullName : name,
						Title : position
		    });*/
			localStorage.setItem("userinfo", JSON.stringify(array));
			this.onNavBack();
			otable.destroyItems();

		},

		onBackCancel: function() {
			var otable = this.byId("hiringtable");
			this.onNavBack();
			otable.destroyItems();

		}
	});

});