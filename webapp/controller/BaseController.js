sap.ui.define([ "sap/ui/core/mvc/Controller", "sap/ui/core/routing/History" ], function(Controller, History) {
	"use strict";
	return Controller.extend("hcpsuccessfactors.controller.BaseController", {

		serviceUrl : "hcpmiddleware/hcp/",
		deployedUrl : "sfsfdataservice/hcp/",
		
		getRouter : function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavBack : function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined && sPreviousHash !=="") {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("home", {}, true /* no history */);
			}
		},

		getServiceHost : function() {
			var isDebug = false;
			if (window.location.hostname === "localhost" || window.location.hostname == "127.0.0.1")
				isDebug = true;
			var host;

			if (isDebug) {
				host = window.location.protocol + "//" + window.location.hostname
						+ (window.location.port ? ":" + window.location.port : "");

			} else {
				var host = null;
			}
			return host;
		},

		getServiceUrl : function(path) {
			var isDebug = false;
			if (window.location.hostname === "localhost" || window.location.hostname == "127.0.0.1")
				isDebug = true;
			var url;

			if (isDebug) {
				url = this.serviceUrl + path;

			} else {
				var url = deployedUrl + path;
			}
			return url;
		}
	});
});