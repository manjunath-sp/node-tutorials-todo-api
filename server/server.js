require('./config/config.js');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

/* eslint-disable no-unused-vars */
const { mongoose } = require('./db/mongoose');
/* eslint-enable no-unused-vars */

const { Todo } = require('./models/todo');
// const { User } = require('./models/user');



//Inistialise the app
const app = express();

const port = process.env.PORT;

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
            });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

//GET /todos/:id
app.get('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log(`id is not valid id: ${id}`);
        return res.status(400).send({ error: `id is not valid id: ${id}` });
    }

    Todo
        .findById(id)
        .then((todo) => {
            if (!todo) {
                console.log(`Todo with id : ${id} is not found`);
                res
                    .status(404)
                    .send({ error: `Todo with id : ${id} is not found` });
            } else {
                res
                    .status(200)
                    .send({ todo });
            }
        })
        .catch((e) => {
            console.error(`Error findById ${id}`, e);
            res.status(500).send({ error: `Error findById ${id}` });
        });
});

//DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    let id = req.params.id;

    if (!ObjectID.isValid(id)) {
        console.log('id is not Valid');
        return res.status(400).send({ error: 'id is not Valid' });
    }
    Todo
        .findByIdAndRemove(id)
        .then((todo) => {
            if (!todo) {
                console.log(`Todo with id : ${id} is not found`);
                return res
                    .status(404)
                    .send({ error: `Todo with id : ${id} is not found` });
            } else {
                return res
                    .status(200)
                    .send({ todo });
            }
        })
        .catch((e) => {
            console.error(`Error findByIdAndRemove ${id}`, e);
            res.status(500).send({ error: `Error findByIdAndRemove ${id}` });
        });

});


//PATCH /todo:id
app.patch('/todos/:id', (req, res) => {
    let id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        console.log(`id is not valid id: ${id}`);
        return res.status(400).send({ error: `id is not valid id: ${id}` });
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo
        .findByIdAndUpdate(id, { $set: body }, { new: true })
        .then((todo) => {
            if (!todo) {
                console.log(`Todo with id : ${id} is not found`);
                res
                    .status(404)
                    .send({ error: `Todo with id : ${id} is not found` });
            } else {
                res
                    .status(200)
                    .send({ todo });
            }
        })
        .catch((e) => {
            console.error(`Error findByIdAndUpdate ${id}`, e);
            res.status(500).send({ error: `Error findByIdAndUpdate ${id}` });
        });
});


app.listen(port, () => {
    console.log(`Started app on port ${port}`);
});

module.exports = { app };