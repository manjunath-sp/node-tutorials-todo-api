const { MongoClient, ObjectID } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) {
        console.error('Unable to connect to MongoDB', err);
    }
    console.log('Connected to MongoDB server:', mongodbUrl);
    const db = client.db('TodoApp');


    db.collection('Todos')
        .find({ _id: new ObjectID('5af0be43dfe63b20ee467df2') })
        .toArray().then((docs) => {
            console.log('Todos form db');
            docs.forEach(doc => console.log(JSON.stringify(doc, undefined, 2)));
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    db.collection('Todos')
        .find()
        .count()
        .then((count) => {
            console.log('Todos count', count);
        }, (err) => {
            console.log('Unable to fetch todos', err);
        });

    db.collection('Users')
        .find({ name: 'Spartan' })
        .toArray()
        .then((docs) => {
            docs.forEach(doc => console.log(JSON.stringify(doc, undefined, 2)));
        })
        .catch((err) => {
            console.log('Unable to fetch users', err);
        });
    client.close();
});