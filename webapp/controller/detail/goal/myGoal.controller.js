sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(BaseController, models, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.goal.myGoal", {

		onInit: function() {
			this.getView().setModel(sap.ui.getCore().getModel("i18n"), "i18n");
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

            this.showBusyIndicator(true);

			var isDebug = false;
			if (!isDebug) {
				this.bindData();
			} else {
				this.bindMockData();
			}
		},
		
		showBusyIndicator: function (busy) {
	      this.busyIndicator = this.getView().byId("audioBusyIndicator");
	      this.busyIndicator.setVisible(busy);
	    },

		bindData: function() {
			var _this = this;
			$.ajax({
				url : "/sfsfdataservice/hcp/getGoalPlanTemplate", 
				type: "GET",
				async: true,
				success: function(tdata) {
					var planModel = new JSONModel(JSON.parse(tdata));
					_this.getView().setModel(planModel, "GoalPlanModel");
					var curId = _this.getView().getModel("GoalPlanModel").getData().list[0].id;
					//var callBack = "g" + curId;
					$.ajax({
						url: "/sfsfdataservice/hcp/getGoalsByTemplateId",
						type: "GET",
						data: {
							templateId: curId
						},
						async: true,
						success: function(gdata) {
							// var goalModel = new JSONModel(gdata);
							// _this.getView().setModel(goalModel, "GoalModel");
                            _this.showBusyIndicator(false);
							sap.ui.getCore().getModel("GoalModel").setData(JSON.parse(gdata));
							_this.getView().setModel(sap.ui.getCore().getModel("GoalModel"), "GoalModel");
						},
						error: function() {
							alert("failed to get goal");
							_this.showBusyIndicator(false);
						}
					});
				},
				error: function() {
					alert("failed to get goalPlanTemplate.");
					_this.showBusyIndicator(false);
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

		onSelectKeyChange: function() {
		    this.showBusyIndicator(true);
			//alert("change");
			var curId = this.getView().byId("planSelect").getSelectedKey();
			//var callBack = "g" + curId;
			var _this = this;
			
			$.ajax({
				url: "/sfsfdataservice/hcp/getGoalsByTemplateId",
				type: "GET",
				data: {
					templateId: curId
				},
				async: true,
				success: function(cdata) {
				    _this.showBusyIndicator(false);
					sap.ui.getCore().getModel("GoalModel").setData(JSON.parse(cdata));
					_this.getView().getModel("GoalModel").setData(JSON.parse(cdata));
				},
				error: function() {
					alert("failed to change goal");
				}
			});
			//items.setBusy(false);
		},

		onItemPress: function(oEvent) {
			var oItem = oEvent.getSource();
			//var goalId = oItem.getInfo();
			var spath = oItem.getBindingContext("GoalModel");
			/*var goalData=this.getView().getModel("GoalModel").getData().goals;
			var index;
			for(var i=0,max=goalData.length; i<max;i++){
				if(goalData[i].id==goalId){
					index=i;
					break;
				}
			}*/
			this.getRouter().navTo("goalDetail", {
				id: spath.getPath().substr(7)
			});
		}

	});
});