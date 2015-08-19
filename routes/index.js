var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {title: 'Quiz', errors:[]});
});
/* Autoload */
router.param('quizId', quizController.load);
router.param('quizId', commentController.load);

// Routes for session
/* GET login form*/
router.get('/login', sessionController.new);
/* POST create session*/
router.post('/login', sessionController.create);
/* GET logout form to destroy session */
router.get('/logout', sessionController.destroy);
// Routes for quizes
/* GET questions page */
router.get('/quizes', quizController.index);
/* GET question page */
router.get('/quizes/:quizId(\\d+)', quizController.show);
/* GET answer page */
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
/* GET author page */
router.get('/author', quizController.author);
/* GET new page */
router.get('/quizes/new', sessionController.loginRequired, quizController.new);
/* POST create page */
router.post('/quizes/create', sessionController.loginRequired, quizController.create);
/* GET edit page */
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,  quizController.edit);
/* PUT update page */
router.put('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.update);
/* DELETE destroy page */
router.delete('/quizes/:quizId(\\d+)', sessionController.loginRequired, quizController.destroy);
// Routes
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);
module.exports = router;
