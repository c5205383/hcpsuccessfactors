// sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/util/httpRequest" ], function(BaseController, httpRequest) {
// 	"use strict";

// 	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.ApprovalList", {

// 		onInit : function() {
// 			this.onRefreshPressed();
// 		},

// 		getEventReason : function() {
// 			var isDebug = false;
// 			if (window.location.hostname === "localhost" || window.location.hostname == "127.0.0.1")
// 				isDebug = true;
// 			var host;
// 			var url;

// 			if (isDebug) {
// 				host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
// 				url = "hcpmiddleware/hcp/getFOEventReason";

// 			} else {
// 				var host = null;
// 				var url = "sfsfdataservice/hcp/getFOEventReason";
// 			}
// 			var that = this;
// 			var result = httpRequest.httpGetRequest(host, url, true, function(result) {
// 				if (result != null) {
// 					that.hideBusyIndicator();
// 					if (result.success === true) {
// 						var oEventReasonModel = new sap.ui.model.json.JSONModel();
// 						oEventReasonModel.setData(result.data);
// 						that.getView().setModel(oEventReasonModel, "EventReason");
// 					} else {
// 						// TODO: ERROR

// 					}
// 				}
// 			});
// 		},

// 		getWorkflow : function(requestBy, requestFor, eventReason) {
// 			var isDebug = false;
// 			if (window.location.hostname === "localhost" || window.location.hostname == "127.0.0.1")
// 				isDebug = true;
// 			var host;
// 			var url;

// 			if (isDebug) {
// 				host = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
// 				url = "hcpmiddleware/hcp/getEmpWorkflow";

// 			} else {
// 				var host = null;
// 				var url = "sfsfdataservice/hcp/getEmpWorkflow";
// 			}
// 			var that = this;
// 			var result = httpRequest.httpGetRequest(host, url, true, function(result) {
// 				if (result != null) {
// 					that.hideBusyIndicator();
// 					if (result.success === true) {
// 						var oEventReasonModel = new sap.ui.model.json.JSONModel();
// 						oEventReasonModel.setData(result.data);
// 						that.getView().setModel(oEventReasonModel, "WorkFlow");
// 					} else {
// 						// TODO: ERROR

// 					}
// 				}
// 			});
// 		},

// 		onSelectKeyChange : function(oEvent) {
// 			this.showBusyIndicator(1000 * 60);
// 			this.getWorkflow();
// 		},

// 		hideBusyIndicator : function() {
// 			sap.ui.core.BusyIndicator.hide();
// 		},

// 		showBusyIndicator : function(iDuration, iDelay) {
// 			sap.ui.core.BusyIndicator.show(iDelay);

// 			if (iDuration && iDuration > 0) {
// 				if (this._sTimeoutId) {
// 					jQuery.sap.clearDelayedCall(this._sTimeoutId);
// 					this._sTimeoutId = null;
// 				}

// 				this._sTimeoutId = jQuery.sap.delayedCall(iDuration, this, function() {
// 					this.hideBusyIndicator();
// 				});
// 			}
// 		},
// 		onRefreshPressed : function(oEvent) {

// 			/*
// 			 * this._showBusyIndicator(true); var t =
// 			 * setTimeout((function(_this) { return function() {
// 			 * _this._showBusyIndicator(false); }; })(this), 5000 * 6);
// 			 */
// 			this.showBusyIndicator(1000 * 60);
// 			this.getEventReason();
// 		},

// 		_showBusyIndicator : function(busy) {
// 			this.busyIndicator = this.getView().byId("flexBox");
// 			this.busyIndicator.setVisible(busy);
// 		}
// 	});

// });


sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"hcpsuccessfactors/util/httpRequest",
	"sap/ui/model/json/JSONModel"
], function(BaseController, httpRequest, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.starbucks.ApprovalList", {
	    
	    onInit: function() {
	        this.bindModel();
	        this.loadData();
	    },
	    
	    bindModel: function(){
	        var EventReasonModel = new JSONModel();
			this.getView().setModel(EventReasonModel, "EventReason");
			var EmpWfModel = new JSONModel();
			this.getView().setModel(EmpWfModel, "WorkFlow");
	    },
	    
	    loadData: function() {
	        var _this = this;
	        $.ajax({
	            url: "/sfsfdataservice/hcp/getFOEventReason",
	            type: "GET",
	            success: function(erdata) {
				    _this.getView().getModel("EventReason").setData(JSON.parse(erdata));
				    var key = _this.getView().getModel("EventReason").getData().dataObj[0].externalCode;
				    _this.getView().getModel("WorkFlow").loadData("/sfsfdataservice/hcp/getEmpWorkflow", {"eventReason":key, "userId":"admin"});
				},
				error: function() {
					//console.error("failed to get MyShop.");
				},
				complete: function() {
				    //_this.showBusyIndicator(false);
			        //_this.byId("ActiveList").setVisible(true);
				}
	        });
	    },
	    
	    onSelectKeyChange: function() {
	    	var eventReason = this.getView().byId("eventReasonSelector").getSelectedKey();
	    	var planModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/empwf.json");
			//var planModel = new JSONModel();
			//planModel.loadData(planModelPath, null, false);
			//this.getView().setModel(planModel, "GoalPlanModel");
			this.getView().getModel("WorkFlow").loadData(planModelPath, null, false);
	    }
	    
	    
	});

});