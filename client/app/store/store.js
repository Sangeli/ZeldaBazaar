angular.module('zeldaBazaar.store', [])

.controller('StoreController', function ($scope, $window, $location, Store, Auth) {
  $scope.items = [];

  var updateWallet = function() {
    Store.getWallet().then(function(rupees) {
      $scope.rupees = rupees;
    });
  }

  updateWallet();

  Store.getItems().then(function(items) {
    $scope.items = items;
  });

  $scope.purchase = function(item) {
    Store.buyOne(item.name).then(function(){
      updateWallet();
    });
  }

  $scope.switchToInventory = function() {
    $location.path('/inventory');
  }

  $scope.signout = function() {
    Auth.signout();
  }
});
