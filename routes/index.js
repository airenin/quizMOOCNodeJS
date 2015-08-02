var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Quiz', errors:[]});
});
/* Autoload */
router.param('quizId', quizController.load);
/* GET questions page */
router.get('/quizes', quizController.index);
/* GET question page */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET answer page */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/* GET author page */
router.get('/author', quizController.author);
/* GET new page */
router.get('/quizes/new', quizController.new);
/* POST create page */
router.post('/quizes/create', quizController.create);
/* GET edit page */
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);
/* PUT update page */
router.put('/quizes/:quizId(\\d+)', quizController.update);
module.exports = router;
