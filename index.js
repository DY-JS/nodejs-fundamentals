const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');
const app = express(); //это и есть сервер

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use('/', homeRoutes); // c префиксом '/', но тогда в контроллере только '/'
app.use('/add', addRoutes); //c префиксом '/add', но тогда в контроллере только '/'
app.use('/courses', coursesRoutes); //c префиксом '/courses', но тогда в контроллере только '/'
app.use('/cart', cartRoutes);
// app.use(express.static('public'));
// app.use(homeRoutes); //используем контроллер пути '/'
// app.use(addRoutes); //используем контроллер пути '/add'
// app.use(coursesRoutes); //используем контроллер пути '/courses'

////////////////////////////////////////
// Все контроллеры перенесли в папку routes
// app.get('/', (req, res) => {
//   //res.status(200) //по умолчанию
//   //res.sendFile(path.join(__dirname, 'views', 'index.html'))
//   res.render('index', {
//     title: 'Main Page',
//     isHome: true,
//   }); //вернули index.hbs
// });

// app.get('/about', (req, res) => {
//   //res.sendFile(path.join(__dirname, 'views', 'about.html')) //так отдаём файл без .hbs

//   res.render('about', {
//     title: 'About Page',
//     isAbout: true,
//   }); //вернули about.hbs
// });

// app.get('/add', (req, res) => {
//   res.render('add', {
//     title: 'Add Page',
//     isAdd: true,
//   });
// });

// app.get('/courses', (req, res) => {
//   res.render('courses', {
//     title: 'Courses Page',
//     isCourses: true,
//   }); //вернули courses.hbs
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
