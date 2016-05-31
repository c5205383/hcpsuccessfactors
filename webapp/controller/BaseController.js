sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History) {
	"use strict";
	return Controller.extend("hcpsuccessfactors.controller.BaseController", {
		getRouter: function() {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		onNavBack: function(oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		},

		httpGet: function(sEntitySet, sId, sExpand, sQuery, fnSuccessCallback, fnErrorCallback, fnCompleteCallback) {
			var url = sEntitySet + (sId !== null ? "(" + sId + ")" : "") +
				(function() {
					if (sExpand !== null && sQuery !== null) {
						return "?$expand=" + sExpand + "&$filter=" + sQuery + "&$format=json";
					} else if (sExpand !== null) {
						return "?$expand=" + sExpand + "&$format=json";
					} else if (sQuery !== null) {
						return "?$filter=" + sQuery + "&$format=json";
					} else {
						return "?$format=json";
					}
				})();
			$.ajax({
				url: "/pmapi/" + url,
				type: "GET",
				async: true,
				success: function(oData) {
					fnSuccessCallback(oData);
				},
				error: function() {
					jQuery.sap.log.error("failed to get");
					fnErrorCallback();
				},
				complete: function() {
					fnCompleteCallback();
				}
			});
		}
		
	});
});