jQuery.sap.declare("hcpsuccessfactors.util.httpRequest");
hcpsuccessfactors.util.httpRequest = {

	httpGetRequest: function(host, serviceUrl, path, datatype, param, data) {

		var result = null;
		var serviceHostUrl = serviceUrl;
		var relativeServiceUrl = path;
		var allServiceUrl = (function getServiceUrl(_serviceHostUrl, _relativeServiceUrl) {
			var sOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
			if (host == null) {
				return sOrigin + "/" + _serviceHostUrl + "/" + _relativeServiceUrl;
			} else {
				return host + "/" + _serviceHostUrl + "/" + _relativeServiceUrl;
			}
		})(serviceHostUrl, relativeServiceUrl);

		if (param) {
			allServiceUrl += param;
		}
		jQuery.ajax({
			url: allServiceUrl,
			async: false,
			type: 'GET',
			data: data,
			dataType: datatype,
			contentType: datatype === "json" ? "application/json" : "application/xml",
			success: function(rdata) {
				result = {
					success: true,
					data: rdata
				};
			},
			error: function(jqXHR, textStatus, errorThrown) {
				result = {
					success: false,
					data: textStatus + "\n" + errorThrown
				};

			}
		});
		return result;
	},

	httpPostRequest: function(host, path, datatype, param, data) {

		var result = null;
		var serviceHostUrl = host;
		var relativeServiceUrl = path;
		var allServiceUrl = (function getServiceUrl(_serviceHostUrl, _relativeServiceUrl) {
			var sOrigin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
			return sOrigin + '/' + _serviceHostUrl + '/' + _relativeServiceUrl;
		})(serviceHostUrl, relativeServiceUrl);

		if (param) {
			// allServiceUrl += "?redirect=" + param;
			allServiceUrl += param;
		}
		jQuery.ajax({
			url: allServiceUrl,
			async: false,
			type: 'POST',
			data: data,
			dataType: datatype,
			contentType: datatype === "json" ? "application/json" : "application/xml",
			success: function(rdata) {

				result = rdata;

			},
			error: function(jqXHR, textStatus, errorThrown) {
				result = "03-Save Failed" + textStatus + "\n" + errorThrown;
			}
		});
		return result;
	}
};