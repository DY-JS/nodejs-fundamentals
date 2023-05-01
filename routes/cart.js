const { Router } = require('express');
// const Cart = require('../models/cart');
const Course = require('../models/course');
const router = Router();

function mapCartItems(cart) {
  console.log(cart);
  return cart.items.map((c) => ({
    ...c.courseId._doc,
    count: c.count, //c.courseId._doc - cвойство courseId без ненужных метаданных
  }));
}

function computedPrice(courses) {
  return courses.reduce((total, course) => {
    return (total += course.price * course.count);
  }, 0);
}

//Add new course to cart
router.post('/add', async (req, res) => {
  const course = await Course.findById(req.body.id);
  await req.user.addToCart(course); //req.user - получили пользователя с его корзиной и добавили туда course
  res.redirect('/cart');
});

//Render cart Page
router.get('/', async (req, res) => {
  //const cart = await Cart.fetch();
  const user = await req.user //получили юзера
    .populate('cart.items.courseId'); //для получения нужных данных из courseId
  //.execPopulate(); // execPopulate() - чтобы выполнился запрос - лишний(даёт ошибку)
  const courses = mapCartItems(user.cart);

  res.render('cart', {
    title: 'Cart',
    isCart: true,
    courses: courses,
    price: computedPrice(courses),
  });
});

//Delete course from cart
router.delete('/remove:id', async (req, res) => {
  //const cart = await Cart.remove(req.params.id);
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate('cart.items.courseId');
  const courses = mapCartItems(user.cart);
  const cart = {
    courses,
    prise: computedPrice(courses),
  };
  res.status(200).json(cart);
});

module.exports = router;
