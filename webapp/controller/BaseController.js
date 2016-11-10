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
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter(this).navTo("home", {}, true /* no history */);
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
				host = window.location.protocol + "//" + window.location.hostname
						+ (window.location.port ? ":" + window.location.port : "") + window.location.pathname;
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
				var url = this.deployedUrl + path;
			}
			return url;
		},

		/**
		 * @function
		 * @name httpGet
		 * @description retrieve data from odata
		 * @param {Boolean}
		 *            bAsync - async or not
		 * @param {String}
		 *            sEntitySet - entity set
		 * @param {String}
		 *            sId - id of entity set
		 * @param {String}
		 *            sExpand - expand
		 * @param {String}
		 *            sQuery - filter
		 * @param {Function}
		 *            fnSuccessCallback- invoke when success
		 * @param {Function}
		 *            fnErrorCallback - invoke when error
		 * @param {Function}
		 *            fnCompleteCallback - invoke when complete
		 */
		httpGet : function(bAsync, sEntitySet, sId, sExpand, sQuery, fnSuccessCallback, fnErrorCallback,
				fnCompleteCallback) {
			var url = sEntitySet + (sId !== null ? "(" + sId + ")" : "") + (function() {
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
				url : "/pmapi/" + url,
				type : "GET",
				async : bAsync,
				success : function(oData) {
					if (fnSuccessCallback) {
						fnSuccessCallback(oData);
					}
				},
				error : function() {
					jQuery.sap.log.error("failed to get");
					if (fnErrorCallback) {
						fnErrorCallback();
					}
				},
				complete : function() {
					if (fnCompleteCallback) {
						fnCompleteCallback();
					}
				}
			});
		},

		/**
		 * @function
		 * @name _showBusyIndicator
		 * @description show busy indicator of whole view or not
		 * @param {Boolean}
		 *            bBusy - true or false
		 */
		_showBusyIndicator : function(bBusy) {
			this.getView().setBusy(bBusy);
		}

	});
});
