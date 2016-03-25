sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("hcpsuccessfactors.controller.MainApp", {

		onItemPress: function(evt) {
			var item = evt.getSource();
			var model = this.getView().getModel();
			var path = item.getBindingContext().getPath();
			var data = model.getProperty(path);
			window.console.log(data);

			if (data) {
				sap.ui.getCore().getEventBus().publish("nav", "to", {
					id: data.navTo,
					data: {
						context: item.getBindingContext()
					}
				});
			}
		},

		getDefaultPage: function() {},

		onInit: function() {
			//load needed jquery file 
			jQuery.sap.require("jquery.sap.history");

			// set master categories
			var modelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/model/app.json");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(modelPath, null, false);
			this.getView().setModel(oModel);

			//
			this.getView().app = this.getView().byId("sfsf-ext-app");

			// subscribe to history changes
			var historyDefaultHandler = function(navType) {
				if (navType === jQuery.sap.history.NavType.Back) {
					this.navBack(this.getDefaultPage());
				} else {
					this.navTo(this.getDefaultPage(), null, false);
				}
			};
			var historyPageHandler = function(params, navType) {
				if (!params || !params.id) {
					jQuery.sap.log.error("invalid parameter: " + params);
				} else {
					if (navType === jQuery.sap.history.NavType.Back) {
						this.navBack(params.id);
					} else {
						this.navTo(params.id, params.data, false);
					}
				}
			};
			jQuery.sap.history({
				routes: [{
					path: "page",
					handler: jQuery.proxy(historyPageHandler, this)
				}],
				defaultHandler: jQuery.proxy(historyDefaultHandler, this)
			});

			// subscribe to event bus
			var bus = sap.ui.getCore().getEventBus();
			bus.subscribe("nav", "to", this.navHandler, this);
			bus.subscribe("nav", "back", this.navHandler, this);
			bus.subscribe("nav", "virtual", this.navHandler, this);
		},
		navHandler: function(channelId, eventId, data) {
			if (eventId === "to") {
				this.navTo(data.id, data.data, true);
			} else if (eventId === "back") {
				jQuery.sap.history.back();
			} else if (eventId === "virtual") {
				jQuery.sap.history.addVirtualHistory();
			} else {
				jQuery.sap.log.error("'nav' event cannot be processed. There's no handler registered for event with id: " + eventId);
			}
		},
		navTo: function(id, data, writeHistory) {

			if (id === undefined) {
				// invalid parameter
				jQuery.sap.log.error("navTo failed due to missing id");
			} else {

				// load view on demand
				var appPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/");
				alert(appPath);

				// is it a master?
				var master = (id.indexOf("view.master.") === 0);
				window.console.log("navTo id"+id);

				var app = this.getView().app;
				if (app.getPage(id, master) === null) {
					alert(id);
					var type = "XML";
					var page = sap.ui.view({
						id: id,
						viewName:  "hcpsuccessfactors."+ id,
						type: type
					});
					if (master) {
						app.addMasterPage(page);
					} else {
						app.addDetailPage(page);
					}
					jQuery.sap.log.info("app controller > loaded page: " + id);
				}
				// navigate in the app control
				var transition = (!jQuery.device.is.phone) ? "show" : "slide";
				app.to(id, transition, data);

				// write browser history
				if ((writeHistory === undefined || writeHistory) && (jQuery.device.is.phone || master)) {
					jQuery.sap.history.addHistory("page", {
						id: id
					}, false);
				}

				// log
				jQuery.sap.log.info("navTo - to page: " + id + " [" + writeHistory + "]");
			}
		},
		navBack: function(id) {

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