jQuery.sap.declare("hcpsuccessfactors.util.format");
hcpsuccessfactors.util.format = {
	formatDate: function(sValue) {
		//return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/," ");  
		if (sValue !== null) {
			var sSubValue = sValue.replace(/[^0-9]*/g,"")
			return new Date(parseInt(sSubValue)).toLocaleString();
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