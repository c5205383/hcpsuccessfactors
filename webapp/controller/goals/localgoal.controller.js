jQuery.sap.require("hcpsuccessfactors.util.formatter");
sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/model/models",
		"hcpsuccessfactors/util/httpRequest" ], function(BaseController, models, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.goals.localgoal", {

		onInit : function() {
			this.getView().setModel(sap.ui.getCore().getModel("i18n"), "i18n");
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var oSelector = this.getView().byId("idLocalGoalPlanSelectId");

			this.bindGoalPlanData(oSelector);
		},

		bindGoalPlanData : function(control) {
			var goalPlanUrl = "goalplan";
			var host = this.getServiceHost();
			var url = this.getServiceUrl(goalPlanUrl);

			var that = this;

			control.setBusy(true);
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				control.setBusy(false);
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "LocalGoalPlanModel");

						var goalPlanId = control.getSelectedKey()
						if (goalPlanId == null || goalPlanId == "") {
							window.console.log(result);
						} else {
							var oTable = that.getView().byId("idLocalGoalsTable");
							that.bindGoalListData(oTable, goalPlanId);
						}
					} else {
						// TODO: ERROR
						window.console.log(result);
					}
				}
			});
		},

		bindGoalListData : function(oTable, goalPlanId) {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("mygoals");
			var that = this;
			var data = {
				goalPlanId : goalPlanId
			};
			oTable.setBusy(true);
			var result = httpRequest.httpGetRequest(host, url, data, true, function(result) {
				if (result != null) {
					oTable.setBusy(false);
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "LocalGoalModel");
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
			var oTable = this.getView().byId("idLocalGoalsTable");
			this.bindGoalListData(oTable, key);
			var oSearch = this.getView().byId("idGoalSearchField");
			oSearch.setValue("");
		},

		onRefreshPressed : function(oEvent) {
			var oSelector = this.getView().byId("idLocalGoalPlanSelectId");
			this.bindGoalPlanData(oSelector);
			var oSearch = this.getView().byId("idGoalSearchField");
			oSearch.setValue("");

		},

		onSearch : function(oEvt) {
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("object/name", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var oTable = this.getView().byId("idLocalGoalsTable");
			var binding = oTable.getBinding("items");
			binding.filter(aFilters, "Application");
		}

	});
});