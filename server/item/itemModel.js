var Q = require('q');
var mongoose = require('mongoose');


var ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});



module.exports = mongoose.model('item', ItemSchema);
