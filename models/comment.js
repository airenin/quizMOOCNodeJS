module.exports = function(sequelize, DataTypes){
  return sequelize.define('Comment',
    { texto:{
        type: DataTypes.STRING,
        validate: {notEmpty: {msg: "El campo comentario no puede ser vacío"}}
      },
      publicado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });
}
