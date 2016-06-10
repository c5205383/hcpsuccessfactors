sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel",
		"hcpsuccessfactors/util/httpRequest" ], function(BaseController, JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.NewEmployeeForm", {

		sParentPageName : "hcpsuccessfactors.view.employee.Hiring",
		sEmployeeTemplatePath : "model/EmployeeInfoTemplate.json",

		onInit : function() {

			this._initialEmployeeData();
			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {
			if (event && event.data) {
			}
		},

		_initialEmployeeData : function() {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(this.sEmployeeTemplatePath, null, false);
			this.getView().setModel(oModel);
			// Initialize Company List
			this._getCompanyList();
			// Initialize Job Code List
			this._getJobCodeList();
			//Initialize Business Unit
			this._getBusinessUnitList();
			//Initilize Country List
			this._getCountryList();
			
		},
		
		_getCountryList:function(){
			var host = this.getServiceHost();
			var url = this.getServiceUrl("Country");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "Country");
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},
		
		_getBusinessUnitList:function(){
			var host = this.getServiceHost();
			var url = this.getServiceUrl("FOBusinessUnit");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "BusinessUnit");
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},
		
		_getJobCodeList:function(){
			var host = this.getServiceHost();
			var url = this.getServiceUrl("FOJobCode");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "JobCode");
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},

		_getCompanyList : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("FOCompany");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "Company");
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},
		onBackCancel : function(oEvent) {
			var navTo = this.sParentPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo
			});
		}
	});
});