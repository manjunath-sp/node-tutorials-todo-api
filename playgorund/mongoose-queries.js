const { ObjectID } = require('mongodb');
/* eslint-disable no-unused-vars */
const { mongoose } = require('./../server/db/mongoose');
/* eslint-enable no-unused-vars */
const { Todo } = require('./../server/models/todo');

const { User } = require('./../server/models/user');

var id = '5afc9ad74c6601c2c1c1ddaf11';

if (!ObjectID.isValid(id)) {
    console.log('Id is not valid');
}

Todo
    .find({
        _id: id
    })
    .then((todos) => {
        console.log('Todos', todos);
    })
    .catch((e) => console.log('Error', e));

Todo
    .findOne({
        _id: id
    })
    .then((todo) => {
        console.log('Todo', todo);
    })
    .catch((e) => console.log('Error', e));

Todo
    .findById(id)
    .then((todo) => {
        console.log('Todo By Id', todo);
    })
    .catch((e) => console.log('Error', e));

const userId = '5af9f2d0d47e276e76351f7a';
if (!ObjectID.isValid(userId)) {
    console.log('userId is not valid');
} else {
    User
        .findById(userId)
        .then((user) => {
            if (user) {
                console.log('User found', user);
            } else {
                console.log('User not found');
            }
        })
        .catch((e) => console.error(`Error finding user by ID ${userId}`, e));
}