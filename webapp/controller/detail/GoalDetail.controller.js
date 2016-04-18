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
			/*var data=this.getView().getModel("GoalModel").getData().goals;
			//var data=sap.ui.getCore().getModel("GoalModel").getData().goals;
	    	var clickGoalData;
	    	for(var i=0;i<data.length;i++){
	    	   if(data[i].id === oArgs.id){
	   			   clickGoalData=data[i];
	   		   }
	   	    }
	    	
			var detailModel=new sap.ui.model.json.JSONModel(clickGoalData);
			oView.setModel(detailModel,"detailModel");*/
		}
    });
});