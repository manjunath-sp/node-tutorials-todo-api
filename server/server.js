const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

//Inistialise the app
const app = express();

const port = process.env.PORT || 3000;

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

//GET /todos
app.get('/todos', (req, res) => {
    Todo
        .find()
        .then((todos) => {
            res.send({
                todos
            })
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;

    if (!ObjectID.isValid(todoId)) {
        console.log('todoId is not valid');
        res.status(400).send({ error: 'todoId is not valid' });
    } else {
        Todo
            .findById(todoId)
            .then((todo) => {
                if (!todo) {
                    console.log('Todo not found', todo);
                    res
                        .status(404)
                        .send({ error: 'todoId not found' });
                } else {
                    res
                        .status(200)
                        .send({ todo })
                }
            })
            .catch((e) => {
                console.error(`Error finding todo by ID {todoId}`, e);
                res.status(500).send({ error: 'internal server error' });
            });
    }
});


app.listen(port, () => {
    console.log(`Started app on port ${port}`);
});

module.exports = { app };