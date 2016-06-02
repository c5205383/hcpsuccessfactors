/**
 * @fileOverview HCP SF setup controller
 * @author Zero Yu
 */ 
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController", 
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";	

	return BaseController.extend("hcpsuccessfactors.controller.admincenter.AdminCenter", {
		
		/**
		 * @event
		 * @name onInit
		 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
		 * @memberOf hcpsuccessfactors.view.admincenter.AdminCenter
		 */
		onInit: function() {
			
		},
		
		/**
		 * @event
		 * @name onAddBJPress
		 * @description Called when add batch job button is pressed
		 */
		onAddBJPress : function () {
			
		}
		
	});
});