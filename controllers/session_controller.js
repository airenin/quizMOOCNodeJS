exports.loginRequired = function(req, res, next) {
  if (req.session.user) {
    console.log('Usuario activo. Continuamos normalmente');
    next();
  } else {
    console.log('Usuario inactivo. Redirigimos a /login');
    res.redirect('/login');
  }
}

exports.new = function(req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user) {
    if (error) {
      req.session.errors = [{"message": "Se ha producido un error: " + error}];
      res.redirect("/login");
      return;
    }
    // Save fields id and username
    // Session is definednby req.session.user
    req.session.user = {id: user.id, username: user.username};
    // Redirect to login's previous path
    res.redirect(req.session.redir.toString());
  });
};

exports.destroy = function(req, res) {
  delete req.session.user;
  // Redirect to login's previous path
  res.redirect(req.session.redir.toString());
};
