var fs = require('fs');
exports.startSchedularToGetData = function(db){
	console.log("schedular start ");
	var timer = 20*1000;
	setInterval(function(){
		exports.fetchDataFromDB(db);
	},timer);

};

exports.fetchDataFromDB = function(db) {
	var userListData = '';
	console.log("Fetch data request");
	db.collection('userlist').find({processed : 'N'}).toArray(function(err, items) {
		if (items.length > 0) {
			for (var itemIndex = 0; itemIndex < items.length; itemIndex++) {
				userListData += items[itemIndex].userData + '\n';
			}

			fs.stat('message.txt', function(err, stat) {
				if (err == null) {
					console.log('File exists');
					fs.appendFile('message.txt', userListData, function(err) {
						if (err)
							throw err;
					});
					exports.updateProcessedData(db);
				} else if (err.code == 'ENOENT') {
					console.log('created new file and inserted data');
					fs.writeFile('message.txt', userListData, function(err) {
						if (err)
							throw err;
					});
					exports.updateProcessedData(db);
				} else {
					console.log('Some other error: ', err.code);
				}
			});
		}
	});
};

exports.updateProcessedData = function(db) {
	db.collection('userlist').update({
		processed : 'N'
	}, {
		$set : {
			processed : 'Y'
		}
	}, {
		multi : true
	},function(err){
		if(err)
			{
			console.log("Userdata not marked as processed");
			throw err;
			}
		});
		console.log("data processed");

};
