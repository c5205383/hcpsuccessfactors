sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.employeeCenter", {
		onInit: function(){
			var isDebug=true;
			if(!isDebug){
				//
			}else{
				this.bindMockData();
			}
		},
		
		bindMockData: function(){
			var usersModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/users.json");
			var usersModel = new JSONModel();
			usersModel.loadData(usersModelPath, null, false);
			this.getView().setModel(usersModel, "UsersModel");
		}
		
	});

});