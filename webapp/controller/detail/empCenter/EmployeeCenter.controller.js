jQuery.sap.require("hcpsuccessfactors.util.StringUtil");
jQuery.sap.require("sap.m.TablePersoController");
sap.ui.define([
	"hcpsuccessfactors/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.detail.empCenter.EmployeeCenter", {
		onInit: function() {
			var isDebug = true;
			if (!isDebug) {
				//
			} else {
				this.bindMockData();
				this.getDemoPersoService();
				this.initTablePersoController();
			}
		},

		bindMockData: function() {
			var usersModelPath = jQuery.sap.getModulePath("hcpsuccessfactors", "/mockData/users.json");
			var usersModel = new JSONModel();
			sap.ui.getCore().getModel("UsersModel").loadData(usersModelPath, null, false);
			usersModel.loadData(usersModelPath, null, false);
			this.getView().setModel(usersModel, "UsersModel");
		},
		
		getDemoPersoService: function() {
		    if(!this.demoPersoService) {
		        var DemoPersoService = {

		        oData : {
			        _persoSchemaVersion: "1.0",
			        aColumns : [
				        {
					        id: "demoApp-empTable-userIdCol",
					        order: 2,
					        text: "{i18n>empTable-uid}",
					        visible: true
				        },
				        {
					        id: "demoApp-empTable-userNameCol",
				        	order: 1,
					        text: "{i18n>empTable-uname}",
					        visible: true
				        },
				        {
					        id: "demoApp-empTable-userGenderCol",
					        order: 0,
					        text: "{i18n>empTable-gender}",
					        visible: false
				        },
				        {
					        id: "demoApp-empTable-userEmailCol",
					        order: 3,
					        text: "{i18n>empTable-email}",
					        visible: true
				        }
			        ]
		        },

		        getPersData : function () {
			        var oDeferred = new jQuery.Deferred();
			        if (!this._oBundle) {
				        this._oBundle = this.oData;
			        }
			        var oBundle = this._oBundle;
			        oDeferred.resolve(oBundle);
			        return oDeferred.promise();
		        },

		        setPersData : function (oBundle) {
			        var oDeferred = new jQuery.Deferred();
		        	this._oBundle = oBundle;
			        oDeferred.resolve();
			        return oDeferred.promise();
		        },

		        resetPersData : function () {
			        var oDeferred = new jQuery.Deferred();
			        var oInitialData = {
					        _persoSchemaVersion: "1.0",
					        aColumns : [
					            {
					                id: "demoApp-empTable-userIdCol",
					                order: 2,
					                text: "{i18n>empTable-uid}",
					                visible: true
				                },
				                {
					                id: "demoApp-empTable-userNameCol",
					                order: 1,
					                text: "{i18n>empTable-uname}",
					                visible: true
				                },
			        	        {
					                id: "demoApp-empTable-userGenderCol",
					                order: 0,
					                text: "{i18n>empTable-gender}",
					                visible: false
				                },
				                {
					                id: "demoApp-empTable-userEmailCol",
					                order: 3,
				                	text: "{i18n>empTable-email}",
					                visible: true
				                }
							]
			        };

		  	        //set personalization
			        this._oBundle = oInitialData;

			        //reset personalization, i.e. display table as defined
	                //this._oBundle = null;

			        oDeferred.resolve();
			        return oDeferred.promise();
		        },

		        //this caption callback will modify the TablePersoDialog' entry for the 'Weight' column
		        //to 'Weight (Important!)', but will leave all other column names as they are.
		        getCaption : function (oColumn) {
			        if (oColumn.getHeader() && oColumn.getHeader().getText) {
				        if (oColumn.getHeader().getText() === "Weight") {
					        return "Weight (Important!)";
				        }
			        }
			        return null;
		        },

		        getGroup : function(oColumn) {
			        if( oColumn.getId().indexOf("userIdCol") != -1 ||
					    oColumn.getId().indexOf("userNameCol") != -1) {
				            return "Primary Group";
			        }
			        return "Secondary Group";
		        }
		    }
		    this.demoPersoService = DemoPersoService;
		    }
		    return this.demoPersoService;
		},
		
		initTablePersoController: function() {
		   this._oTPC = new sap.m.TablePersoController({
				table: this.getView().byId("empTable"),
				//specify the first part of persistence ids e.g. 'demoApp-idUserList-userNameCol'
				componentName: "demoApp",
				persoService: this.demoPersoService
			}).activate(); 
		},
		
		onItemPress: function(oEvent) {
			//alert("click");
			var oItem = oEvent.getSource();
			var spath = oItem.getBindingContext("UsersModel");
			this.getRouter().navTo("userDetail", {
				id: hcpsuccessfactors.util.StringUtil.subLastWord(spath.getPath())
			});
		},
		
		onSearch: function(oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("username", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}

			// update list binding
			var oTable = this.getView().byId("empTable");
			var binding = oTable.getBinding("items");
			binding.filter(aFilters, "Application");
		},

		onPersoButtonPressed: function () {
			this._oTPC.openDialog();
		},

		onTablePersoRefresh : function() {
			this.demoPersoService.resetPersData();
			this._oTPC.refresh();
		},

		onTableGrouping : function(oEvent) {
			this._oTPC.setHasGrouping(oEvent.getSource().getSelected());
		}

	});

});