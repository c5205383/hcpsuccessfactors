sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel", 
		"hcpsuccessfactors/util/httpRequest" ], function(BaseController, JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.NewEmployeeForm", {

		sParentPageName : "hcpsuccessfactors.view.employee.Hiring",
		sEmployeeTemplatePath : "model/EmployeeInfoTemplate.json",
		Status : {
			bCompanyReady : false,
			bJobCodeReady : false,
			bBusinessUnitReady : false,
			bCountryReady : false
		},

		onInit : function() {

			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {

			if (event) {
				this._initialEmployeeData();
				if (!this.Status.bCompanyReady) {
					this._getCompanyList();
				}
				if (!this.Status.bJobCodeReady) {
					this._getJobCodeList();
				}
				if (!this.Status.bBusinessUnitReady) {
					this._getBusinessUnitList();
				}
				if (!this.Status.bCountryReady) {
					this._getCountryList();
				}
			}
		},

		_initialEmployeeData : function() {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(this.sEmployeeTemplatePath, null, false);
			this.getView().setModel(oModel);
		},

		_getCountryList : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("Country");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "Country");
						that.Status.bCountryReady = true
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},

		_getBusinessUnitList : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("FOBusinessUnit");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "BusinessUnit");
						that.Status.bBusinessUnitReady = true
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},

		_getJobCodeList : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("FOJobCode");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "JobCode");
						that.Status.bJobCodeReady = true
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
						that.Status.bCompanyReady = true
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},

		onValueChanged : function(oEvent) {
			var genderSelector = this.getView().byId("genderSelectorId");
			var employeeTypeSelector = this.getView().byId("empTypeSelectorId");
			var companySelector = this.getView().byId("companySelectorId");
			var jobCodeSelector = this.getView().byId("jobCodeSelectorId");
			var businessUnitSelector = this.getView().byId("businessUnitSelectorId");
			var countrySelector = this.getView().byId("countrySelectorId");

			var source = oEvent.getSource();
			var key = source.getSelectedKey();
			var object = this.getView().getModel().getData();

			if (source === genderSelector) {
				object.employee.gender = key;
			} else if (source == employeeTypeSelector) {
				object.employee.type = key;
			} else if (source == companySelector) {
				object.employee.company = key;
			} else if (source == jobCodeSelector) {
				object.employee.jobCode = key;
			} else if (source == businessUnitSelector) {
				object.employee.businessUnit = key;
			} else if (source == countrySelector) {
				object.employee.country = key;
			}
			console.log(object);
		},
		onCancelPressed : function(oEvent) {
			var navTo = this.sParentPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo
			});
		},

		onOKPressed : function(oEvent) {
			var object = this.getView().getModel().getData();
			var navTo = this.sParentPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo,
				data : {
					type : "object",
					object : object
				}
			});

		}
	});
});