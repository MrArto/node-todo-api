require('./config/config.js');

const _ = require('lodash')
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
Todo.find().then((todos) => {
  res.send({todos});
}, (e) => {
  res.status(400).send(e);
 });
});

//get/todos/13548
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
//validate
if (!ObjectID.isValid(id)) {
  return res.status(404).send();
};

Todo.findById(id).then((todo) => {
  if (!todo) {
    return res.status(404).send();
  };

res.send({todo});
}).catch((e) => {
  res.status(400).send();
  })
});

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  //validate
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };
  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo ) {
      return res.status(200).send();
    };
      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

if (_.isBoolean(body.completed) && body.completed) {
  body.completedAt = new Date().getTime();
} else {
  body.completed = false;
  body.completedAt = null;
};
Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
  if (!todo) {
    return res.status(404).send();
  }
  res.send({todo});
}).catch((e) => {
  res.status(400).send();
})
});


//Post /users
app.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
  //   var user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // });
  var user = new User(body);
  user.save().then(() => {
//     res.send(user);
//   }, (err) => {
//     res.status(400).send(err);
//   });
// });
return user.generateAuthToken();
}).then((token) => {
  res.header('x-auth', token).send(user);
}).catch((e) => {
  res.status(400).send(e);
});
});


app.listen(port, () => {
  console.log(`Starting on port ${port}`);
})
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo: ', doc);
// }, (e) => {
//   console.log('Unable to save to ToDo: ', e);
// });

// var NewTodo1 = new Todo({
//   text: 'node learn',
//   completed: false,
//   completedAt: 256
// });
//
//
// NewTodo1.save().then((doc) => {
//   console.log('The task is saved: ', doc);
// }, (e) => {
//   console.log('unable to save int Todos you last satk named: ', e);
// });

// var userik = new User({
// email: 'aaaaa'
// });
//
// userik.save().then((doc) => {
//   console.log('saved the doc: ', doc);
// }, (e) => {
//   console.log('faild for some reason such as: ', e);
// });

module.exports = {app};
