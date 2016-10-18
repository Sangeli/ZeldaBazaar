var Q = require('q');
var jwt = require('jwt-simple');
var Item = require('./itemModel.js');

var defaultItems = {
  'Hylian Shield': {
    url: 'http://i.imgur.com/3RPsfLP.png',
    cost: 80
  },
  'Deku Stick': {
    url: 'http://i.imgur.com/m2llXZB.gif',
    cost: 5
  },
};


var initialize = function() {
  for (var itemName in defaultItems) {
    Item.findOne({name: itemName}).then(function(item) {
      if (item) { return; }
      item = defaultItems[itemName];
      Item.create({
              name: itemName,
              url: item.url,
              cost: item.cost
            });
    });
  }
}

initialize();


module.exports = {
  getItems: function (req, res, next) {
    Item.find().then(function(items) {
      console.log('sending json');
      res.json(items);
    });
  }
}

