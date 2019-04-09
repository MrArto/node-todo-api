const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('We were unable to connect tpo connect mongodb server');
  }
  console.log('Connected to mongodb server succssesfully');
  const db = client.db('TodoApp');


// //deletMany
// db.collection('Users').deleteMany({name: "es em"}).then((result) => {
//   console.log(result);
// });

//deletOne
// db.collection('Users').deleteOne({name: "es em yaaa"}).then((result) => {
//   console.log(result);
// });
//


//findeOneAndDelete
db.collection('Users').findOneAndDelete({name: "es em56" }).then((result) => {
  console.log(result);
});

   client.close();
});
