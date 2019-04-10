var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
    console.log('the dos is saves as: ', doc);
  }, (err) => {
    res.status(400).send(err);
    console.log('Faild so save for some reason such as: ', err);
  });
  console.log(req.body);
});




app.listen(3000, () => {
  console.log('Starting on port 3000');
})
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
//
//
// newTodo.save().then((doc) => {
//   console.log('Saved Todo: ', doc);
// }, (e) => {
//   console.log('Unable to save to ToDo: ', e);
// });



// var NewTodo1 = new Todo({
//   text: 'node learn',
//   compleated: false,
//   compleatedAt: 256
// });
//
//
// NewTodo1.save().then((doc) => {
//   console.log('The task is saved: ', doc);
// }, (e) => {
//   console.log('unable to save int Todos you last satk named: ', e);
// });


//
// var userik = new User({
// email: 'aaaaa'
// });
//
// userik.save().then((doc) => {
//   console.log('saved the doc: ', doc);
// }, (e) => {
//   console.log('faild for some reason such as: ', e);
// });