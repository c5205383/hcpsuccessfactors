sap.ui.define([ "hcpsuccessfactors/controller/BaseController" ], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.overview", {

		onTilePressed : function(evt) {
			var oTile = evt.getSource();
			var oContext = oTile.getBindingContext();

			if (oContext != undefined) {
				var model = oContext.getModel();
				var path = oContext.getPath();
				var data = model.getProperty(path);
				window.console.log(data);
				this.getRouter(this).navTo(data.navTo);
			}
		},

		onInit : function() {

			// initial tile container page
			var appDataPath = "/model/app.json";
			var modelPath = jQuery.sap.getModulePath("hcpsuccessfactors", appDataPath);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(modelPath, null, false);
			this.getView().setModel(oModel);

		},
	});

});