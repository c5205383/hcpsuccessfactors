jQuery.sap.require("hcpsuccessfactors.util.format");
sap.ui.define([
   "hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("hcpsuccessfactors.controller.detail.GoalDetail", {
    	
        onInit: function(){
        	var debug = false;
        	if(!debug){
        		//
        	}else{
        		//this.bindMockData();
        	}
        	
        	var oRouter = this.getRouter();
			oRouter.getRoute("goalDetail").attachMatched(this._onRouteMatched, this);
        },
        
        bindMockData: function(){
        	var goalModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/goal_1.json");
			var goalModel = new JSONModel();
			goalModel.loadData(goalModelPath, null, false);
			this.getView().setModel(goalModel, "GoalModel");
        },
        
        _onRouteMatched : function (oEvent) {
			var oArgs, oView;
			
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.setModel(sap.ui.getCore().getModel("GoalModel"), "GoalModel");
			
			oView.bindElement({
				path: "/goals/" + oArgs.id,
				model: "GoalModel"
			});
			
			/*var data=sap.ui.getCore().getModel("GoalModel").getData().goals;

			var detailModel=new sap.ui.model.json.JSONModel(clickGoalData);
			oView.setModel(detailModel,"detailModel");*/
			
			var oControl = this.getView().byId("idState");
			this._formatStateBackground(oControl,oControl.getText());
		},
		
		_formatStateBackground:function(oControl, sText){
		    oControl.addStyleClass("cssBackground");
			switch(sText){
				case "Not Started" :
					$(".cssBackground").css("background-color","white");
					$(".cssBackground").css("color","black");
					break;
				case "On Track" :
					$(".cssBackground").css("background-color","yellow");
					$(".cssBackground").css("color","black");
					break;
				case "Behind" :
					$(".cssBackground").css("background-color","red");
					$(".cssBackground").css("color","white");
					break;
				case "Completed" :
					$(".cssBackground").css("background-color","green");
					$(".cssBackground").css("color","white");
					break;
				case "Postponed" :
					$(".cssBackground").css("background-color","purple");
					$(".cssBackground").css("color","white");
					break;
				case "Cancelled" :
					$(".cssBackground").css("background-color","blue");
					$(".cssBackground").css("color","white");
					break;
			}
			//if(sText.toLowerCase()==="white" || sText.toLowerCase()==="red"){
			//	$(".cssBackground").css("background-color",sText.toLowerCase());
				//oControl.addStyleClass("cssBackgroundColor");
		//	}
		}
    });
});