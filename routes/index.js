var express = require('express');
var router = express.Router();

var controller = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});
/* Autoload */
router.param('quizId', controller.load);
/* GET questions page */
router.get('/quizes', controller.index);
/* GET question page */
router.get('/quizes/:quizId(\\d+)', controller.show);
/* GET answer page */
router.get('/quizes/:quizId(\\d+)/answer', controller.answer);
/* GET author page */
router.get('/author', controller.author);
/* GET new page */
router.get('/quizes/new', controller.new);
/* POST create page */
router.post('/quizes/create', controller.create);
module.exports = router;
