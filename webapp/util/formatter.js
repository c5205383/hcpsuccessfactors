jQuery.sap.declare("hcpsuccessfactors.util.formatter");
hcpsuccessfactors.util.formatter = {
	formatDate : function(sValue) {
		// return new Date(parseInt(nS) *
		// 1000).toLocaleString().replace(/:\d{1,2}$/," ");
		if (sValue !== null) {
			var sSubValue = sValue.substring(0, sValue.indexOf("T"));
			var lSubValue = sValue.substring((sValue.indexOf("T") + 1), sValue.lastIndexOf("."));
			var middle = lSubValue.substring(0, lSubValue.indexOf(":"));
			var DateTime;
			if (parseInt(middle) > 12 && parseInt(middle) <= 24) {
				DateTime = sSubValue + ", " + lSubValue + " PM";
			} else {
				DateTime = sSubValue + ", " + lSubValue + " AM";
			}
			return DateTime;
		}
	},
	formatFormDate : function(sValue) {
		if (sValue !== null) {
			var sSubValue = sValue.replace("/Date(", "").replace(")/", "");
			var dateTime = new Date(parseInt(sSubValue)).toLocaleString().replace(/:\d{1,2}$/, " ");
			var result = dateTime.substring(0, dateTime.indexOf(","));
			return result;
		}
	},
	formatDone : function(Value) {
		return parseInt(Value);
	},
	formatStatus : function(Value) {
		var sValue;
		if (Value !== null) {
			switch (Value) {
			case "white":
				sValue = "Not Started";
				break;
			case "yellow":
				sValue = "On Track";
				break;
			case "red":
				sValue = "Behind";
				break;
			case "green":
				sValue = "Completed";
				break;
			case "purple":
				sValue = "Postponed";
				break;
			case "blue":
				sValue = "Cancelled";
				break;
			default:
			    sValue = Value;
			    break;
			}
		}
		return sValue;
	},
	formatCreatewarning : function(Value) {
		if (Value !== null) {
			var sValue = "▲ Alert-Created by ";
			sValue += Value;
			return sValue;
		}
	},

	formatModifywarning : function(Value) {
		if (Value !== null) {
			var sValue = "Alert-Last modified by ";
			sValue += Value;
			return sValue;
		}
	},

	// 对Date的扩展，将 Date 转化为指定格式的String
	// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
	// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
	// (new Date()).Format(date, "yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
	// (new Date()).Format(date, "yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
/*	formatDate : function(date, fmt) { // author: meizz
		var o = {
			"M+" : date.getMonth() + 1, // 月份
			"d+" : date.getDate(), // 日
			"h+" : date.getHours(), // 小时
			"m+" : date.getMinutes(), // 分
			"s+" : date.getSeconds(), // 秒
			"q+" : Math.floor((date.getMonth() + 3) / 3), // 季度
			"S" : date.getMilliseconds()
		// 毫秒
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		for ( var k in o)
			if (new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}*/
	
	formatBtnStatus : function (bValue) {
		if (bValue === true) {
			return "sap-icon://stop";
		} else if (bValue === false) {
			return "sap-icon://begin";
		}
	}
	
	
};