require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const vPort = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//static folder files
app.use(express.static('public'));

//Setup Templating Engine
app.use(expressLayout);
app.set('layout', "./layouts/main");
app.set('view engine', 'ejs');


//Home Page
app.get('/', (req, res) => {
    res.send('Test Page');
});

app.listen(vPort, () => {
    console.log(`App Running on Port ${vPort}`);
});