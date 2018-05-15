var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

//Inistialise the app
var app = express();

//the middleware
app.use(bodyParser.json());

//POST /todos
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo
        .save()
        .then((doc) => {
            res.send(doc);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});


app.listen(3000, () => {
    console.log('Started app on port 3000');
});

module.exports = { app };