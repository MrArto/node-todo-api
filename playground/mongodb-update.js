const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/ToDoApp', (err, client) => {
  if (err) {
    return console.log('We were unable to connect tpo connect mongodb server');
  }
  console.log('Connected to mongodb server succssesfully');
  const db = client.db('TodoApp');


//findOneAndUpdate

//"text" : "Somthing to do",
db.collection('Todos').findOneAndUpdate(
  {
  _id: new ObjectID('5cab5f2c06ecc50d74e472cc')
},
{
  $set: {completed: true}
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

   client.close();
});
