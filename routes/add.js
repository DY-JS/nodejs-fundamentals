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
  //const course = new Course(title, price, img);
  const course = new Course({
    title: title,
    price: price,
    img: img,
    //userId: req.user._id, //присвоили user._id из req
    userId: req.user, //идентична предидущей(mongoose одинаково обработает)
  });

  try {
    await course.save();
    res.redirect('/courses');
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
