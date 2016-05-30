jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/model/models",
		"sap/ui/model/json/JSONModel", "hcpsuccessfactors/util/httpRequest" ], function(BaseController, models,
		JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.goals.MyGoal", {

		onInit : function() {
			this.getView().setModel(sap.ui.getCore().getModel("i18n"), "i18n");
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var oSelector = this.getView().byId("goalPlanSelectId");
			oSelector.setBusy(true);

			this.bindGoalPlanData(oSelector);
		},

		bindGoalListData : function(goalId, oList) {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("goals");
			var that = this;
			var data = {
				goalPlanId : goalId
			};
			var result = httpRequest.httpGetRequest(host, url, data, true, function(result) {
				if (result != null) {
					// that.hideBusyIndicator();
					oList.setBusy(false);
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "GoalModel");
					} else {
						// TODO: ERROR

					}
				}
			});
		},

		bindGoalPlanData : function(control) {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("goalPlanTemplate");

			var that = this;

			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				control.setBusy(false);
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "GoalPlanModel");

						var goalPlanId = control.getSelectedKey()
						if (goalPlanId == null || goalPlanId == "") {
							if (result.data.d && result.data.d.results && result.data.d.results.length > 0) {
								eventCode = result.data.d.results[0].id;
							}
						}
						var oList = that.getView().byId("goalListId");
						oList.setBusy(true);
						that.bindGoalListData(goalPlanId, oList);
					} else {
						// TODO: ERROR

					}
				}
			}, function(result) {
				control.setBusy(false);
			});
		},

		bindMockData : function() {
			var planModelPath = jQuery.sap.getModulePath("starbucksdemo", "/mockData/goalTemplate.json");
			var planModel = new JSONModel();
			planModel.loadData(planModelPath, null, false);
			this.getView().setModel(planModel, "GoalPlanModel");

			var goalModelPath = jQuery.sap.getModulePath("starbucksdemo", "/mockData/goal_1.json");
			var goalModel = new JSONModel();
			goalModel.loadData(goalModelPath, null, false);
			this.getView().setModel(goalModel, "GoalModel");
		},

		onSelectKeyChange : function(oEvent) {

			if (oEvent.getSource() == undefined)
				return;

			var key = event.getSource().getSelectedKey();
			var oList = that.getView().byId("goalListId");
			oList.setBusy(true);
			this.bindGoalListData(key, oList);
		},

		onItemPress : function(oEvent) {
			var navTo = "view.detail.goal.GoalDetail";
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext("GoalModel");
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo,
				data : {
					mutiple : false,
					contexts : oContext
				}
			});
		}

	});
});