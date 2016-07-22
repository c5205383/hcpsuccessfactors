sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "jquery.sap.global", "sap/ui/core/mvc/Controller",
		"sap/m/MessageBox", "hcpsuccessfactors/util/httpRequest" ], function(BaseController, jQuery, Controller,
		MessageBox, httpRequest) {
	"use strict";

	var array = [];
	return BaseController.extend("hcpsuccessfactors.controller.employee.Hiring", {

		sMyTeamPageName : "hcpsuccessfactors.view.employee.MyTeam",
		sAddFormPageName : "hcpsuccessfactors.view.employee.NewEmployeeForm",
		array : [],
		onInit : function() {

			// initial data model
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(this.array);
			this.getView().setModel(oModel);

			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {
			if (event && event.data) {
				if (event.data.type == "object") {
					this.array.push(event.data.object);
					console.log(event.data.object);
				}
			}
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData(this.array);
			this.getView().setModel(oModel);
		},

		onRemovePressed : function(oEvent) {
			var source = oEvent.getSource();
			if (source) {
				var oContext = source.getBindingContext();
				var sPath = oContext.sPath;
				var sTemp = sPath.split("/");
				var index = (sTemp.length > 0) ? Number(sTemp[sTemp.length - 1]) : 0;
				var howmany = (sTemp.length > 0) ? 1 : 0;
				this.array.splice(index, howmany);
				var oModel = this.getView().getModel();
				oModel.setData(this.array);
				this.getView().setModel(oModel);
			}

		},

		onAddPressed : function(oEvent) {
			var navTo = this.sAddFormPageName;
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo
			});
		},

		onSubmitData : function() {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("empEmployeement");

			var view = this.getView();
			view.setBusy(true)
			var that = this;

			var result = httpRequest.httpPostRequest(host, url, JSON.stringify(this.array), true, function(result) {
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
			});
		},

		onCancel : function() {
			var that = this;
			var navTo = this.sMyTeamPageName;
			if (this.array.length > 0) {
				var bCompact = !!this.getView().$().closest(".sapUiSizeCompact").length;
				MessageBox.confirm("Unsaved data will be lost", {
					styleClass : bCompact ? "sapUiSizeCompact" : "",
					onClose : function(oAction) {
						if (oAction == MessageBox.Action.OK) {
							that.array = [];
							sap.ui.getCore().getEventBus().publish("nav", "to", {
								id : navTo
							});
						}
					}
				});
			} else {

				sap.ui.getCore().getEventBus().publish("nav", "to", {
					id : navTo
				});
			}

		}
	});

});