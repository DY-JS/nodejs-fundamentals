module.exports = function (req, res, next) {
  res.locals.isAuth = req.session.isAuthenticated;
  next(); //next - для выполнения цепочки
};
//записали значение из сессии в поле isAuth в res.locals, чтобы это зн-е
//отдавалось каждый раз при ответе
