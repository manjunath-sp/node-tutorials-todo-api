const { MongoClient, ObjectID } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) {
        console.error('Unable to connect to MongoDB', err);
    }
    console.log('Connected to MongoDB server:', mongodbUrl);

    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Do something',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.error('Unable to insert todo', err);
    //     }

    //     console.log(JSON.stringify(result.ops));
    // })

    // db.collection('Users').insertOne({
    //     name: 'Spartan',
    //     age: 20,
    //     location: 'Earth'
    // }, (err, result) => {
    //     if (err) {
    //         return console.error('Unable to insert todo', err);
    //     }
    //     console.log(JSON.stringify(result.ops));
    // });

    client.close();
});