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
			this.bindMockData();
			this.bindModel();
		},

		bindMockData: function() {
			var photoModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/photo.json");
			var photoModel = new sap.ui.model.json.JSONModel();
			photoModel.loadData(photoModelPath, null, false);
			this.getView().setModel(photoModel, "photoModel");
		},
		bindModel: function() {
			var oModel = new JSONModel();
			var oData = {
  "catalog": [
              {"category": "People","name": "Building\nDooshan\nTalent", "event": "People-Centric\nPipeline Management\nCoaching & Development", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""},
              {"category": "","name": "In-hwa", "event": "Famirness\nInclusiveness\nTeamwork", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""},
              {"category": "","name": "Openness", "event": "Open Communication\nTransparency", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""},
          {"category": "Perfor-mance","name": "Innovation", "event": "Visioning & Goal Setting\nInnovative Change", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""},
          {"category": "","name": "Execution", "event": "Resourcefulness\nTenacious Execution", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""},
          {"category": "","name": "Priority\nFocus", "event": "Business Acumen\nPriority Focus", "udn": "", "dn": "","c": "sap-icon://favorite","hc": "","m": ""}
        ]};

			oModel.setData(oData);
			var oView = this.getView();
			oView.setModel(oModel);
		//	this.getView().byId("treeTable").expandToLevel(1);
		}

	});
});