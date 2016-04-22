jQuery.sap.declare("hcpsuccessfactors.util.StringUtil");
hcpsuccessfactors.util.StringUtil = {
    subLastWord: function(str){
        var array = str.split("/");
        return array[array.length-1];
    }
};