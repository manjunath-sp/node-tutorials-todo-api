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
    text: '2nd todo',
    completed: true,
    completedAt: new Date().getTime()
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
            .end((err) => {
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
            .end((err) => {
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
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {

    it('should fetch a todo by id', (done) => {
        let todoUri = `/todos/${todos[0]._id.toHexString()}`;
        request(app)
            .get(todoUri)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return a 400 status for non ObjectID', (done) => {
        let todoUri = '/todos/4143253253';
        request(app)
            .get(todoUri)
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });

    it('should return a 404 status for a valid ObjectID', (done) => {
        let todoUri = '/todos/' + new ObjectID();
        request(app)
            .get(todoUri)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });
});


describe('DELETE /todos/:id', () => {
    const id = todos[1]._id.toHexString();
    it('should delete a todo by id', (done) => {
        let todoUri = `/todos/${id}`;
        request(app)
            .delete(todoUri)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[1].text);
            })
            .end((err) => {
                if (err) {
                    return done(err);
                }
                Todo
                    .findById(id)
                    .then((todo) => {
                        expect(todo).toBeNull;
                        done();
                    })
                    .catch(err => done(err));
            });
    });

    it('should return a 400 status for non ObjectID', (done) => {
        let todoUri = '/todos/4143253253';
        request(app)
            .delete(todoUri)
            .expect(400)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });

    it('should return a 404 status for a valid ObjectID', (done) => {
        let todoUri = '/todos/' + new ObjectID();
        request(app)
            .delete(todoUri)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toExist();
            })
            .end(done);
    });
});


describe('PATCH /todos/:id', () => {

    it('should update todo', (done) => {
        const id = todos[0]._id.toHexString();
        let todoUri = `/todos/${id}`;
        request(app)
            .patch(todoUri)
            .send({ completed: true })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBeTruthy();
                expect(res.body.todo.completedAt).toBeA('number');
            })
            .end(done);
    });

    it('should clear completedAt when todo is not complete', (done) => {
        const id = todos[0]._id.toHexString();
        let todoUri = `/todos/${id}`;
        request(app)
            .patch(todoUri)
            .send({ completed: false })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completed).toBeFalsy();
                expect(res.body.todo.completedAt).toEqual(null);
            })
            .end(done);
    });
});
