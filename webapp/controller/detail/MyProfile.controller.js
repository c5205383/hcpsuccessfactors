sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.MyProfile", {
		onInit: function(){
			// var isDebug=true;
			// if(!isDebug){
			// 	//
			// }else{
			// 	//this.bindMockData();
			// }
			this._bindModel();
			var oRouter = this.getRouter();
			oRouter.getRoute("navToMyProfile").attachMatched(this._onNavRouteMatched, this);
			oRouter.getRoute("myProfile").attachMatched(this._onRouteMatched, this);
		},
		
		_bindModel: function() {
			var photoModel = new JSONModel();
			var userModel = new JSONModel();
			this.getView().setModel(userModel, "UserModel");
			this.getView().setModel(photoModel, "PhotoModel");
		},
		
		_bindMockData: function(){
			var photoModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/photo.json");
			this.getView().getModel("PhotoModel").loadData(photoModelPath, null, false);
			var userModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/user.json");
			this.getView().getModel("UserModel").loadData(userModelPath, null, false);
		},
		
		_onNavRouteMatched : function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			var userId = oArgs.id;
			var _this = this;
			this.getView().setBusy(true);
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserById"+"?userId="+userId,
				type: "GET",
				async: true,
				success: function(udata) {
					_this.getView().getModel("UserModel").setData(JSON.parse(udata));
				},
				complete: function() {
                	_this.getView().setBusy(false);
                }
			});
		},
		
		_onRouteMatched: function() {
			//this._bindMockData();
			var userId = "admin";
			var _this = this;
			this.getView().setBusy(true);
			$.ajax({
				url: "/sfsfdataservice/hcp/getUserById"+"?userId="+userId,
				type: "GET",
				async: true,
				success: function(udata) {
					_this.getView().getModel("UserModel").setData(JSON.parse(udata));
				},
				complete: function() {
                	_this.getView().setBusy(false);
                }
			});
		}
		
	});

});