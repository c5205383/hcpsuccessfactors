/**
 * @fileOverview HCPSF People Session setup controller
 * @author 
 */
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, MessageToast) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.peoplesession.PeopleSession", {
		/**
		 * @event
		 * @name onInit
		 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
		 * @memberOf hcpsuccessfactors.view.peoplesession.PeopleSession
		 */
		onInit: function() {
		}

	});
});