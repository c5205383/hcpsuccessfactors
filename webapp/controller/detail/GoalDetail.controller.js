sap.ui.define([
   "hcpsuccessfactors/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("hcpsuccessfactors.controller.detail.GoalDetail", {
    	
        onInit: function(){
        	var oRouter = this.getRouter();
			oRouter.getRoute("goalDetail").attachMatched(this._onRouteMatched, this);
        },
        
        _onRouteMatched : function (oEvent) {
			var oArgs, oView;
			
			oArgs = oEvent.getParameter("arguments");
			var data=sap.ui.getCore().byId("__xmlview1").getModel("goalModel").getData().goals;
	    	var clickGoalData;
	    	for(var i=0;i<data.length;i++){
	    	   if(data[i].id == oArgs.id){
	   			   clickGoalData=data[i];
	   		   }
	   	    }
	    	
			oView = this.getView();
			var detailModel=new sap.ui.model.json.JSONModel(clickGoalData);
			oView.setModel(detailModel,"detailModel");
		}
    });
});