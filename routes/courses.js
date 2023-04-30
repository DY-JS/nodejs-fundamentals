const { Router } = require('express');
const mongoose = require('mongoose');
const Course = require('../models/course');
const router = Router();

//router.get('/courses', (req, res) => {
//в index.js app.use('/courses', coursesRoutes) уже прописан путь /courses поэтому:
router.get('/', async (req, res) => {
  // const courses = await Course.getAll();
  //const courses = await Course.find(); // как getAll() c mongoose
  const courses = await Course.find()
    .populate('userId', 'email name') //populate - по userId покажет ещё и email и name user
    .select('price title img'); //select - выберет из сourse - price, title, img
  console.log(courses);
  res.render('courses', {
    title: 'Courses Page',
    isCourses: true,
    courses,
  }); //вернули courses.hbs
});

router.get('/:id', async (req, res) => {
  // const course = await Course.getById(req.params.id);
  console.log('ID', req.params.id);
  const course = await Course.findById(req.params.id); // c mongoose
  res.render('course', {
    layout: 'empty', //cделаем отдельный layout в layouts
    title: `Course ${course.title}`,
    course,
  });
});

router.post('/edit', async (req, res) => {
  //await Course.update(req.body);
  const { id } = req.body;
  delete req.body.id; //удалили потому что mongoose сам даёт id
  await Course.findByIdAndUpdate(id, req.body);
  res.redirect('/courses');
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }

  const course = await Course.findById(req.params.id);
  res.render('course-edit', {
    title: `Edit ${course.title}`,
    course,
  });
});

router.post('/remove', async (req, res) => {
  try {
    await Course.deleteOne({ _id: req.body.id });
    res.redirect('/courses');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
