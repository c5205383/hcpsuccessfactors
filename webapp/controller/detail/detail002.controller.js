sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(BaseController, models, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.detail002", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */

		onInit: function() {
			// set the device model
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");

			var isDebug = true;
			if (!isDebug) {
				this.createDetailView();
			} else {
				this.createTestView();
			}
			//

		},

		createDetailView: function() {
			var page2 = this.getView().byId("detail2page");
			var _this = this;
			var oRouter = this.getRouter();
			$.ajax({
				url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoalPlanTemplate",
				type: "GET",
				dataType: "jsonp",
				data: {
					json: "processResults"
				},
				jsonp: "callback",
				jsonpCallback: "processResults",
				async: true,
				success: function(data) {
					var templateModel = new JSONModel(data);
					_this.getView().setModel(templateModel, "templateModel");
					var selectItem = "";
					var selectItemArray = [];
					for (var i = 0; i < data.list.length; i++) {
						selectItem = new sap.ui.core.Item({
							key: data.list[i].id,
							text: data.list[i].name
						});
						selectItemArray.push(selectItem);
					}
					var templateSelect = sap.m.Select({
						id: "tSelect",
						autoAdjustWidth: true,
						selectKey: data.list[0].id,
						items: selectItemArray
					}).attachChange(function(oEvent) {
						_this.onTempalteChanged(oEvent);
					}, this);
					page2.addContent(templateSelect);

					var curId = sap.ui.getCore().byId("tSelect").getItemAt(0).getKey();
					var callBack = "g" + curId;
					$.ajax({
						url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoal",
						type: "GET",
						dataType: "jsonp",
						data: {
							id: curId
						},
						jsonp: "callback",
						jsonpCallback: callBack,
						async: true,
						success: function(gdata) {
							var goalModel = new JSONModel(gdata);
							_this.getView().setModel(goalModel, "goalModel");
							var goalTable = new sap.m.Table({
								id: "gTable",
								columns: [
									new sap.m.Column({
										header: new sap.m.Text({
											text: "id"
										})
									}),
									new sap.m.Column({
										header: new sap.m.Text({
											text: "name"
										})
									}),
									new sap.m.Column({
										header: new sap.m.Text({
											text: "userId"
										})
									}),
									new sap.m.Column({
										header: new sap.m.Text({
											text: "state"
										})
									})
								],
								items: {
									path: "goalModel>/goals",
									factory: function(sId, oContext) {
										return new sap.m.ColumnListItem({
											cells: [
												new sap.m.Text({
													text: "{goalModel>id}"
												}),
												new sap.m.Text({
													text: "{goalModel>name}"
												}),
												new sap.m.Text({
													text: "{goalModel>userId}"
												}),
												new sap.m.Text({
													text: "{goalModel>state}"
												})
											]
										}).attachBrowserEvent("click", function(oEvent) {
											var clickItemGoalId = sap.ui.getCore().byId(this.sId).mAggregations.cells[0].mProperties.text;
											oRouter.navTo("goalDetail", {
												id: clickItemGoalId
											});
										});
									}
								}
							});
							page2.addContent(goalTable);
						},
						error: function() {
							alert("fail");
						}
					});

				},
				error: function() {
					alert("fail");
				}
			});

		},

		onTempalteChanged: function() {
			alert("change");
			this.getView().getModel("goalModel").setData({});
			var curId = sap.ui.getCore().byId("tSelect").getSelectedKey();
			var callBack = "g" + curId;
			var _this = this;
			$.ajax({
				url: "https://middlewarei326962trial.hanatrial.ondemand.com/hcpmiddleware/api/getGoal",
				type: "GET",
				dataType: "jsonp",
				data: {
					id: curId
				},
				jsonp: "callback",
				jsonpCallback: callBack,
				async: true,
				success: function(gdata) {
					_this.getView().getModel("goalModel").setData(gdata);
				},
				error: function() {
					alert("failed to change goal");
				}
			});
		},

		createTestView: function() {
			var page2 = this.getView().byId("detail2page");
			var oRouter = this.getRouter();

			var modelPath2 = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/goalTemplate.json");
			var oModel2 = new sap.ui.model.json.JSONModel();
			oModel2.loadData(modelPath2, null, false);
			this.getView().setModel(oModel2, "templateModel");

			var data = oModel2.getData();
			var selectItem = "";
			var selectItemArray = [];
			for (var i = 0; i < data.list.length; i++) {
				selectItem = new sap.ui.core.Item({
					key: data.list[i].id,
					text: data.list[i].name
				});
				selectItemArray.push(selectItem);
			}
			var templateSelect = new sap.m.Select({
				id: "tSelect",
				autoAdjustWidth: true,
				selectKey: data.list[0].id,
				items: selectItemArray
			}).attachChange(function(oEvent) {
				//_this.onTempalteChanged(oEvent);
			}, this);
			page2.addContent(templateSelect);

			var url="/mockData/goal_"+data.list[0].id+".json";
			var modelPath = jQuery.sap.getModulePath("hcpsuccessfactors", url);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData(modelPath, null, false);
			this.getView().setModel(oModel, "goalModel");

			var goalTable = new sap.m.Table({
				id: "gTable",
				columns: [
					new sap.m.Column({
						header: new sap.m.Text({
							text: "id"
						})
					}),
					new sap.m.Column({
						header: new sap.m.Text({
							text: "name"
						})
					}),
					new sap.m.Column({
						header: new sap.m.Text({
							text: "userId"
						})
					}),
					new sap.m.Column({
						header: new sap.m.Text({
							text: "state"
						})
					})
				],
				items: {
					path: "goalModel>/goals",
					factory: function(sId, oContext) {
						return new sap.m.ColumnListItem({
							cells: [
								new sap.m.Text({
									text: "{goalModel>id}"
								}),
								new sap.m.Text({
									text: "{goalModel>name}"
								}),
								new sap.m.Text({
									text: "{goalModel>userId}"
								}),
								new sap.m.Text({
									text: "{goalModel>state}"
								})
							]
						}).attachBrowserEvent("click", function(oEvent) {
							var clickItemGoalId = sap.ui.getCore().byId(this.sId).mAggregations.cells[0].mProperties.text;
							oRouter.navTo("goalDetail", {
								id: clickItemGoalId
							});
						});
					}
				}
			});
			page2.addContent(goalTable);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf successfactorsext.view.detail.view.detail02
		 */
		//	onExit: function() {
		//
		//	}

	});

});