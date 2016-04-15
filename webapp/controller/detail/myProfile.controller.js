sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.myProfile", {
		onInit: function(){
			var isDebug=true;
			if(!isDebug){
				//
			}else{
				this.bindMockData();
			}
		},
		
		bindMockData: function(){
			var userModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/user.json");
			var userModel = new JSONModel();
			userModel.loadData(userModelPath, null, false);
			this.getView().setModel(userModel, "UserModel");
		}
		
	});

});