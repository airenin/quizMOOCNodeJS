var path = require('path');

// Adaptación a Heroku y postgresql
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');

var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect: protocol,
    protocol: protocol,
    port: port,
    host: host,
    storage: storage,
    omitNull: true
  });

// Importamos la definición de la tabla Quiz del archivo quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);
// Importamos la definición de la tabla Quiz del archivo quiz.js
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);
// Fijamos las relaciones entre tablas
// esto añadirá automáticamente una nueva colummna QuizId a Comment
Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);
// Exportamos la definición de la tabla Quiz
exports.Quiz = Quiz;
// Exportamos la definición de la tabla Quiz
exports.Comment = Comment;

// Si logramos sincronizar con la base de datos
// Crea automáticamente el fichero quiz.sqlite
sequelize.sync().then(function() {
  console.log('Sincronizado con base de datos');
  // Si funcina bien la función de contar filas
  Quiz.count().then(function(count) {
    // Si no hay elementos
    if (count === 0) {
      console.log('Base de datos vacia');
      // Creamos un registro con la pregunta con la Capital de Italia
      Quiz.create({pregunta: "Capital de Italia", respuesta: "Roma", tema: "humanidades"});
      Quiz.create({pregunta: "Capital de Portugal", respuesta: "Lisboa", tema: "humanidades"})
      // En caso de que funcione correctamente imprimimos un mensaje por consola
      .then(function() {
        console.log('Base de datos inicializadada');
      });
    }
  });
});
