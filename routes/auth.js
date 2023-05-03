const { Router } = require('express');
const router = Router();

router.get('/login', async (req, res) => {
  res.render('/login', {
    title: 'Authentication',
    isLogin: true,
  });
});

router.post('/login', async (req, res) => {
  req.session.isAuthenticated = true; //установили в сессию своё свойство isAuthenticated
  res.redirect('/');
});

module.exports = router;
