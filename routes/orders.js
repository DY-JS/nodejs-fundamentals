const { Router } = require('express');
const Order = require('../models/order');
const router = Router();

router.get('/', async (req, res) => {
  try {
    //находим заказы по уловию(именно данного юзера)
    const orders = await Order.find({ 'user.userId': req.user._id }).populate(
      'user.userId'
    );
    res.render('orders', {
      isOrder: true,
      title: 'Orders',
      orders: orders.map((o) => {
        return {
          ...o._doc,
          price: o.courses.reduce((total, c) => {
            return (total += c.count * c.course.price);
          }, 0),
        };
      }),
    });
  } catch (e) {
    console.log(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const user = await req.user.populate('cart.items.courseId'); //получили юзера с нужными данными(все объекты курсов в корзине)

    const courses = user.cart.items.map((item) => ({
      count: item.count,
      course: { ...item.courseId._doc }, //item.courseId._doc - courseId без метаданных
    }));

    const order = new Order({
      user: {
        name: req.username,
        userId: req.user,
      },
      courses: courses,
    });

    await order.save(); //coхранили заказ
    await req.user.clearCart(); //очистили корзину

    res.redirect('/orders');
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
