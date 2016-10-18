var Q = require('q');
var jwt = require('jwt-simple');
var Item = require('./itemModel.js');
var User = require('./../user/userModel.js');


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
  },
  purchaseItem: function (req, res, next) {
    console.log('buy item', req.body.name);
    Item.findOne({name:req.body.name}).then(function(item) {
      var username = req.session.username;
      console.log('search user', username);
      User.findOne({username:username}).then(function(user) {
        console.log('found user', username);
        var foundAny = false;
        for( var i = 0; i < user.invetory.length; i++) {
          var dbItem = user.invetory[i];
          console.log('compare', item._id, dbItem.item_id);
          if (dbItem.item_id == item._id ) {
            foundAny = true;
            dbItem.count ++;
            break;
          }
        }
        if(!foundAny) {
          user.invetory.push({item_id:item._id, count:1});
        }
        user.save(function (err, savedItem) {
          if (err) {
            console.log('error on save', err);
          } else {
            console.log('saved', savedItem)
          }
        });
      });
    });
  }
}



