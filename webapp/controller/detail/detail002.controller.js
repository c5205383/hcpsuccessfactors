sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"hcpsuccessfactors/model/models"
], function(Controller,models) {
	"use strict";

	return Controller.extend("hcpsuccessfactors.controller.detail.detail002", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
			onInit: function() {
			// set the device model
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");
			}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onExit: function() {
		//
		//	}

	});

});