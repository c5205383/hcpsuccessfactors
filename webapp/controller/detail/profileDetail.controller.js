sap.ui.define([
	"hcpsuccessfactors/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.profileDetail", {
		onInit: function(){
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
			
			var oControl = this.getView().byId("idState");
			this._formatStateBackground(oControl,oControl.getText());
		}
		
		
	});

});