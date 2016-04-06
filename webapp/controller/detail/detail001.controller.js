sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"hcpsuccessfactors/model/models"
], function(Controller, models) {
	"use strict";

	return Controller.extend("hcpsuccessfactors.controller.detail.detail001", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf successfactorsext.view.detail.view.detail001
		 */
		onInit: function() {

			// set the device model
			this.getView().setModel(models.createDeviceModel(), "device").bindElement("device>/");
			this.createDetailView();
			//this.getView().setModel(models.createDeviceModel());

		},

		createDetailView: function() {
			alert("hi");
			var container = this.getView().byId("gridContent");
			var parentCmp = this;

			var jsonpName = "";

			$.ajax({
				type: "get",
				async: false,
				url: "https://hcpobjectivec5205383trial.hanatrial.ondemand.com/hcpobjective/api/system/state",
				//url : "http://localhost:13080/hcpobjective/api/system/state",  
				dataType: "jsonp",
				data: {
					jsonpName: 'processResults'
				},
				jsonp: "callback",
				jsonpCallback: "processResults",
				success: function(json) {
					//alert('result: ' + json);  
					//parentCmp.showBusyIndicator(false);
					/*for(var i=1;i<=10;i++){
	      				var containerPanel =  new sap.m.Panel({
	      					layoutData: new sap.ui.layout.GridData({span: "L4 M6 S12"}),
	      					width: "20rem",
	      					height: "20rem",
	      					content: new sap.m.Text({text:"Item-"+i})
	      				}).addStyleClass("objectiveCard");
	      				container.addContent(containerPanel);
	      			}*/

					var oTable = new sap.m.Table({
						id: "Company",
						mode: sap.m.ListMode.None,
						headerToolbar: new sap.m.Toolbar({
							content: [new sap.m.Title({
								text: "Test OData Service from https://companylistdemo.hana.ondemand.com/refapp-companylist-web/companylist.svc/"
							})]
						}),
						columns: [
							new sap.m.Column({
								width: "1em",
								header: new sap.m.Label({
									text: "ID"
								})
							}), new sap.m.Column({
								width: "1em",
								header: new sap.m.Label({
									text: "Company Id"
								})
							}), new sap.m.Column({
								width: "1em",
								header: new sap.m.Label({
									text: "First Name"
								})
							}), new sap.m.Column({
								width: "1em",
								header: new sap.m.Label({
									text: "Last Name"
								})
							})
						]
					});

					var template = new sap.m.ColumnListItem({
						id: "first_template",
						type: "Navigation",
						visible: true,
						selected: true,
						cells: [new sap.m.Label({
							text: "{testCompyList>Id}"
						}), new sap.m.Label({
							text: "{testCompyList>CompanyId}"
						}), new sap.m.Label({
							text: "{testCompyList>FirstName}"
						}), new sap.m.Label({
							text: "{testCompyList>LastName}"
						})]
					});

					oTable.bindItems("testCompyList>/Employees", template);
					container.addContent(oTable);

					var addButton = new sap.m.Button({
						text: "Add",
						visible: true,
						press: function() {
							parentCmp.onAddObjectivePressed();
						}
					});
					container.addContent(addButton);
					var getButton = new sap.m.Button({
						text: "Get Local Json",
						visible: true,
						press: function() {
							parentCmp.onGetObjectivePressed();
						}
					});
					container.addContent(getButton);

				},
				error: function() {
					alert('fail');
				}
			});

		}

	});

});