
const express = require('express');
const app = express();
var nodemailer = require('nodemailer');
const router = require('./src/routes/routing');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
//Importing Loggers 
var requestLogger = require('./src/utilities/RequestLogger')
var errorLogger = require('./src/utilities/ErrorLogger')
var cors = require('cors')
const path = require('path');

app.use(cors()) // Use this after the variable declaration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(requestLogger)

app.use('/',router)
app.use(errorLogger);

// if (!module.parent) {
//     app.listen(2040);
// }

const PORT = process.env.PORT || 2040;


// app.listen(2040, function() {
//     console.log('Listening to port:  ' + 2040);
// });

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    });
}
app.listen(PORT, function() {
    console.log('Listening to port:  ' + PORT);
});

console.log("Server listening in port 2040");

module.exports = app;