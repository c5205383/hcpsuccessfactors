sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	return Controller.extend("hcpsuccessfactors.controller.BaseController", {
		getRouter : function () {
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/);
			}
		},
		
		httpGet: function(entitySet, id, expand, query, succallback, compcallback){
			var url = entitySet + (id !== null? "("+id+")" : "") + 
				(function(){
					if(expand !== null && query !== null) {
						return "?$expand="+expand+"&$filter="+query+"&$format=json";
					} else if(expand !== null) {
						return "?$expand="+expand+"&$format=json";
					} else if(query !== null) {
						return "?$filter="+query+"&$format=json";
					} else {
						return "?$format=json";
					}
				})();
			$.ajax({
				url: "/pmapi/"+url,
				type: "GET",
				async: true,
				success: function(gdata) {
					succallback(gdata);
				},
				error: function() {
					console.error("failed.");
				},
				complete: function() {
					compcallback();
				}
			});
		}
	});
});