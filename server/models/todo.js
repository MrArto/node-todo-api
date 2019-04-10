var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  compleated: {
    type: Boolean,
    default: false
  },
  compleatedAt: {
    type: Number,
    default: null
  }
});


module.exports = {Todo};
