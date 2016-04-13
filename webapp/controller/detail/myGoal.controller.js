sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(BaseController, models, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.myGoal", {

		onInit: function() {
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var isDebug = true;
			if (!isDebug) {
				//
			} else {
				this.bindMockData();
			}
		},

		bindMockData: function() {
			var planModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/goalTemplate.json");
			var planModel = new JSONModel();
			planModel.loadData(planModelPath, null, false);
			this.getView().setModel(planModel, "GoalPlanModel");

			var goalModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/goal_1.json");
			var goalModel = new JSONModel();
			goalModel.loadData(goalModelPath, null, false);
			this.getView().setModel(goalModel, "GoalModel");
		},

		onItemPress: function(oEvent) {
			//alert("haha");
			var oItem = oEvent.getSource();
			var goalId = oItem.getInfo();
			/*var goalData=this.getView().getModel("GoalModel").getData().goals;
			var index;
			for(var i=0,max=goalData.length; i<max;i++){
				if(goalData[i].id==goalId){
					index=i;
					break;
				}
			}*/
			this.getRouter().navTo("goalDetail", {
				id: goalId
			});
		}

	});
});