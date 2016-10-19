angular.module('zeldaBazaar.inventory', [])

.controller('InventoryController', function ($scope, $window, $location, Store, Auth) {

  Store.getInventory().then(function(items) {
    $scope.items = items;
  });


  Store.getWallet().then(function(rupees) {
    $scope.rupees = rupees;
  });


  $scope.switchToStore = function() {
    $location.path('/store');
  }

  $scope.signout = function() {
    Auth.signout();
  }

});
