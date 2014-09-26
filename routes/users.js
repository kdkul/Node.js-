var express = require('express');
var router = express.Router();
var pipeDelimited = require('../custom_modules/pipeDelimited');

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db; 
	console.log("ADD USER");
    var pipeDelimitedValue = pipeDelimited.getChangeInputData(req.body);
	console.log(pipeDelimitedValue.userData);
    db.collection('userlist').insert(pipeDelimitedValue , function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
