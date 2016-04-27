sap.ui.define([
	"hcpsuccessfactors/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.empCenter.ProfileDetail", {
		onInit: function(){
		    this.bindMockData();
			var oRouter = this.getRouter();
			oRouter.getRoute("userDetail").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched : function (oEvent) {
			var oArgs, oView;
			
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.setModel(sap.ui.getCore().getModel("UsersModel"), "UsersModel");
			
			oView.bindElement({
				path: "/d/results/" + oArgs.id,
				model: "UsersModel"
			});
			
			//var oControl = this.getView().byId("idState");
			//this._formatStateBackground(oControl,oControl.getText());
		},
		
		bindMockData: function(){
		    var photoModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/photo.json");
			var photoModel = new sap.ui.model.json.JSONModel();
			photoModel.loadData(photoModelPath, null, false);
			this.getView().setModel(photoModel, "photoModel");
		}
		
	});

});