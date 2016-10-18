angular.module('zeldaBazaar.store', [])

.controller('StoreController', function ($scope, $window, Store) {
  $scope.items = [];
  Store.getItems().then(function(items) {
    $scope.items = items;
    console.log('items', items);
  });

  $scope.purchase = function(item) {
    console.log('buying', item);
    Store.buyOne(item.name);
  }
});
