var models = require('../models/models.js');

exports.new = function(req, res) {
  res.render('comments/new.ejs', {quizId: req.params.quizId, errors: []});
};

exports.create = function(req, res) {
  var comment = models.Comment.build({
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  });
  comment.validate().then(function(err) {
    if (err) {
      console.log(err.errors);
      res.render('comments/new.ejs', {comment: comment, quizId: req.params.quizId, errors: err.errors});
    } else {
      comment.save().then(function() {
        console.log("Pregunta creada");
        res.redirect('/quizes/' + req.params.quizId);
      });
    }
  }).catch(function(error) {
    next(error);
  });
};
