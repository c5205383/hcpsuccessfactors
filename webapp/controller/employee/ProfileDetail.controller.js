sap.ui.define([ "hcpsuccessfactors/controller/BaseController" ], function(BaseController) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.employee.ProfileDetail", {
		onInit : function() {
			this.bindMockData();
			this.getView().addEventDelegate({
				onBeforeShow : jQuery.proxy(function(event) {
					this._onBeforeShow(event);
				}, this)
			});
		},

		_onBeforeShow : function(event) {
			var oRouter = this.getRouter();
			if (oRouter != undefined)
				oRouter.getRoute("userDetail").attachMatched(this._onRouteMatched, this);
			else {
				var oModel;
				var sPath;
				if (event && event.data) {
					this
					if (event.data.mutiple == false) {
						var oContext = event.data.contexts;
						oModel = oContext.getModel();
						sPath = oContext.getPath();
					}
				}
				this.getView().setModel(oModel, "UserModel");
				this.getView().bindElement({
					path : sPath,
					model : "UserModel"
				});
			}
		},

		onSubNavBack : function(event) {
			var oRouter = this.getRouter();
			if (oRouter != undefined) {
				this.onNavBack(event);
			} else {
				var navTo = "view.employee.MyTeam";
				sap.ui.getCore().getEventBus().publish("nav", "to", {
					id : navTo
				});
			}

		},

		_onRouteMatched : function(oEvent) {
			var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.setModel(sap.ui.getCore().getModel("UsersModel"), "UsersModel");

			oView.bindElement({
				path : "/d/results/" + oArgs.id,
				model : "UsersModel"
			});

			// var oControl = this.getView().byId("idState");
			// this._formatStateBackground(oControl,oControl.getText());
		},

		bindMockData : function() {
			var photoModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/photo.json");
			var photoModel = new sap.ui.model.json.JSONModel();
			photoModel.loadData(photoModelPath, null, false);
			this.getView().setModel(photoModel, "photoModel");
		}

	});

});