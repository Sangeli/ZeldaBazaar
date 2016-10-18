angular.module('zeldaBazaar.store', [])

.controller('StoreController', function ($scope, $window, $location, Store) {
  $scope.items = [];

  Store.getWallet().then(function(rupees) {
    $scope.rupees = rupees;
  });

  Store.getItems().then(function(items) {
    $scope.items = items;
  });

  $scope.purchase = function(item) {
    Store.buyOne(item.name);
  }

  $scope.switchToInvetory = function() {
    $location.path('/invetory');
  }
});
