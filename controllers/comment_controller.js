var models = require('../models/models.js');
exports.load = function(req, res, next, commentId) {
  models.Comment.find({
    where: {
      id: Number(commentId)
    }
  }).then(function(comment) {
    if(comment) {
      req.comment = comment;
      next();
    } else {
      next(new Error('No existe el commentId: ' + commentId))
    }
  }).catch(function(error) {
    next(error)
  });
};

exports.new = function(req, res) {
  console.log('Redirigimos a la pantalla de nuevo comentario ');
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

exports.publish = function(req, res) {
  console.log('Marcamos como publicado el comentario');
  req.comment.publicado = true;
  req.comment.save({
    fields: ['publicado']
  }).then(function() {
    console.log('Puesto que se ha actualizado correctamente redirigimos');
    res.redirect('/quizes/' + req.params.quizId);
  }).catch(function(error) {
    next(error);
  });
};
