jQuery.sap.declare("hcpsuccessfactors.util.format");
hcpsuccessfactors.util.format = {
	formatDate: function(sValue) {
		//return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/," ");  
		if (sValue) {
			var sSubValue = sValue.substring(0,sValue.indexOf("T"));
			var lSubValue = sValue.substring((sValue.indexOf("T")+1), sValue.lastIndexOf("."));
			var middle = lSubValue.substring(0, lSubValue.indexOf(":"));
			var DateTime;
			if (parseInt(middle) > 12 && parseInt(middle) <=24){
				DateTime = sSubValue + ", " + lSubValue + " PM";
			}
			else {
				DateTime = sSubValue + ", " + lSubValue + " AM";
			}
			return DateTime;
		}
	},
	formatFormDate: function(sValue) { 
		if (sValue !== null) {
		    var sSubValue =sValue.replace("/Date(","").replace(")/","");
		    var dateTime = new Date(parseInt(sSubValue)).toLocaleString().replace(/:\d{1,2}$/," ");
		    var result = dateTime.substring(0,dateTime.indexOf(","));
		    return result;
		}
	},
	formatDone: function(Value) {
		return parseInt(Value);
	},
	formatStatus: function(Value) {
		var sValue;
		if (Value !== null) {
			switch (Value){
				case "white" :
					sValue = "Not Started";
					break;
				case "yellow" :
					sValue = "On Track";
					break;
				case "red" :
					sValue = "Behind";
					break;
				case "green" :
					sValue = "Completed";
					break;
				case "purple" :
					sValue = "Postponed";
					break;
				case "blue" :
					sValue = "Cancelled";
					break;
			}
		}
		return sValue;
	},
	formatCreatewarning: function(Value) {
		if (Value !== null){
			var sValue = "▲ Alert-Created by ";
			sValue += Value;
			return sValue;
		}
	},
	
	formatModifywarning: function(Value) {
		if (Value !== null){
			var sValue = "▲ Alert-Last modified by ";
			sValue += Value;
			return sValue;
		}
	}
	
//	formatBackground: function(Value) {
		
//	}
};