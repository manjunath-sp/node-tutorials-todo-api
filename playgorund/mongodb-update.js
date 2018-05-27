const { MongoClient, ObjectID } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) {
        console.error('Unable to connect to MongoDB', err);
    }
    console.log('Connected to MongoDB server:', mongodbUrl);
    const db = client.db('TodoApp');

    db.collection('Users')
        .findOneAndUpdate(
            { _id: new ObjectID('5af20e665b2cd78caf7e67dc') },
            { $set: { age: 18 } }, { upsert: true, returnNewDocument: true })
        .then((res) => {
            console.log('Updated item with ObjectID("5af20e665b2cd78caf7e67dc")', res);
        })
        .catch((err) => {
            console.log(err);
        });
    //client.close();
});