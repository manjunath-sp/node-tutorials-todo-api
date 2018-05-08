// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) {
        console.error('Unable to connect to MongoDB', err);
    }
    console.log('Connected to MongoDB server:', mongodbUrl);

    const db = client.db('TodoApp');


    client.close();
});