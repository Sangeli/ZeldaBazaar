var Q = require('q');
var jwt = require('jwt-simple');
var Item = require('./itemModel.js');
var User = require('./../user/userModel.js');
var Util = require('./../config/util.js');
var Promise = require('bluebird');


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
      var username = Util.getUsernameFromReq(req, next);
      User.findOne({username:username}).then(function(user) {

        //check price
        if (user.rupees < item.cost) {
          next(new Error('Insufficient Rupees'));
        }

        user.rupees -= item.cost;

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
  },

  getInvetory: function(req, res, next) {
    Util.getUserFromReq(req, next).then(function(user) {
      var idArr = [];
      var countByItemId = {};

      user.invetory.forEach(function(userItem) {
        countByItemId[userItem.item_id] = userItem.count;
        idArr.push(userItem.item_id);
      });

      Item.find({_id:{$in : idArr}}).then(function(items) {
        var invetory = [];
        items.forEach(function(item) {
          item = JSON.parse(JSON.stringify(item));
          item.count = countByItemId[item._id];
          invetory.push(item);
        });
        res.json(invetory);
      });

      /*
      user.invetory.forEach(function(userItem) {
        console.log('userItem', userItem);
        var promise = new Promise(Item.findOne({_id:userItem.item_id}));
        //promise.then(function(item) { console.log('found ', item)});
        console.log('promise', promise);
        promises.push(promise);
        countByItemId[userItem.item_id] = userItem.count;
      });
      Promise.promisifyAll(promises).then(function(userItems) {
        console.log('user items', userItems);
        var invetory = [];
        userItems.forEach(function(userItem) {
          userItem.count = countByItemId[userItem._id];
          invetory.push(userItem);
        });
        res.json(invetory);
      });
      */

    });
  }
}



