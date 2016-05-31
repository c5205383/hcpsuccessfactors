jQuery.sap.declare("hcpsuccessfactors.util.StringUtil");
hcpsuccessfactors.util.StringUtil = {
	
	/**
	* @function
	* @name _showBusyIndicator
	* @description show busy indicator of whole view or not
	* @param {String} string to be handle
	* @return {String} the last word of the string
	*/
    subLastWord: function(sStr){
        var array = sStr.split("/");
        return array[array.length-1];
    }
};