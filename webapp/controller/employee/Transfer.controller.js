sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "jquery.sap.global", "sap/ui/core/mvc/Controller",
		"hcpsuccessfactors/util/httpRequest", "hcpsuccessfactors/util/formatter", 'sap/m/MessageToast' ], function(
		BaseController, jQuery, Controller, httpRequest, formattor, MessageToast) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.Transfer", {

		sMyTeamPageName : "hcpsuccessfactors.view.employee.MyTeam",

		onInit : function() {
			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},
		_onBeforeShow : function(event) {
			var dataArray = new Array();
			if (event && event.data) {
				if (event.data.mutiple == true) {
					var oContexts = event.data.contexts;
					var bSelected = (oContexts && oContexts.length > 0);
					if (!bSelected) {
						return;
					}
					for (var i = 0; i < oContexts.length; i++) {
						var oModel = oContexts[i].getModel();
						var sPath = oContexts[i].getPath();
						var object = oModel.getObject(sPath);
						object.transferCity = "BJ";
						object.transferLocation = "";
						object.effectiveDate = "2016-05-27";
						object.transferCompany = "";
						dataArray.push(object);
					}
				}
			}
			var oTransferData = new sap.ui.model.json.JSONModel();
			oTransferData.setData(dataArray);
			this.getView().setModel(oTransferData);
			this.getLocationList();
		},

		getLocationList : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("getFOLocation");
			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel, "Location");
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
			});
		},

		onSubmit : function(event) {
			var oModel = this.getView().getModel();
			var oData = oModel.getData();
			var host = this.getServiceHost();
			var url = this.getServiceUrl("transferEmployee");

			var view = this.getView();
			view.setBusy(true)
			var that = this;

			var result = httpRequest.httpPostRequest(host, url, JSON.stringify(oData), true, function(result) {
				view.setBusy(false);
				if (result != null) {
					if (result.success === true) {
						var data = result.data;
						var navTo = that.sMyTeamPageName;
						sap.ui.getCore().getEventBus().publish("nav", "to", {
							id : navTo,
							data : {
								mutiple : true,
								result : data
							}
						});
					} else {
						// TODO: ERROR
					}
				}
			}, function(result) {
				view.setBusy(false);
			});
		},
		onSelectCityKeyChange : function(event) {
			if (event != null && event.getSource() != null) {
				var key = event.getSource().getSelectedKey();
				var oContext = event.getSource().getBindingContext();
				var oModel = oContext.getModel();
				var sPath = oContext.sPath;
				var object = oModel.getObject(sPath);
				object.transferCity = key;
			}
		},
		onSelectLocationKeyChange : function(event) {
			if (event != null && event.getSource() != null) {
				var key = event.getSource().getSelectedKey();
				var oContext = event.getSource().getBindingContext();
				var oModel = oContext.getModel();
				var sPath = oContext.sPath;
				var object = oModel.getObject(sPath);
				object.transferLocation = key;

				var oLocationContext = event.getParameters().selectedItem.getBindingContext("Location");
				if (oLocationContext != undefined) {
					var oLocationObject = oLocationContext.getModel().getObject(oLocationContext.sPath);
					if (oLocationObject != undefined && oLocationObject.companyFlxNav
							&& oLocationObject.companyFlxNav.results
							&& oLocationObject.companyFlxNav.results.length > 0)
						object.transferCompany = oLocationObject.companyFlxNav.results[0].externalCode
				}

			}
		},
		onDateChange : function(event) {
			if (event != null && event.getSource() != null) {
				var sValue = event.getParameter("value");
				var oContext = event.getSource().getBindingContext();
				var oModel = oContext.getModel();
				var sPath = oContext.sPath;
				var object = oModel.getObject(sPath);
				object.effectiveDate = sValue;
			}
		},

		onBackCancel : function(event) {
			this.onNavBack();
		},

		onNavBack : function(event) {
			var navTo = this.sMyTeamPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo
			});
		},

	});

});