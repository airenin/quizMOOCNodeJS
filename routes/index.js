var express = require('express');
var router = express.Router();

var controller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
/* GEt qustion page */
router.get('/quizes/question', controller.question);
/* GET answer page */
router.get('/quizes/answer', controller.answer);

module.exports = router;
