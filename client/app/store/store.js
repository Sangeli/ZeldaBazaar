angular.module('zeldaBazaar.store', [])

.controller('StoreController', function ($scope, Store) {
  $scope.items = [];
  Store.getItems().then(function(items) {
    $scope.items = items;
    console.log('items', items);
  });
});
