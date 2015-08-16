var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
    where: {id: Number(quizId)},
    include: [{model: models.Comment}]
  }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else {
        next(new Error('No existe quizId=' + quizId));
      }
    }).catch(function(error) {
    next(error);
  });
};

exports.index = function(req, res) {
  var where = {};
  if (!!req.query.search) {
    var search = '%' + req.query.search + '%';
    search = search.replace(/ /g, '%');
    where = {where: ["pregunta like ?", search]};
  }
  models.Quiz.findAll(where).then(function(quizes) {
    res.render('quizes/index.ejs', {quizes: quizes, errors: []});
  }).catch(function(error){
    next(error)
  });
};

exports.show = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz) {
    res.render('quizes/show', {quiz: req.quiz, errors: []});
  });
};

exports.answer = function(req, res) {
  models.Quiz.find(req.params.quizId).then(function(quiz){
    var resultado = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta) {
      resultado = 'Correcto';
    }
    res.render('quizes/answer', {
      quiz: req.quiz,
      respuesta: resultado,
      errors: []});
  });
};

exports.new = function(req, res) {
  var quiz = models.Quiz.build({
    pregunta: "Pregunta", respuesta: "Respuesta", tema: "otro"
  });
  res.render('quizes/new', {quiz: quiz, errors: []});
};

exports.create = function(req, res) {
  var quiz = models.Quiz.build(req.body.quiz);
  quiz.validate().then(function(err) {
    if (err) {
      console.log(err.errors);
      res.render('quizes/new', {quiz: quiz, errors: err.errors});
    } else {
      quiz.save({
        fields: ["pregunta", "respuesta", "tema"]
      }).then(function() {
        console.log("Pregunta creada");
        res.redirect('/quizes');
      });
    }
  });
};

exports.edit = function(req, res) {
  var quiz = req.quiz; // autoload de quiz
  res.render('quizes/edit', {quiz: quiz, errors: []});
};
// PUT /quizes/:id
exports.update = function(req, res) {
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate().then(function(err) {
    if (err) {
      console.log(err.errors);
      res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
    } else {
      req.quiz.save({
        fields: ["pregunta", "respuesta", "tema"]
      }).then(function() {
        console.log("Pregunta actualizada");
        res.redirect('/quizes');
      });
    }
  });
};

// DELETE /quizes/:id
exports.destroy = function(req, res) {
  req.quiz.destroy().then(function() {
    console.log("Pregunta borrada");
    res.redirect('/quizes');
  }).catch(function(error){next(error)});
};

exports.author = function(req, res) {
  res.render('author', {errors: []});
};
