//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');

// 
// var obj = new ObjectID();
// console.log(obj);

//
// var user = {name: 'bbbb', age: 26};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('We were unable to connect tpo connect mongodb server');
  }
  console.log('Connected to mongodb server succssesfully');
  const db = client.db('TodoApp');

db.collection('Todos').insertOne({
  text: 'Somthing to do',
  completed: false
}, (err, result) => {
  if (err) {
    return console.log('unable to insert to Todo');
  }console.log(JSON.stringify(result.ops, undefined, 2));

});



db.collection('Users').insertOne({
  name: 'es em',
  age: 56,
  locartion: 'chem asi'
}, (err, result) => {
  if (err) {
    return console.log('Unable to inser into users');
  };
  console.log(JSON.stringify(result.ops, undefined, 2));
  console.log(result.ops[0]._id.getTimestamp());
});


  client.close();
});
