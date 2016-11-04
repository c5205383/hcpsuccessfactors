jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/model/models",
		"sap/ui/model/json/JSONModel", "hcpsuccessfactors/util/httpRequest" ], function(BaseController, models,
		JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.goals.MyGoal", {

		sGoalDetailPageName : "hcpsuccessfactors.view.goals.GoalDetail",

		onInit : function() {
			this.getView().setModel(sap.ui.getCore().getModel("i18n"), "i18n");
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var oSelector = this.getView().byId("goalPlanSelectId");
			oSelector.setBusy(true);

			this.bindGoalPlanData(oSelector);
		},

		bindGoalPlanData : function(control) {
			var goalPlanUrl = "goalplan";
			var host = this.getServiceHost();
			var url = this.getServiceUrl(goalPlanUrl);

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
						window.console.log(result);
					}
				}
			});
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
					oList.setBusy(false);
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "GoalModel");
					} else {
						window.console.log(result);

					}
				}
			});
		},

		onSelectKeyChange : function(oEvent) {
			if (oEvent.getSource() == undefined)
				return;
			var key = oEvent.getSource().getSelectedKey();
			var oList = this.getView().byId("goalListId");
			oList.setBusy(true);
			this.bindGoalListData(key, oList);
		},

		onRefreshPressed : function(oEvent) {
			var oSelector = this.getView().byId("goalPlanSelectId");
			oSelector.setBusy(true);
			this.bindGoalPlanData(oSelector);
		},

		onItemPress : function(oEvent) {
			var navTo = this.sGoalDetailPageName;
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