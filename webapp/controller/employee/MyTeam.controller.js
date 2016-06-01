sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel",
		"hcpsuccessfactors/util/httpRequest" ], function(BaseController, JSONModel, httpRequest) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.MyTeam", {
		onInit : function() {
			this.onRefreshPressed();
			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {
			if (event && event.data) {
				if (event.data.result != undefined) {
					var message = "";
					var state = "Success";
					for (var i = 0; i < event.data.result.d.length; i++) {
						var o = event.data.result.d[i];
						if (o.status == "ERROR") {
							state = "Error";
							message += o.index + ":" + o.status + " " + o.message + "\r\n";
						} else {
							message += o.index + ":" + o.status + " " + "\r\n";
						}
					}
					var messageStrip = this.getView().byId("messageStripId");
					messageStrip.setVisible(true);
					messageStrip.setText(message);
					messageStrip.setType(state);
					messageStrip.setTooltip(message);
				}
			}
		},

		onPress : function(oEvent) {
			// this.getRouter().navTo("hiringProcess", {});
			var navTo = "view.detail.starbucks.HiringProcess";
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo
			});

		},

		onListItemPress : function(oEvent) {
			var navTo = "view.detail.empCenter.ProfileDetail";
			var oItem = oEvent.getSource();
			var oContext = oItem.getBindingContext();
			sap.ui.getCore().getEventBus().publish("nav", "to", {
				id : navTo,
				data : {
					mutiple : false,
					contexts : oContext
				}
			});
			// sap.ui.getCore().History()
		},

		onTransferShopPressed : function(oEvent) {
			var oList = this.getView().byId("myActiveEmployeeListId");
			var aContexts = oList.getSelectedContexts(true);

			var bSelected = (aContexts && aContexts.length > 0);
			if (!bSelected) {
				return;
			}

			if (aContexts) {
				var navTo = "view.detail.starbucks.TransferShop";
				sap.ui.getCore().getEventBus().publish("nav", "to", {
					id : navTo,
					data : {
						mutiple : true,
						contexts : aContexts
					}
				});
			}

		},

		getMyEmployeeList : function(oList) {
			var host = this.getServiceHost();
			var url = this.getServiceUrl("getEmpDirectReports");

			var that = this;
			var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
				if (result != null) {
					oList.setBusy(false);
					if (result.success === true) {
						var oModel = new sap.ui.model.json.JSONModel();
						oModel.setData(result.data);
						that.getView().setModel(oModel);
					} else {
						// TODO: ERROR

					}
				}
			}, function(error) {
				oList.setBusy(false);
			});
		},

		onRefreshPressed : function(oEvent) {
			var oList = this.getView().byId("myActiveEmployeeListId");
			oList.setBusy(true);
			this.getMyEmployeeList(oList);
		},

		onSelectionChanged : function(oEvent) {
			var oList = oEvent.getSource();
			var oLabel = this.getView().byId("idFilterLabel");
			var oInfoToolbar = this.getView().byId("idInfoToolbar");

			// With the 'getSelectedContexts' function you can access the context paths
			// of all list items that have been selected, regardless of any current filter on the aggregation binding.
			var aContexts = oList.getSelectedContexts(true);

			// update UI
			var bSelected = (aContexts && aContexts.length > 0);
			var sText = (bSelected) ? aContexts.length + " selected" : null;
			oInfoToolbar.setVisible(bSelected);
			oLabel.setText(sText);

		},
		onChange : function(oEvent) {
		}
	});
});