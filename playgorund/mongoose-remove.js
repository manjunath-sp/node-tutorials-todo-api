/* eslint-disable no-unused-vars */
const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
/* eslint-enable no-unused-vars */

// var id = '5afc9ad74c6601c2c1c1ddaf11';

// if (!ObjectID.isValid(id)) {
//     console.log('Id is not valid');
// }

// Todo
//     .remove({})
//     .then(result => console.log(result))
//     .catch((error) => console.error(error));

Todo
    .findByIdAndRemove('5b05cfccb7cf64b3bdead2c6')
    .then(result => console.log(result))
    .catch((error) => console.error(error));