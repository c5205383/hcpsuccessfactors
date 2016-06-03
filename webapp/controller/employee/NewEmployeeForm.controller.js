sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel",
		"hcpsuccessfactors/util/httpRequest" ], function(BaseController, JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.NewEmployeeForm", {

		onInit : function() {
			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					// this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {
			if (event && event.data) {
				if (event.data.result != undefined) {
					var message = "";
					var state = "Success";
					for (var i = 0; i < event.data.result.d.length; i++) {
						var o = event.data.result.d[i];
						if (o.status == "ERROR") {
							state = "Error";
							message += o.index + ":" + o.status + " " + o.message + "\r\n";
						} else {
							message += o.index + ":" + o.status + " " + "\r\n";
						}
					}
					var messageStrip = this.getView().byId("messageStripId");
					messageStrip.setVisible(true);
					messageStrip.setText(message);
					messageStrip.setType(state);
					messageStrip.setTooltip(message);
				}
			}
		}
	});
});