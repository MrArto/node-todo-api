const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcript = require('bcryptjs')


var password = '123abs';

// bcript.genSalt(10, (err, salt) => {
//   bcript.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$XMTQqaG7C5K5Q1R7k4kLNOHwLtskQmBhXlHfALVeuvldVySbbKo3q';
bcript.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});














//
// var data = {
//   id: 10
// };
//
//
// var token = jwt.sign(data, '12345');
// console.log(token);
// var dec = jwt.verify(token, '12345');
// console.log(dec);
//


// var message2 = [1112, 334];
// var hash2 = SHA256(message2);
// var message1 = "I am a user";
// var hash1 = SHA256(message1);
// console.log(`hash2: ${hash2}`);
// console.log(`hash1: ${hash1}`);
// console.log(hash2.toString());
// console.log(hash1.toString());



// var data = {
//   id: 4
// };
//
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somthing').toString()
// };
//
//
// token.data.id = 5;
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somthing').toString();
//
//
// if (resultHash === token.hash) {
//   console.log('ok');
// } else {
//   console.log('not ok');
// }
//jwt
//
