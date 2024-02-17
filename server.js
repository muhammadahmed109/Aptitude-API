const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://thiru:jjhtrF0HFn55rhrI@firstproject.27hr6ge.mongodb.net/questions'

const aptQuestion = require("./routes/routes")

const app = express();

const port = 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.static(__dirname + '/public'));
app.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/view/index.html"))
})
app.use("/", aptQuestion);

app.use((error, req, res, next) => {
    const message = error.message;
    const statusCode = error.statusCode;
    if(error.field){
        return res.json({message : message, statusCode : statusCode, field : error.field});
    }
    return res.json({message : message, statusCode : statusCode});
});

mongoose
    .connect(MONGODB_URI)
    .then(result => {
        app.listen(port, () => `Server running on port ${port}` )
    })
    .catch(err => {
        console.log(err);
    });
