/**
 * @fileOverview HCPSF Admin Center setup controller
 * @author Zero Yu
 */
sap.ui.define(
		[ "hcpsuccessfactors/controller/BaseController", "sap/ui/model/json/JSONModel", "sap/m/MessageToast",
				"hcpsuccessfactors/util/StringUtil", "hcpsuccessfactors/util/httpRequest",
				"hcpsuccessfactors/util/formatter" ], function(BaseController, JSONModel, MessageToast, StringUtil,
				httpRequest, formatter) {
			"use strict";

			return BaseController.extend("hcpsuccessfactors.controller.admincenter.AdminCenter", {
				formatter : formatter,
				loginUserPath : "loginUser",
				/**
				 * @event
				 * @name onInit
				 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
				 * @memberOf hcpsuccessfactors.view.admincenter.AdminCenter
				 */
				onInit : function() {
					this._initialJobData();
				},

				/**
				 * 
				 */
				_initialJobData : function() {
					var host = this.getServiceHost();
					var url = this.getServiceUrl(this.loginUserPath);
					var that = this;
					var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
						if (result != null) {
							if (result.success === true) {
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(result.data);
								that.getView().setModel(oModel, "UserModel");

								that._bindBatchJobsData();

							} else {
								// TODO: ERROR
							}
						}
					}, function(error) {
					});
				},

				/**
				 * @function
				 * @name _bindBatchJobsData
				 * @description preload admin center data
				 */
				_bindBatchJobsData : function() {

					var that = this;
					// load user data
					var oUserModel = this.getView().getModel("UserModel");
					var sUsername = oUserModel.getData().user;

					// function from base controller
					var host = this.getServiceHost();
					var url = this.getServiceUrl("batchJob?owner=" + sUsername);
					this._showBusyIndicator(true);
					var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
						that._showBusyIndicator(false);
						if (result != null) {
							if (result.success === true) {
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(result.data);
								that.getView().setModel(oModel, "BatchJobsModel");

							} else {
								// TODO: ERROR

							}
						}
					}, function(error) {
						that._showBusyIndicator(false);
					});
				},

				/**
				 * @event
				 * @name onAddBJPress
				 * @description open add batch job dialog
				 */
				onAddBatchJobPress : function() {
					if (!this._oDialog) {
						this._oDialog = sap.ui.xmlfragment("hcpsuccessfactors.view.admincenter.AddBJDialog", this);
						this.getView().addDependent(this._oDialog);
						this._loadBatchJobDialogData();
					}
					this._oDialog.open();
				},

				/**
				 * @function
				 * @name _loadData
				 * @description preload add batch job dialog data
				 */
				_loadBatchJobDialogData : function() {
					// load interval data
					(function() {
						var oSelectInterval = sap.ui.getCore().byId("bjdialog-select-interval");
						var intervalData = {
							list : [ {
								key : "0.5",
								value : "30 min"
							}, {
								key : "1",
								value : "1 hour"
							} ]
						};
						var intervalSelectItem;
						oSelectInterval.removeAllItems();
						for (var i = 0, length = intervalData.list.length; i < length; i++) {
							intervalSelectItem = new sap.ui.core.Item({
								key : intervalData.list[i].key,
								text : intervalData.list[i].value
							});
							oSelectInterval.addItem(intervalSelectItem);
						}
						oSelectInterval.setSelectedKey(intervalData.list[0].key);
					})();

					// dynamic load type data
					(function() {
						var oSelectType = sap.ui.getCore().byId("bjdialog-select-type");
						var oBJTypeData = {
							list : [ {
								key : "workflow",
								value : "workflow"
							}, {
								key : "user",
								value : "user"
							} ]
						};
						var typeSelectItem;
						oSelectType.removeAllItems();
						for (var i = 0, length = oBJTypeData.list.length; i < length; i++) {
							typeSelectItem = new sap.ui.core.Item({
								key : oBJTypeData.list[i].key,
								text : oBJTypeData.list[i].value
							});
							oSelectType.addItem(typeSelectItem);
						}
						oSelectType.setSelectedKey(oBJTypeData.list[0].key);
					})();
				},

				/**
				 * @event
				 * @name onDialogSelectOk
				 * @description when dialog's ok is clicked
				 */
				onDialogSelectOk : function() {
					var sInputName = sap.ui.getCore().byId("bjdialog-ipt-name").getValue();
					var sSelectType = sap.ui.getCore().byId("bjdialog-select-type").getSelectedKey();
					var sSelectInterval = sap.ui.getCore().byId("bjdialog-select-interval").getSelectedKey();
					var sInputDescription = sap.ui.getCore().byId("bjdialog-ipt-description").getValue();
					var bStatus = true;
					var sOwner = this.getView().getModel("UserModel").getData().user;

					if (sInputName === "" || sInputDescription === "") {
						MessageToast.show("please complete the input");
						return;
					}

					var oPostBatchJobData = {
						name : sInputName,
						type : sSelectType,
						interval : sSelectInterval,
						info : sInputDescription,
						status : bStatus,
						owner : sOwner
					};

					var oBatchJobsModel = this.getView().getModel("BatchJobsModel");
					var oBatchJobsData = oBatchJobsModel.getData();
					var view = this.getView();
					var host = this.getServiceHost();
					var url = this.getServiceUrl("batchJob");
					var result = httpRequest.httpPostRequest(host, url, JSON.stringify(oPostBatchJobData), true,
							function(result) {
								view.setBusy(false);
								MessageToast.show("add success");
								if (oBatchJobsModel.getJSON() === "{}") {
									oBatchJobsData = [ result ];
								} else {
									oBatchJobsData.push(result);
								}
								oBatchJobsModel.setData(oBatchJobsData);
							}, function(result) {
								view.setBusy(false);
							});

					this.onDialogClose();
				},

				/**
				 * @event
				 * @name onDialogClose
				 * @description close the dialog
				 */
				onDialogClose : function() {
					var oInputName = sap.ui.getCore().byId("bjdialog-ipt-name");
					var oInputDescription = sap.ui.getCore().byId("bjdialog-ipt-description");
					oInputName.setValue("");
					oInputDescription.setValue("");
					this._oDialog.close();
				},

				/**
				 * @event
				 * @name onBJStatusChange
				 * @description press status button
				 * @param {sap.ui.base.Event} -
				 *            oEvent The fired event.
				 */
				onBJStatusChange : function(oEvent) {
					var oItem = oEvent.getSource();
					var oContext = oItem.getBindingContext("BJsModel");
					var sPath = StringUtil.subLastWord(oContext.getPath());
					var oBJsModel = this.getView().getModel("BJsModel");
					var oNewBJsData = oBJsModel.getData();
					var oBJData = oBJsModel.getData()[sPath];
					if (oItem.getIcon() === "sap-icon://begin") {
						oNewBJsData[sPath].status = true;
						oBJData.status = true;
					} else if (oItem.getIcon() === "sap-icon://stop") {
						oNewBJsData[sPath].status = false;
						oBJData.status = false;
					}
					$.ajax({
						url : "/sfsfdataservice/hcp/batchJob/" + oBJData.id,
						type : "PUT",
						async : true,
						contentType : "application/json",
						data : JSON.stringify(oBJData),
						success : function() {
							if (oBJData.status === false) {
								MessageToast.show("start success");
							} else {
								MessageToast.show("stop success");
							}
							oBJsModel.setData(oNewBJsData);
						},
						error : function() {
							MessageToast.show("failed to change status");
						},
						complete : function() {
						}
					});
				},

				/**
				 * @event
				 * @name onDeleteBJPress
				 * @description delete the batch job
				 * @param {sap.ui.base.Event} -
				 *            oEvent The fired event.
				 */
				onDeleteBJPress : function(oEvent) {
					var oItem = oEvent.getSource();
					var oContext = oItem.getBindingContext("BJsModel");
					var sPath = StringUtil.subLastWord(oContext.getPath());
					var oBJsModel = this.getView().getModel("BJsModel");
					var sBatchJobId = oBJsModel.getData()[sPath].id;
					// show dialog when pressing the button
					var oDeleteWarningDialog = new sap.m.Dialog({
						title : "Confirm",
						type : "Message",
						content : new sap.m.Text({
							text : "Are you sure you to delete this batch job?"
						}),
						beginButton : new sap.m.Button({
							text : "OK",
							type : "Accept",
							press : function() {
								$.ajax({
									url : "/sfsfdataservice/hcp/batchJob/" + sBatchJobId,
									type : "DELETE",
									async : true,
									success : function() {
										MessageToast.show("delete success");
										oBJsModel.getData().splice(sPath, 1);
										oBJsModel.refresh(true);
									},
									error : function() {
										MessageToast.show("failed to delete");
									},
									complete : function() {
										oDeleteWarningDialog.close();
									}
								});
							}

						}),
						endButton : new sap.m.Button({
							text : "Cancel",
							type : "Reject",
							press : function() {
								oDeleteWarningDialog.close();
							}
						}),
						afterClose : function() {
							oDeleteWarningDialog.destroy();
						}
					});
					oDeleteWarningDialog.open();
				}

			});
		});