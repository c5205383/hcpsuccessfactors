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
				sNewBatchJobTemplatePath : "model/NewBatchJobTemplate.json",
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
						// TODO: get login user failed, request re-login again
					});
				},

				/**
				 * @event
				 * @name onAddBJPress
				 * @description open add batch job dialog
				 */
				onAddBatchJobPress : function() {
					if (!this._oDialog) {
						this._oDialog = sap.ui
								.xmlfragment("hcpsuccessfactors.view.admincenter.AddBatchJobDialog", this);
						this.getView().addDependent(this._oDialog);
					}
					this._initialDialogData(this._oDialog);
					this._oDialog.open();
				},

				_initialDialogData : function(dialog) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.loadData(this.sNewBatchJobTemplatePath, null, false);
					var oUserModel = this.getView().getModel("UserModel");
					if (oUserModel != undefined) {
						var sUserName = oUserModel.getData().user;
						oModel.getData().owner = sUserName;
						dialog.setModel(oModel, "NewBatchJob");
					}
				},

				/**
				 * @event
				 * @name onDialogSelectOk
				 * @description when dialog's ok is clicked
				 */
				onDialogSelectOk : function() {

					if (this._oDialog) {
						var oDialogModel = this._oDialog.getModel("NewBatchJob");
						var oPostBatchJobData = oDialogModel.getData();

						var oBatchJobsModel = this.getView().getModel("BatchJobsModel");
						var oBatchJobsData = oBatchJobsModel.getData();
						var view = this.getView();
						var host = this.getServiceHost();
						var url = this.getServiceUrl("batchJob");
						var result = httpRequest.httpPostRequest(host, url, JSON.stringify(oPostBatchJobData), true,
								function(result) {
									view.setBusy(false);
									oBatchJobsData.push(result);
									oBatchJobsModel.setData(oBatchJobsData);
									view.setModel(oBatchJobsModel, "BatchJobsModel");
									MessageToast.show("Create Batch Job Successed!");
								}, function(result) {
									view.setBusy(false);
								});

						this.onDialogClose();
					}

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