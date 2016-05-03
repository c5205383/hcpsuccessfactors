sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"jquery.sap.global",
	"sap/m/Button",
	"sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(BaseController, jQuery, Button, MessageToast, Filter, Controller, JSONModel) {
	"use strict";

	var oItem = null;

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.EmployeeTransfer", {

		onInit: function() {

			var isDebug = false;
			if (!isDebug) {
				this.bindData();
			} else {
				this.bindMockData();
			}
			this.oSF = this.byId("searchField");
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
		OnAddPress: function(event) {
			//	var username = this.byId("searchField").getValue();
			var oCtx = oItem.getBindingContext("DirectReportsModel");
			var oTable = this.byId("transfertable");
			var myDate = new Date();
			var Effective = myDate.getFullYear() + "/" + myDate.getMonth() + "/" + myDate.getDay() + " " + myDate.getHours() + ":" + myDate.getMinutes() +
				":" + myDate.getSeconds();

			var itemList = new sap.m.ColumnListItem({
				//type : Active
				//press:onItemPress
			});
			itemList.addCell(
				new sap.m.Text({
					text: oCtx.getProperty("empId")
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: oCtx.getProperty("defaultFullName")
				})
			);
			itemList.addCell(
				new sap.m.Text({
					text: null
				}));
			itemList.addCell(
				new sap.m.Text({
					text: oCtx.getProperty("location")
				}));
			itemList.addCell(
				new sap.m.Text({
					text: oCtx.getProperty("defaultLocale")
				}));
			itemList.addCell(
				new sap.m.Text({
					text: this.byId("transcity").getSelectedItem().getText()
				}));
			itemList.addCell(
				new sap.m.Text({
					text: this.byId("transbranch").getSelectedItem().getText()
				}));
			itemList.addCell(
				new sap.m.Text({
					text: Effective
				})
			);
			oTable.addItem(itemList);
			/*	var myDate = new Date();
				var Effective = myDate.getFullYear()+"/"+myDate.getMonth()+"/"+myDate.getDay()+" "+ myDate.getHours()+":"+myDate.getMinutes()+":"+myDate.getSeconds();
				var data = JSON.stringify({
							empId : oCtx.getProperty("empId"),
							defaultFullName : oCtx.getProperty("defaultFullName"),
							position : null,
							location : oCtx.getProperty("location"),
							defaultLocale : oCtx.getProperty("defaultLocale"),
							transcity : this.byId("transcity").getSelectedItem().getText(),
							transbranch : this.byId("transbranch").getSelectedItem().getText(),
							effectiveDate : Effective
						});
				var oModelIn = new sap.ui.model.json.JSONModel();
					 oModelIn.setData(data);
					 oModelIn.setDefaultBindingMode("OneWay");
					 oTable.setModel(oModelIn);
					// oTable.unbindRows().bindRows("/");*/
		},

		onSearch: function(event) {
			var item = event.getParameter("suggestionItem");
			if (item) {
				sap.m.MessageToast.show("search for: " + item.getText());
				//var oCtx = item.getBindingContext("DirectReportsModel");
				oItem = item;
				//oCtx.getProperty("empId");
				/*var data = JSON.stringify({
						empId : oCtx.getProperty("empId"),
						defaultFullName : oCtx.getProperty("defaultFullName"),
						username : oCtx.getProperty("username"),
						location : oCtx.getProperty("location"),
						defaultLocale : oCtx.getProperty("defaultLocale")
					});*/
				// this.byId("transfertable").addItem(oItem);
			}
		},

		onSuggest: function(event) {
			var value = event.getParameter("suggestValue");
			var filters = [];
			if (value) {
				filters = [new sap.ui.model.Filter([
					new sap.ui.model.Filter("userId", function(sText) {
						return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("defaultFullName", function(sDes) {
						return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					})
				], false)];
			}

			var binding = this.oSF.getBinding("suggestionItems");
			binding.filter(filters);
			this.oSF.suggest();
		}

	});

});