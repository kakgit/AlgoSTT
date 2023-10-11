require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');

const connectDB = require('./server/config/db');

const app = express();
const vPort = process.env.PORT || 5000;

//connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//static folder files
app.use(express.static('public'));

//Setup Templating Engine
app.use(expressLayout);
app.set('layout', "./layouts/main");
app.set('view engine', 'ejs');


//Home Page
// app.get('/', (req, res) => {
//     const locals = {
//         title: 'AlgoSTT',
//         description: "Algo Trading App with Nodejs EJS Express"
//     };

//     res.render('index.ejs', { locals });
// });

//instead of the above code use the server/routes/ followed by pages names

//routes
app.use('/', require('./server/routes/home.js'));

app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(vPort, () => {
    console.log(`App Running on Port http://localhost:${vPort}`);
});