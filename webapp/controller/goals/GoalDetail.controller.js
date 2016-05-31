jQuery.sap.require("hcpsuccessfactors.util.format");
sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel" ], function(
		BaseController, JSONModel) {
	"use strict";
	return BaseController.extend("hcpsuccessfactors.controller.goals.GoalDetail", {

		onNavBack : function(event) {
			var navTo = "view.goals.MyGoal";
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
				this
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
			switch (sText) {
			case "Not Started":
				$(".cssBackground").css("background-color", "white");
				$(".cssBackground").css("color", "black");
				break;
			case "On Track":
				$(".cssBackground").css("background-color", "yellow");
				$(".cssBackground").css("color", "black");
				break;
			case "Behind":
				$(".cssBackground").css("background-color", "red");
				$(".cssBackground").css("color", "white");
				break;
			case "Completed":
				$(".cssBackground").css("background-color", "green");
				$(".cssBackground").css("color", "white");
				break;
			case "Postponed":
				$(".cssBackground").css("background-color", "purple");
				$(".cssBackground").css("color", "white");
				break;
			case "Cancelled":
				$(".cssBackground").css("background-color", "blue");
				$(".cssBackground").css("color", "white");
				break;
			}
		}
	});
});