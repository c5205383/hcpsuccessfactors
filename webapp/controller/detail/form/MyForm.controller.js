jQuery.sap.require("hcpsuccessfactors.util.format");
jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/m/Popover",
	"sap/ui/model/json/JSONModel"
], function(BaseController, jQuery, Fragment, Controller, Popover, JSONModel) {
	"use strict";
	return BaseController.extend("hcpsuccessfactors.controller.detail.form.MyForm", {

		onInit: function() {
			var isDebug = true;
			if (!isDebug) {
				//
			} else {
				this.bindMockData();
			}
		},

		bindMockData: function() {
			var formModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/myforms.json");
			var formModel = new JSONModel();
			formModel.loadData(formModelPath, null, false);
			this.getView().setModel(formModel, "FormModel");

			this.onCollapseExapandPress();
		},
		handleResponsivePopoverPress: function(oEvent) {
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("hcpsuccessfactors.view.detail.form.Popover", this);
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
			var otable = this.byId("table2-1");
			var str = CId.substring((CId.lastIndexOf("i") + 1));
			var col = parseInt(str);
			if (CBId.getSelected()) {
				// alert("yes");
				otable.getColumns()[col].setVisible(true);
				otable.getItems()[col].setVisible(true);
			} else {
				// alert("no"); 
				// var ctext = CBId.getId();
				otable.getColumns()[col].setVisible(false);
				otable.getItems()[col].setVisible(false);
			}
			/*var otable = this.getView().byId("table2-1");
			       var ctext = CBId.getText();
			       for (var i = 0; i < otable.rows[0].childNodesh.length ; i++ ){
			           if(ctext === otable.rows[0].cells[i]){
			               for (var j=0; j < otable.rows.length ; j++){
			                   otable.rows[j].cells[i].style.display = otable.rows[j].cells[i].style.display=="none"?"block":"none";
			               }
			           }
			       }*/
		},

		onItemSelect: function(oEvent) {
			var item = oEvent.getParameter('item');
			var viewId = this.getView().getId();
			sap.ui.getCore().byId(viewId + "--pageContainer").to(viewId + "--" + item.getKey());
		},

		onCollapseExapandPress: function(event) {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();
			this._setToggleButtonTooltip(sideExpanded);

			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var toggleButton = this.getView().byId('sideNavigationToggleButton');
			if (bLarge) {
				toggleButton.setTooltip('Large Size Navigation');
			} else {
				toggleButton.setTooltip('Small Size Navigation');
			}
		},
		onItemTablePress: function(oEvent) {
			//alert("click");
			var oItem = oEvent.getSource();
			var spath = oItem.getBindingContext("FormModel");
			this.getRouter().navTo("formdetail", {
				id: hcpsuccessfactors.util.StringUtil.subLastWord(spath.getPath())
			});
		}

	});

});