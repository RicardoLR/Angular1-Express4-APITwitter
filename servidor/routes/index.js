var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Ejemplo con AngularJS, Node y API de Twitter' });
});

module.exports = router;
