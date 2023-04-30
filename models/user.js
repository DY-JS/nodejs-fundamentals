const { Schema, model } = require('mongoose');

const user = new Schema({
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

module.exports = model('User', user);
