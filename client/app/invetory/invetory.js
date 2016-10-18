angular.module('zeldaBazaar.invetory', [])

.controller('InvetoryController', function ($scope, $window, $location, Store) {

  Store.getInvetory().then(function(items) {
    $scope.items = items;
  });


  $scope.switchToStore = function() {
    $location.path('/store');
  }


});
