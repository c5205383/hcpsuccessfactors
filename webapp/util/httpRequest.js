jQuery.sap.declare("hcpsuccessfactors.util.httpRequest");
hcpsuccessfactors.util.httpRequest = {

	httpGetRequest : function(host, url, data, async, onSuccess, onError) {

		var result = null;
		var datatype = "json";
		var relativeServiceUrl = url;
		var allServiceUrl = (function getServiceUrl(_relativeServiceUrl) {
			var sOrigin = window.location.protocol + "//" + window.location.hostname
					+ (window.location.port ? ":" + window.location.port : "");
			if (host == null) {
				return sOrigin + "/" + _relativeServiceUrl;
			} else {
				return host + "/" + _relativeServiceUrl;
			}
		})(relativeServiceUrl);
		jQuery.ajax({
			url : allServiceUrl,
			async : async,
			type : 'GET',
			data : data,
			dataType : datatype,
			contentType : datatype === "json" ? "application/json" : "application/xml",
			success : function(rdata) {
				result = {
					success : true,
					data : rdata
				};
				if (typeof onSuccess === 'function') {
					onSuccess(result);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				result = {
					success : false,
					data : textStatus + "\n" + errorThrown
				};
				if (typeof onSuccess === 'function') {
					onError(result);
				}
			}
		});
		return result;
	},

	httpPostRequest : function(host, url, data, async, onSuccess, onError) {

		var result = null;
		var datatype = "json";
		var relativeServiceUrl = url;
		var allServiceUrl = (function getServiceUrl(_relativeServiceUrl) {
			var sOrigin = window.location.protocol + "//" + window.location.hostname
					+ (window.location.port ? ":" + window.location.port : "");
			if (host == null) {
				return sOrigin + "/" + _relativeServiceUrl;
			} else {
				return host + "/" + _relativeServiceUrl;
			}
		})(relativeServiceUrl);

		jQuery.ajax({
			url : allServiceUrl,
			async : async,
			type : 'POST',
			data : data,
			dataType : datatype,
			contentType : datatype === "json" ? "application/json" : "application/xml",
			success : function(rdata) {
				result = {
					success : true,
					data : rdata
				};
				if (typeof onSuccess === 'function') {
					onSuccess(result);
				}
			},
			error : function(jqXHR, textStatus, errorThrown) {
				result = {
					success : false,
					data : textStatus + "\n" + errorThrown
				};
				if (typeof onSuccess === 'function') {
					onError(result);
				}
			}
		});
		return result;
	}
};