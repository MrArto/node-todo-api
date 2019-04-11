const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


var id = '5cacb63b7fc2e8294c4d3d03'; //'5caecb9d8779b850b439922d';

if (!ObjectID.isValid(id)) {
  console.log('invalid Id');
};

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('ID not found');
  };
  console.log('Todo byID', todo);
}).catch((e) => { console.log(e)});

User.findById(id).then((user) => {
  if (!user) {
    return console.log('ID not found');
  };
  console.log('User by ID', user);
}).catch((e) => { console.log(e)});
