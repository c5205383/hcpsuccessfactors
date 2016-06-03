jQuery.sap.require("hcpsuccessfactors.util.formatter");
sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel" ], function(
		BaseController, JSONModel) {
	"use strict";
	return BaseController.extend("hcpsuccessfactors.controller.goals.GoalDetail", {

		sGoalListPageName : "hcpsuccessfactors.view.goals.MyGoal",

		onNavBack : function(event) {
			var navTo = this.sGoalListPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo,
				data : {
					mutiple : false
				}
			});
		},

		onInit : function() {

			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},
		_onBeforeShow : function(event) {
			var oModel;
			var sPath;
			if (event && event.data) {
			//	this
				if (event.data.mutiple == false) {
					var oContext = event.data.contexts;
					oModel = oContext.getModel();
					sPath = oContext.getPath();
				}
			}
			this.getView().setModel(oModel, "GoalModel");
			this.getView().bindElement({
				path : sPath,
				model : "GoalModel"
			});
			var oControl = this.getView().byId("idState");
			this._formatStateBackground(oControl, oControl.getText());
		},

		bindMockData : function() {
			var goalModelPath = jQuery.sap.getModulePath("starbucksdemo", "/mockData/goal_1.json");
			var goalModel = new JSONModel();
			goalModel.loadData(goalModelPath, null, false);
			this.getView().setModel(goalModel, "GoalModel");
		},

		_onRouteMatched : function(oEvent) {
			var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.setModel(sap.ui.getCore().getModel("GoalModel"), "GoalModel");

			oView.bindElement({
				path : "/dataObj/" + oArgs.id,
				model : "GoalModel"
			});

			var oControl = this.getView().byId("idState");
			this._formatStateBackground(oControl, oControl.getText());
		},

		_formatStateBackground : function(oControl, sText) {
			oControl.addStyleClass("cssBackground");
			switch (sText.toLowerCase()) {
			case "not started":
				$(".cssBackground").css("background-color", "white");
				$(".cssBackground").css("color", "black");
				break;
			case "on track":
				$(".cssBackground").css("background-color", "yellow");
				$(".cssBackground").css("color", "black");
				break;
			case "behind":
				$(".cssBackground").css("background-color", "red");
				$(".cssBackground").css("color", "white");
				break;
			case "completed":
				$(".cssBackground").css("background-color", "green");
				$(".cssBackground").css("color", "white");
				break;
			case "postponed":
				$(".cssBackground").css("background-color", "purple");
				$(".cssBackground").css("color", "white");
				break;
			case "cancelled":
				$(".cssBackground").css("background-color", "blue");
				$(".cssBackground").css("color", "white");
				break;
			}
		}
	});
});