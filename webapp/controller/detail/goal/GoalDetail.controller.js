jQuery.sap.require("hcpsuccessfactors.util.format");
sap.ui.define([
   "hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
    "use strict";
    return BaseController.extend("hcpsuccessfactors.controller.detail.goal.GoalDetail", {
    	
    	/**
		 * @event
		 * @name onInit
		 * @description Called when a controller is instantiated and its View controls (if available) are already created. Mainly set model.
		 * @memberOf hcpsuccessfactors.view.goal.GoalDetail
		 */
        onInit: function(){
        	this._bindModel();
        	this.getRouter().getRoute("goalDetail").attachMatched(this._onRouteMatched, this);
        },
        
        /**
		 * @function
		 * @name _bindModel
		 * @description bind model
		 */
        _bindModel : function () {
        	var oGoalModel = new JSONModel();
        	this.getView().setModel(oGoalModel, "GoalModel");
        },
        
        /**
		 * @function
		 * @name _loadData
		 * @description retrieve goal data via ajax from odata
		 * @param {String} id of the goal
		 */
        _loadData : function (sTemplateId, sGoalId) {
        	var _this = this;
			//callback func of getting goal succeed
			var fnGoalSucCallback = function (oData) {
				_this.getView().getModel("GoalModel").setData(oData);
			};
			//callback func of getting goal complete
			var fnComCallback = function () {
				_this._showBusyIndicator(false);
			};
			this._showBusyIndicator(true);
			//to get goal data
			this.httpGet(true, "Goal_" + sTemplateId, sGoalId, null, null, fnGoalSucCallback, null, fnComCallback);
        },
        
        /**
		 * @function
		 * @name _onRouteMatched
		 * @description when matching route name 'goalDetail'
		 * @param {sap.ui.base.Event} - oEvent The fired event.
		 */
        _onRouteMatched : function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			
			this._loadData(oArgs.tid, oArgs.gid);
			
			var oControl = this.getView().byId("idState");
			this._formatStateBackground(oControl, oControl.getText());
		},
		
		/**
		 * @function
		 * @name _formatStateBackground
		 * @description format state background
		 * @param {sap.ui.core.Control} - the control
		 * @param {String} - the text of the control
		 */
		_formatStateBackground:function(oControl, sText){
		    oControl.addStyleClass("cssBackground");
			switch(sText){
				case "Not Started" :
					$(".cssBackground").css("background-color","white");
					$(".cssBackground").css("color","black");
					break;
				case "On Track" :
					$(".cssBackground").css("background-color","yellow");
					$(".cssBackground").css("color","black");
					break;
				case "Behind" :
					$(".cssBackground").css("background-color","red");
					$(".cssBackground").css("color","white");
					break;
				case "Completed" :
					$(".cssBackground").css("background-color","green");
					$(".cssBackground").css("color","white");
					break;
				case "Postponed" :
					$(".cssBackground").css("background-color","purple");
					$(".cssBackground").css("color","white");
					break;
				case "Cancelled" :
					$(".cssBackground").css("background-color","blue");
					$(".cssBackground").css("color","white");
					break;
			}
		}
		
    });
});