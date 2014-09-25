var express = require('express');
var router = express.Router();
var pipeDelimited = require('../custom_modules/pipeDelimited');

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var insertData = pipeDelimited.getChangeInputData(req.body);
    db.collection('userlist').insert(insertData, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;
