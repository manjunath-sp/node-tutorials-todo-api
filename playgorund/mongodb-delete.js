const { MongoClient, ObjectID } = require('mongodb');

const mongodbUrl = 'mongodb://localhost:27017/TodoApp';

MongoClient.connect(mongodbUrl, (err, client) => {
    if (err) {
        console.error('Unable to connect to MongoDB', err);
    }
    console.log('Connected to MongoDB server:', mongodbUrl);
    const db = client.db('TodoApp');

    //delete many
    // db.collection('Todos')
    //     .deleteMany({ text: 'Do the laundry' })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.error('Error while deleteing items', err);
    //     });

    //delete one
    // db.collection('Todos')
    //     .deleteOne({ text: 'Walk the dog' })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    //find and delete
    // db.collection('Todos')
    //     .findOneAndDelete({ completed: false })
    //     .then((res) => {
    //         console.log(res);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    db.collection('Users')
        .deleteMany({ name: 'Batman' })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error('Error while deleteing users', err);
        });

    db.collection('Users')
        .findOneAndDelete({ _id: new ObjectID("5af20e665b2cd78caf7e67dc") })
        .then((res) => {
            console.log('Delete with ObjectID("5af20e665b2cd78caf7e67dc")', res);
        })
        .catch((err) => {
            console.log(err);
        });
    //client.close();
});