const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');



const todos = [{
  _id: new ObjectID(),
  text: "First text todo"
}, {
  _id: new ObjectID(),
  text: "Second text todo",
  completed: true,
  completedAt: 333
}];



beforeEach((done) => {
Todo.deleteMany({}).then(() => {
  return Todo.insertMany(todos)
}).then(() => done());
});


describe('Post /todos', () => {
it('should create new todo', (done) => {
  var text = 'Test todo text';

request(app)
.post('/todos')
.send({text})
.expect(200)
.expect((res) => {
  expect(res.body.text).toBe(text);
})
.end((err, res) => {
  if (err) {
    return done(err);
  };

  Todo.find().then((todos) => {
    expect(todos.length).toBe(3);
    expect(todos[2].text).toBe(text);
    done();
  }).catch((e) => done(e));
});
});


it('should not create todo with invaled data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      };

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
});

});


describe('Get/todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
    })
    .end(done);
  });
});



describe('GET/Todos/:id', () => {

  it('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('shuld return 404 if todo is not found', (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${hexID}`)
    .expect(404)
    .end(done);
  });

var newID =new ObjectID();
it('should return 404 if id is not valid', (done) => {
  request(app)
  .get('/todos/123')
  .expect(404)
  .end(done);
});

});


describe('Delete/Todos/:id', () => {

  it('should remove a todo', (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
    .delete(`/todos/${hexID}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(hexID);
    })
    .end((err, res) => {
       if (err) {
         return done(err)
       }
         Todo.findById(hexID)
         .then((todo) => {
           expect(todo).toBeFalsy();
           done();
         })
       .catch((e) => done(e));
    });
    });


  it('should retuern 404 if todo is not found', (done) => {
    var hexID = new ObjectID().toHexString();
    request(app)
    .delete(`/todo/${hexID}`)
    .expect(404)
    .end(done);
  });

var newID =new ObjectID();
it('should return 404 if ObjectId is not valid', (done) => {
  request(app)
  .delete('/todo/123')
  .expect(404)
  .end(done);
});

});




describe('PATCH /todos/:id', () => {

it('should update the todo', (done) => {
  var hexID = todos[0]._id.toHexString();
  var text = 'This is a new text';

  request(app)
  .patch(`/todos/${hexID}`)
  .send({completed: true,
    text: text
  })
  .expect(200)
  .expect((res) => {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(true);
    expect(typeof res.body.todo.completedAt).toBe('number');
  })
  .end(done);
});

it('should clear completed when todo is not comleted', (done) => {
  var hexID = todos[1]._id.toHexString();
  var text = 'This is a new text!! new text';

  request(app)
  .patch(`/todos/${hexID}`)
  .send({completed: false,
    text: text
  })
  .expect(200)
  .expect((res) => {
    expect(res.body.todo.text).toBe(text);
    expect(res.body.todo.completed).toBe(false);
    expect(res.body.todo.completedAt).toBeFalsy();//toBe('number');
  })
  .end(done);

});


});





























//////
