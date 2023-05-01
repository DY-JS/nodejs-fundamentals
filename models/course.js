const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  //описываем схему модели
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img: String,
  userId: {
    //cвязали с моделью User
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

//c БД приходит course._id, поэтому мы делаем метод чтобы это св-во трансформировать
//в новое course.id и удалить course._id
courseSchema.method('toClient', function () {
  const course = this.toObject();

  course.id = course._id;
  delete course.id;

  return course;
});

module.exports = model('Course', courseSchema);
//экспортируем из ф-ции model схему course
//поле id mongoose добавляет автоматически

// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs');
// const path = require('path');

// class Course {
//   constructor(title, price, img) {
//     this.title = title;
//     this.price = price;
//     this.img = img;
//     this.id = uuidv4();
//   }

//   toJSON() {
//     return {
//       title: this.title,
//       price: this.price,
//       img: this.img,
//       id: this.id,
//     };
//     // return JSON.stringify({
//     //   title: this.title,
//     //   price: this.price,
//     //   img: this.img,
//     //   id: this.id,
//     // });
//   }

//   async save() {
//     const courses = await Course.getAll();
//     courses.push(this.toJSON());

//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'courses.json'),
//         JSON.stringify(courses),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

//   static async update(course) {
//     const courses = await Course.getAll();
//     const idx = courses.findIndex((c) => c.id === course.id);
//     courses[idx] = course;
//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'courses.json'),
//         JSON.stringify(courses),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

//   static async getById(id) {
//     const courses = await Course.getAll();
//     return courses.find((course) => course.id === id);
//   }

//   static getAll() {
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         path.join(__dirname, '..', 'data', 'courses.json'),
//         'utf-8',
//         (err, content) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(JSON.parse(content));
//           }
//         }
//       );
//     });
//   }
// }

// module.exports = Course;
