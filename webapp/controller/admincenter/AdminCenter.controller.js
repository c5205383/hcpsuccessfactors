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
				sBatchJobObjectsPath : "model/BatchJobObjects.json",
				loginUserPath : "loginUser",
				userModel : "UserModel",
				batchJobsModel : "BatchJobsModel",
				batchJobUrl : "batchJob",

				/**
				 * @event
				 * @name onInit
				 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
				 * @memberOf hcpsuccessfactors.view.admincenter.AdminCenter
				 */
				onInit : function() {
					this.getJobData();
					this.refreshUser();
					var that = this;
					setInterval(function() {
						that.getJobData();
					}, 1000 * 30,that);
				},

				onRefreshPressed : function() {
					this.getJobData();
				},

				refreshUser : function() {
					var host = this.getServiceHost();
					var url = this.getServiceUrl(this.loginUserPath);
					var that = this;
					var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
						if (result != null) {
							if (result.success === true) {
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(result.data);
								that.getView().setModel(oModel, that.userModel);
							} else {
								// TODO: ERROR
							}
						}
					});
				},

				/**
				 * @function
				 * @name getJobData
				 * @description preload admin center data
				 */
				getJobData : function() {
					var that = this;
					var host = this.getServiceHost();
					var url = this.getServiceUrl(that.batchJobUrl);
					this._showBusyIndicator(true);
					var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
						that._showBusyIndicator(false);
						if (result != null) {
							if (result.success === true) {
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(result.data);
								that.getView().setModel(oModel, that.batchJobsModel);

							} else {
								// TODO: ERROR

							}
						}
					});
				},

				/**
				 * @event
				 * @name onAddBatchJobPressed
				 * @description open add batch job dialog
				 */
				onAddBatchJobPressed : function() {
					var sFragmentPath = "hcpsuccessfactors.view.admincenter.AddBatchJobDialog";
					if (!this.oDialog) {
						this.oDialog = sap.ui.xmlfragment(sFragmentPath, this);
						this.getView().addDependent(this.oDialog);
					}
					this.initialDialogData(this.oDialog);
					this.oDialog.open();
				},

				initialDialogData : function(dialog) {
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.loadData(this.sNewBatchJobTemplatePath, null, false);
					var oUserModel = this.getView().getModel(this.userModel);
					if (oUserModel != undefined) {
						var sUserName = oUserModel.getData().user;
						oModel.getData().owner = sUserName;
					}
					dialog.setModel(oModel, "NewBatchJob");

					var oObjectsModel = new sap.ui.model.json.JSONModel();
					oObjectsModel.loadData(this.sBatchJobObjectsPath, null, false);
					dialog.setModel(oObjectsModel, "BatchJobObjects");

				},

				/**
				 * @event
				 * @name onDialogSelectOk
				 * @description when dialog's ok is clicked
				 */
				onDialogSelectOk : function() {
					if (this.oDialog) {
						var oDialogModel = this.oDialog.getModel("NewBatchJob");
						var oPostBatchJobData = oDialogModel.getData();

						if (!this.validateJobData(oPostBatchJobData)) {
							MessageToast.show("Please input neccessary data!");
							return;
						}

						var that = this;
						var host = this.getServiceHost();
						var url = this.getServiceUrl(that.batchJobUrl);

						var result = httpRequest.httpPostRequest(host, url, JSON.stringify(oPostBatchJobData), true,
								function(result) {
									if (result.success == true) {
										MessageToast.show("Create Batch Job Successed!");
										that.getJobData();
									}
								});
						this.onDialogClose();
					}
				},

				validateJobData : function(data) {
					if (data != undefined) {
						return (data.name != null) & (data.name != "") & (data.type != null) & (data.type != "")
								& (data.interval != null) & (data.interval != "");
					} else
						return false;
				},

				/**
				 * @event
				 * @name onDialogClose
				 * @description close the dialog
				 */
				onDialogClose : function() {
					if (this.oDialog)
						this.oDialog.close();
				},

				/**
				 * @event
				 * @name onChangeBatchJobStatus
				 * @description press status button
				 * @param {sap.ui.base.Event} -
				 *            oEvent The fired event.
				 */
				onChangeBatchJobStatus : function(oEvent) {

					var oJobList = this.getView().byId("jobListId");
					var oItem = oEvent.getSource();
					var oContext = oItem.getBindingContext(this.batchJobsModel);
					var sPath = StringUtil.subLastWord(oContext.getPath());
					var oModel = this.getView().getModel(this.batchJobsModel);
					var object = oModel.getData()[sPath].object

					if (object == undefined)
						return;

					object.status = !object.status;
					if (object.status) {
						object.runningStatus = "RUNNING";
					} else {
						object.runningStatus = "STOP";
					}

					var that = this;
					var host = this.getServiceHost();
					var url = this.getServiceUrl(that.batchJobUrl + "/" + object.id);
					oJobList.setBusy(true);
					var result = httpRequest.httpRequest(host, url, JSON.stringify(object), true,
							httpRequest.httpRequestMethod.PUT, function(result) {
								if (result.success) {

								} else {
									MessageToast.show("failed to change status");
								}
								oJobList.setBusy(false);
								that.getJobData();

							});
				},

				/**
				 * @event
				 * @name onDeleteBJPress
				 * @description delete the batch job
				 * @param {sap.ui.base.Event} -
				 *            oEvent The fired event.
				 */
				onDeleteBatchJobPressed : function(oEvent) {
					var oJobList = this.getView().byId("jobListId");
					var oItem = oEvent.getSource();
					var oContext = oItem.getBindingContext(this.batchJobsModel);
					var sPath = StringUtil.subLastWord(oContext.getPath());
					var oModel = this.getView().getModel(this.batchJobsModel);
					var sBatchJobId = oModel.getData()[sPath].object.id;

					if (sBatchJobId == undefined || sBatchJobId == "")
						return;
					// show dialog when pressing the button
					var that = this;
					var host = this.getServiceHost();
					var url = this.getServiceUrl(that.batchJobUrl + "/" + sBatchJobId);

					var oDeleteWarningDialog = new sap.m.Dialog({
						title : "Confirm",
						type : "Message",
						content : new sap.m.Text({
							text : "Are you sure to delete this batch job?"
						}),
						beginButton : new sap.m.Button({
							text : "OK",
							type : "Accept",
							press : function() {
								oJobList.setBusy(true);
								var result = httpRequest.httpRequest(host, url, null, true,
										httpRequest.httpRequestMethod.DELETE, function(result) {
											oDeleteWarningDialog.close();
											MessageToast.show("Delete Job Successfully!");
											that.getJobData();
											oJobList.setBusy(false);
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