sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(BaseController, models, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.myGoal", {

		onInit: function() {
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var isDebug = false;
			if (!isDebug) {
				this.bindData();
			} else {
				this.bindMockData();
			}
		},

		bindData: function() {
			var _this = this;
			$.ajax({
				url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoalPlanTemplate",
				type: "GET",
				dataType: "jsonp",
				data: {
					json: "processResults"
				},
				jsonp: "callback",
				jsonpCallback: "processResults",
				async: true,
				success: function(tdata) {
					var planModel = new JSONModel(tdata);
					_this.getView().setModel(planModel, "GoalPlanModel");

					//var curId = _this.getView().byId("planSelect").getItemAt(0).getKey();
					var curId=_this.getView().getModel("GoalPlanModel").getData().list[0].id;
					var callBack = "g" + curId;
					$.ajax({
						url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoal",
						type: "GET",
						dataType: "jsonp",
						data: {
							id: curId
						},
						jsonp: "callback",
						jsonpCallback: callBack,
						async: true,
						success: function(gdata) {
							var goalModel = new JSONModel(gdata);
							_this.getView().setModel(goalModel, "GoalModel");
						},
						error: function() {
							alert("failed to get goal");
						}
					});
				},
				error: function() {
					alert("failed to get goalPlanTemplate.");
				}
			});

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

		onSelectKeyChange: function(){
			alert("change");
			this.getView().getModel("GoalModel").setData({});
			var curId = this.getView().byId("planSelect").getSelectedKey();
			var callBack = "g" + curId;
			var _this = this;
			$.ajax({
				url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoal",
				type: "GET",
				dataType: "jsonp",
				data: {
					id: curId
				},
				jsonp: "callback",
				jsonpCallback: callBack,
				async: true,
				success: function(cdata) {
					_this.getView().getModel("GoalModel").setData(cdata);
				},
				error: function() {
					alert("failed to change goal");
				}
			});
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