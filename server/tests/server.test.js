const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: '1st todo'
}, {
    _id: new ObjectID(),
    text: '2nd todo'
}];

beforeEach((done) => {
    Todo
        .remove({})
        .then(() => {
            return Todo.insertMany(todos);
        }).then(() => {
            done();
        });
});

describe('POST /todos', () => {
    it('should create a new todo item in the todos collection', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should fecth all the todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                console.log(res.body);
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should fetch a todo by id', (done) => {
        let todoUri = `/todos/${todos[0]._id.toHexString()}`;
        console.log('todo uri:', todoUri);
        request(app)
            .get(todoUri)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a 400 status for non ObjectID', (done) => {
        let todoUri = `/todos/4143253253`;
        console.log('todo uri:', todoUri);
        request(app)
            .get(todoUri)
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return a 404 status for a valid ObjectID', (done) => {
        let todoUri = `/todos/` + new ObjectID();
        console.log('todo uri:', todoUri);
        request(app)
            .get(todoUri)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });
});