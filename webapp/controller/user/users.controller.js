sap.ui.define([ "hcpsuccessfactors/controller/BaseController", "hcpsuccessfactors/util/httpRequest",
		"sap/ui/model/Filter" ], function(BaseController, httpRequest,Filter) {
	"use strict";

	return BaseController.extend("hcpsuccessfactors.controller.user.users",
			{

				onInit : function() {
					var oTable = this.getView().byId("idUsersTable");
					this.bindUserList(oTable);
				},

				bindUserList : function(oTable) {
					var host = this.getServiceHost();
					var url = this.getServiceUrl("users");
					var that = this;
					oTable.setBusy(true);
					var result = httpRequest.httpGetRequest(host, url, null, true, function(result) {
						if (result != null) {
							oTable.setBusy(false);
							if (result.success === true) {
								var oModel = new sap.ui.model.json.JSONModel();
								oModel.setData(result.data);
								oTable.setModel(oModel, "AllUsers");
							} else {
								window.console.log(result);

							}
						}
					});
				},

				onSearch : function(oEvt) {
					var aFilters = [];
					var sQuery = oEvt.getSource().getValue();
					if (sQuery && sQuery.length > 0) {
						var filter = new Filter("object/defaultFullName",
								sap.ui.model.FilterOperator.Contains, sQuery);
						aFilters.push(filter);
					}
					var oTable = this.getView().byId("idUsersTable");
					var binding = oTable.getBinding("items");
					binding.filter(aFilters, "Application");
				}

			});
});