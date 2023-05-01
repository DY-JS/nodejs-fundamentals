// const path = require('path');
// const fs = require('fs');

// const pathToCart = '../data/cart.json';
// const p = path.join(path.dirname(process.mainModule.filename), pathToCart);
// //const p = path.join(__dirname, pathToCart);

// class Cart {
//   static async add(course) {
//     const cart = await Cart.fetch();
//     const idx = cart.courses.findIndex((c) => c.id === course.id);
//     const candidate = cart.courses[idx];

//     if (candidate) {
//       //если уже есть курс
//       candidate.count++;
//       cart.courses[idx] = candidate;
//     } else {
//       //если в корзине ещё нет - нужно добавить курс
//       course.count = 1;
//       cart.courses.push(course);
//     }

//     cart.price += +course.price; //увеличили сумму в корзине(и привели к числу)

//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'cart.json'),
//         JSON.stringify(cart),
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

//   static async remove(id) {
//     const cart = await Cart.fetch();

//     const idx = cart.courses.findIndex((c) => c.id === id);
//     const course = cart.courses[idx];

//     if (course.count === 1) {
//       //удаление
//       cart.courses = cart.courses.filter((c) => c.id !== id);
//     } else {
//       cart.courses[idx].count--;
//     }
//     cart.price -= course.price; //уменьшаем цену

//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, '..', 'data', 'cart.json'),
//         JSON.stringify(cart),
//         (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(cart);
//           }
//         }
//       );
//     });
//   }

//   static async fetch() {
//     console.log(path.join(__dirname, '..', 'data', 'cart.json'));
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         path.join(__dirname, '..', 'data', 'cart.json'),
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

// module.exports = Cart;
