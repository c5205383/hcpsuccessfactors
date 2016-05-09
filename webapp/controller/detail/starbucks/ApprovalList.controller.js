sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/util/httpRequest" ], function(BaseController, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.ApprovalList", {

		onInit : function() {
			this.onRefreshPressed();
		},

		onRefreshPressed : function(oEvent) {
			this._showBusyIndicator(true);
			var t = setTimeout((function(_this) {
				return function() {
					_this._showBusyIndicator(false);
				};
			})(this), 5000 * 6);

			var isDebug = true;
			if (window.location.hostname === "localhost" || window.location.hostname == "127.0.0.1")
				isDebug = true;
			var host;
			var url;

			if (isDebug) {
				host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
				url = "hcpmiddleware/hcp/getFOEventReason";

			} else {
				var host = null;
				var url = "sfsfdataservice/hcp/getFOEventReason";
			}
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, true, function(result) {
				if (result != null) {
					that._showBusyIndicator(false);
					if (result.success === true) {
						var oEventReasonModel = new sap.ui.model.json.JSONModel();
						oEventReasonModel.setData(result.data);
						that.getView().setModel(oEventReasonModel, "EventReason");
					} else {
						//TODO: ERROR

					}
				}
			});

		},

		_showBusyIndicator : function(busy) {
			this.busyIndicator = this.getView().byId("flexBox");
			this.busyIndicator.setVisible(busy);
		}
	});

});