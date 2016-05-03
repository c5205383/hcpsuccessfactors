sap.ui.define([ "hcpsuccessfactors/controller/BaseController" ], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.ContractRenewProcess", {
		onInit : function() {
			var isDebug = true;
			if (isDebug) {
				var sPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/renew.json");
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.loadData(sPath, null, false);
				this.getView().setModel(oModel);
			}
		},
		onKeyChanged:function(oEvent){
			var oModel = this.getView().getModel();
		}
	});

});