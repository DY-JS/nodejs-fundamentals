const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const app = express(); //это и есть сервер

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes); // c префиксом '/', но тогда в контроллере только '/'
app.use('/add', addRoutes); //c префиксом '/add', но тогда в контроллере только '/'
app.use('/courses', coursesRoutes); //c префиксом '/courses', но тогда в контроллере только '/'
app.use('/cart', cartRoutes);

// app.use(homeRoutes); //используем контроллер пути '/'
// app.use(addRoutes); //используем контроллер пути '/add'
// app.use(coursesRoutes); //используем контроллер пути '/courses'

const user = 'dimychyelovets';
const password = 'UU9LTuJoHfJkMuQ7';
const url =
  'mongodb+srv://dimychyelovets:UU9LTuJoHfJkMuQ7@cluster0.feitvkk.mongodb.net/shop';
// const url =
//   'mongodb+srv://dimychyelovets:UU9LTuJoHfJkMuQ7@cluster0.feitvkk.mongodb.net/shop';

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
