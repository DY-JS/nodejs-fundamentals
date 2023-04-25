const path = require('path');
const fs = require('fs');

const pathToCart = '../data/cart.json';
const p = path.join(path.dirname(process.mainModule.filename), pathToCart);
//const p = path.join(__dirname, pathToCart);

class Cart {
  static async add(course) {
    const cart = await Cart.fetch();
    const idx = cart.courses.findIndex((c) => c.id === course.id);
    const candidate = cart.courses[idx];

    if (candidate) {
      //уже есть курс
      candidate.count++;
      cart.courses[idx] = candidate;
    } else {
      //нужно добавить курс
      course.count = 1;
      cart.courses.push(course);
    }

    cart.price += +course.price; //увеличили сумму в корзине(и привели к числу)

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'cart.json'),
        JSON.stringify(cart),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async fetch() {
    console.log(path.join(__dirname, '..', 'data', 'cart.json'));
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'cart.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Cart;
