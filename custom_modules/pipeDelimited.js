// convert user data in pipe delimited data format
exports.getChangeInputData = function(originalReqData) {

	console.log("CHANGE INPUT DATA");
	var jsonObj = originalReqData;
	var pipeDelimitedValue = '';
	var index = 1;

	for (var key in jsonObj) {
		if (index == 1) {
			pipeDelimitedValue += jsonObj[key];
			index++;
		} else {
			pipeDelimitedValue += '|' + jsonObj[key];
		}
	}
	return {
		"userData" : pipeDelimitedValue,
		"processed" : 'N'
	};
};

