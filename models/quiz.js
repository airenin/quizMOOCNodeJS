module.exports = function(sequelize, DataTypes){
  return sequelize.define('Quiz',
    { pregunta:{
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo pregunta no puede ser vacío"}}
      },
      respuesta: {
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo respuesta no puede ser vacío"}}
      },
      tema:{
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo tema no puede ser vacío"}}
      }
    });
}
