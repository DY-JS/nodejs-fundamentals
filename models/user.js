const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        courseId: {
          //cвязали с моделью Course
          type: Schema.Types.ObjectId, //id для mongoose
          ref: 'Course', //как в model для модели Course
          required: true,
        },
      },
    ],
  },
});

userSchema.methods.addToCart = function (course) {
  //метод добавления в корзину
  const items = [...this.cart.items];
  const idx = items.findIndex((c) => {
    return c.courseId.toString() === course._id.toString();
  });

  if (idx >= 0) {
    items[idx].count = items[idx].count + 1;
  } else {
    items.push({
      courseId: course._id,
      count: 1,
    });
    console.log(items);
  }
  // const newCart = { items: items };
  // this.cart = newCart;
  this.cart = { items: items };
  return this.save();
};

userSchema.methods.removeFromCart = function () {};

module.exports = model('User', userSchema);
