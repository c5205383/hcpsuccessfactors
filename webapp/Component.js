sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"hcpsuccessfactors/model/models",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("hcpsuccessfactors.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			var testCompyList = new sap.ui.model.odata.ODataModel("/destinations/testCompyList/refapp-companylist-web/companylist.svc/", true);
    		this.setModel(testCompyList,"testCompyList");
    		
    		// init the router
    		this.getRouter().initialize();
    		
    		// init global model
    		var goalModel = new JSONModel();
			sap.ui.getCore().setModel(goalModel, "GoalModel");
			var usersModel = new JSONModel();
			sap.ui.getCore().setModel(usersModel, "UsersModel");
		}
	});

});