var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('', { title: 'ADD USER PAGE' });
});

module.exports = router;
