//const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('We were unable to connect tpo connect mongodb server');
  }
  console.log('Connected to mongodb server succssesfully');
  const db = client.db('TodoApp');


// db.collection('Todos').find({
//   _id: new ObjectID('5cab5bbf3c22742cbc3c49ff')
// }).toArray().then((docs) => {
//   console.log('Todoes');
//   console.log(JSON.stringify(docs, undefined, 2));
// }, (err) => {
//   console.log('Unabel to fetch the data', err);
// });


db.collection('Todos').find().count().then((count) => {
  console.log('Todoes count', count);
}, (err) => {
  console.log('Unabel to fetch the data', err);
});



db.collection('Users').find({name: 'es emd yaaa'}).toArray().then((docs) => {
  console.log('Users data');
  console.log(JSON.stringify(docs, undefined, 2));
}, (err) => {
  console.log('unable to fetch the data from useres');
});

// db.collection('Users').insertOne({
//   name: 'es em',
//   age: 56,
//   locartion: 'chem asi'
// }, (err, result) => {
//   if (err) {
//     return console.log('Unable to inser into users');
//   };
//   console.log(JSON.stringify(result.ops, undefined, 2));
//   console.log(result.ops[0]._id.getTimestamp());
// });

   client.close();
});
