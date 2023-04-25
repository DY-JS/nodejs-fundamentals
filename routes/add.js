const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

//router.get('/add', (req, res) => { //в index.js app.use('/add', addRoutes) поэтому:
router.get('/', (req, res) => {
  res.render('add', {
    title: 'Add Page',
    isAdd: true,
  });
});

router.post('/', async (req, res) => {
  const { title, price, img } = req.body;
  const course = new Course(title, price, img);
  await course.save();
  res.redirect('/courses');
});
module.exports = router;
