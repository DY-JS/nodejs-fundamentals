const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  res.render('index', {
    title: 'Home Page',
    isHome: true,
  });
});

module.exports = router;
