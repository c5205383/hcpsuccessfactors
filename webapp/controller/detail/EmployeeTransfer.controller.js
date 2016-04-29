sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/m/Button",
	"sap/ui/core/Fragment",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(BaseController, jQuery, Button, Fragment, MessageToast, Filter, Controller, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.EmployeeTransfer", {

		onInit: function() {

			var isDebug = false;
			if (!isDebug) {
				this.bindData();
			} else {
				this.bindMockData();
			}
			var oView = this.getView();
			oView.setModel(this.oModel);
			this.oSF = oView.byId("searchField");
			this.onButtonPressed();
		},

		bindData: function() {
			var _this = this;
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserDirectReports",
				type: "GET",
				async: true,
				success: function(drdata) {
					var directReportsModel = new JSONModel(JSON.parse(drdata));
					_this.getView().setModel(directReportsModel, "DirectReportsModel");
				},
				error: function() {
					alert("failed to get direct reports");
				}
			});

			var cityModel = new JSONModel({
				"dataObj": [{
					"cname": "Chengdu"
				}, {
					"cname": "Shanghai"
				}, {
					"cname": "Beijing"
				}]
			});
			var subbranchModel = new JSONModel({
				"dataObj": [{
					"branchName": "a1"
				}, {
					"branchName": "b1"
				}, {
					"branchName": "c1"
				}]
			});
			this.getView().setModel(cityModel, "CityModel");
			this.getView().setModel(subbranchModel, "SubbranchModel");
		},

		bindMockData: function() {
			var directReportsModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/directReports.json");
			var directReportsModel = new JSONModel();
			directReportsModel.loadData(directReportsModelPath, null, false);
			this.getView().setModel(directReportsModel, "directReportsModel");
		},

		onButtonPressed: function() {
			var oLayout = this.byId("SelectLayout");
			if (oLayout.getVisible()) {
				oLayout.setVisible(false);
			} else {
				oLayout.setVisible(true);
			}
		},
		onSearch: function(event) {
			var item = event.getParameter("suggestionItem");
			if (item) {
				sap.m.MessageToast.show("search for: " + item.getText());
			}
		},

		onSuggest: function(event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [new sap.ui.model.Filter([
					new sap.ui.model.Filter("DirectReportsModel>userId", function(sText) {
						return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("DirectReportsModel>username", function(sDes) {
						return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					})
				], false)];
			}

			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest();
		}

	});

});