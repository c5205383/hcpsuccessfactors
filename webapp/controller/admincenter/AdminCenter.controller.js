/**
 * @fileOverview HCPSF Admin Center setup controller
 * @author Zero Yu
 */
jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.admincenter.AdminCenter", {

		/**
		 * @event
		 * @name onInit
		 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
		 * @memberOf hcpsuccessfactors.view.admincenter.AdminCenter
		 */
		onInit: function() {
			this._bindModel();
			this._loadData();
		},

		/**
		 * @function
		 * @name _bindModel
		 * @description bind model
		 */
		_bindModel: function() {
			var oView = this.getView();

			var oBJTypeModel = new JSONModel();
			var oBJsModel = new JSONModel();

			oView.setModel(oBJTypeModel, "BJTypeModel");
			oView.setModel(oBJsModel, "BJsModel");
		},

		/**
		 * @function
		 * @name _loadData
		 * @description preload admin center data
		 */
		_loadData: function() {

		},

		/**
		 * @event
		 * @name onAddBJPress
		 * @description open add batch job dialog
		 */
		onAddBJPress: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("hcpsuccessfactors.view.admincenter.AddBJDialog", this);
			}
			this.getView().addDependent(this._oDialog);
			this._loadBJDialogData();
			this._oDialog.open();
		},

		/**
		 * @function
		 * @name _loadData
		 * @description preload add batch job dialog data
		 */
		_loadBJDialogData: function() {
			//load interval data
			(function () {
				var oSelectInterval = sap.ui.getCore().byId("bjdialog-select-interval");
				var intervalData = {
					list: [{
						key: "0.5",
						value: "30 min"
					}, {
						key: "1",
						value: "1 hour"
					}]
				};
				var intervalSelectItem;
				oSelectInterval.removeAllItems();
				for (var i = 0, length = intervalData.list.length; i < length; i++) {
					intervalSelectItem = new sap.ui.core.Item({
						key: intervalData.list[i].key,
						text: intervalData.list[i].value
					});
					oSelectInterval.addItem(intervalSelectItem);
				}
				oSelectInterval.setSelectedKey(intervalData.list[0].key);
			})();

			//load type data by data binding
			// var oBJTypeData = {
			// 	d: {
			// 		results: [{
			// 			name: "workflow"
			// 		}, {
			// 			name: "user"
			// 		}]
			// 	}
			// };
			// this.getView().getModel("BJTypeModel").setData(oBJTypeData);

			//dynamic load type data
			(function () {
				var oSelectType = sap.ui.getCore().byId("bjdialog-select-type");
				var oBJTypeData = {
					list: [{
						key: "workflow",
						value: "workflow"
					}, {
						key: "user",
						value: "user"
					}]
				};
				var typeSelectItem;
				oSelectType.removeAllItems();
				for (var i = 0, length = oBJTypeData.list.length; i < length; i++) {
					typeSelectItem = new sap.ui.core.Item({
						key: oBJTypeData.list[i].key,
						text: oBJTypeData.list[i].value
					});
					oSelectType.addItem(typeSelectItem);
				}
				oSelectType.setSelectedKey(oBJTypeData.list[0].key);
			})();
		},

		/**
		 * @event
		 * @name onDialogSelectOk
		 * @description when dialog's ok is clicked
		 */
		onDialogSelectOk: function() {
			var oInputName = sap.ui.getCore().byId("bjdialog-ipt-name");
			var oSelectType = sap.ui.getCore().byId("bjdialog-select-type");
			var oSelectInterval = sap.ui.getCore().byId("bjdialog-select-interval");
			var oInputDescription = sap.ui.getCore().byId("bjdialog-ipt-description");

			if (oInputName.getValue() === "" || oInputDescription.getValue() === "") {
				MessageToast.show("please complete the input");
				return;
			}

			var oBJData = {
				name: oInputName.getValue(),
				type: oSelectType.getSelectedKey(),
				interval: oSelectInterval.getSelectedKey(),
				info: oInputDescription.getValue()
			};
			var oBJsModel = this.getView().getModel("BJsModel");
			var oBJsData = oBJsModel.getData();
			if (oBJsModel.getJSON() === "{}") {
				oBJsData = {
					d: {
						results: [oBJData]
					}
				};
				oBJsModel.setData(oBJsData);
			} else {
				oBJsData.d.results.push(oBJData);
				oBJsModel.setData(oBJsData);
			}

			this.onDialogClose();
		},

		/**
		 * @event
		 * @name onDialogClose
		 * @description close the dialog
		 */
		onDialogClose: function() {
			var oInputName = sap.ui.getCore().byId("bjdialog-ipt-name");
			var oInputDescription = sap.ui.getCore().byId("bjdialog-ipt-description");
			oInputName.setValue("");
			oInputDescription.setValue("");
			this._oDialog.close();
		},

		/**
		 * @event
		 * @name onDeleteBJPress
		 * @description delete the batch job
		 * @param {sap.ui.base.Event} - oEvent The fired event.
		 */
		onDeleteBJPress: function(oEvent) {
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext("BJsModel");
			var sPath = hcpsuccessfactors.util.StringUtil.subLastWord(oContext.getPath());
			var oBJsModel = this.getView().getModel("BJsModel");
			oBJsModel.getData().d.results.splice(sPath, 1);
			oBJsModel.refresh(true);
		}

	});
});