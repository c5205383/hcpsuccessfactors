sap.ui.define([ "hcpsuccessfactors/controller/BaseController" ], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.mainapp", {

		getDefaultPage : function() {
		},

		onInit : function() {
			// load needed jquery file
			jQuery.sap.require("jquery.sap.history");

			this.getView().app = this.getView().byId("sfsf-ext-app");

			// subscribe to event bus
			var bus = sap.ui.getCore().getEventBus();
			bus.subscribe("nav", "to", this.navHandler, this);
			bus.subscribe("nav", "back", this.navHandler, this);
			bus.subscribe("nav", "virtual", this.navHandler, this);

		},
		navHandler : function(channelId, eventId, data) {
			if (eventId === "to") {
				this.navTo(data.id, data.data, true);
			} else if (eventId === "back") {
				jQuery.sap.history.back();
			} else if (eventId === "virtual") {
				jQuery.sap.history.addVirtualHistory();
			} else {
				jQuery.sap.log
						.error("'nav' event cannot be processed. There's no handler registered for event with id: "
								+ eventId);
			}
		},
		navTo : function(id, data, writeHistory) {

			if (id === undefined) {
				// invalid parameter
				jQuery.sap.log.error("navTo failed due to missing id");
			} else {

				var app = this.getView().app;
				if (app.getPage(id) === null) {
					jQuery.sap.log.info(id);
					var type = "XML";
					var page = sap.ui.view({
						id : id,
						viewName : "hcpsuccessfactors." + id,
						type : type
					});
					app.addPage(page);
					jQuery.sap.log.info("app controller > loaded page: " + id);
				}
				// navigate in the app control
				var transition = (!jQuery.device.is.phone) ? "show" : "slide";
				app.to(id, transition, data);
			}
		},
		navBack : function(id) {

			if (!id) {

				// invalid parameter
				jQuery.sap.log.error("navBack - parameters id must be given");

			} else {

				// close open popovers
				if (sap.m.InstanceManager.hasOpenPopover()) {
					sap.m.InstanceManager.closeAllPopovers();
				}

				// close open dialogs
				if (sap.m.InstanceManager.hasOpenDialog()) {
					sap.m.InstanceManager.closeAllDialogs();
					jQuery.sap.log.info("navBack - closed dialog(s)");
				}

				// ... and navigate back
				var app = this.getView().app;
				var currentId = (app.getCurrentPage()) ? app.getCurrentPage().getId() : null;
				if (currentId !== id) {
					app.backToPage(id);
					jQuery.sap.log.info("navBack - back to page: " + id);
				}
			}
		}
	});

});