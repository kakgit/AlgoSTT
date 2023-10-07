const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 3001;

//log requests
app.use(morgan('tiny'));

app.get('/', (req, res)=> {
    res.send("Hi this is test");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    //console.log("aaa " + process.env.PORT);
});