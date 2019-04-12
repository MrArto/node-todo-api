const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });


// Todo.findOneAndRemove({_id: '5cb0484007883a8f1a2301ae'}).then((todo) => {
//   console.log(todo);
// })


Todo.findByIdAndDelete('5cb0484007883a8f1a2301ae').then((todo) => {
  console.log(todo);
})
