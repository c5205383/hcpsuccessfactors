jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(BaseController, models, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.goal.MyGoal", {

		/**
		 * @event
		 * @name onInit
		 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
		 * @memberOf hcpsuccessfactors.view.goal.MyGoal
		 */
		onInit: function () {
			this._bindModel();
			this._loadData();
		},

		/**
		 * @function
		 * @name _bindModel
		 * @description bind model
		 */
		_bindModel: function () {
			var oView = this.getView();
			//bind i18n and device info model
			oView.setModel(sap.ui.getCore().getModel("i18n"), "i18n");
			oView.setModel(models.createDeviceModel(), "device").bindElement("device>/");
			//bind goal plan template model
			var oPlanModel = new JSONModel();
			oView.setModel(oPlanModel, "GoalPlanModel");
			//bind goal model
			var oGoalModel = new JSONModel();
			oView.setModel(oGoalModel, "GoalModel");
		},

		/**
		 * @function
		 * @name _loadData
		 * @description retrieve goal data via ajax from odata
		 */
		_loadData: function () {
			var _this = this;
			var sTemplateId;

			this._showBusyIndicator(true);
			//callback func of getting goal succeed
			var fnGoalSucCallback = function (oData) {
				_this.getView().getModel("GoalModel").setData(oData);
			};
			//callback func of getting template succeed
			var fnTemplateSucCallback = function (oData) {
				_this.getView().getModel("GoalPlanModel").setData(oData);
				sTemplateId = oData.d.results[0].id;
				//to get goal data
				_this.httpGet(false, "Goal_" + sTemplateId, null, null, null, fnGoalSucCallback, null, null);
			};
			//callback func of getting data complete
			var fnComCallback = function () {
				_this._showBusyIndicator(false);
			};
			//to get tempate data
			this.httpGet(false, "GoalPlanTemplate", null, null, null, fnTemplateSucCallback, null, fnComCallback);
		},

		/**
		 * @function
		 * @name onSelectKeyChange
		 * @description Event handler when change the goal plan template select
		 */
		onSelectKeyChange: function () {
			var sTemplateId = this.byId("goalTempateSelect").getSelectedKey();
			var _this = this;
			//callback func of getting goal succeed
			var fnGoalSucCallback = function (oData) {
				_this.getView().getModel("GoalModel").setData(oData);
			};
			//callback func of getting goal complete
			var fnComCallback = function () {
				_this._showBusyIndicator(false);
			};
			this._showBusyIndicator(true);
			//to get goal data
			this.httpGet(true, "Goal_" + sTemplateId, null, null, null, fnGoalSucCallback, null, fnComCallback);
		},

		/**
		 * @function
		 * @name onItemPress
		 * @description Event handler when pressing the goal item
		 * @param {sap.ui.base.Event} - oEvent The fired event.
		 */
		onItemPress: function (oEvent) {
			var oItem = oEvent.getSource();
			var sGoalId = oItem.getInfo();
			var sTemplateId = this.byId("goalTempateSelect").getSelectedKey(); 

			this.getRouter().navTo("goalDetail", {
				tid: sTemplateId,
				gid: sGoalId
			});
		}

	});
});