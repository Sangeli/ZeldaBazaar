// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('zeldaBazaar.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function (valid) {
    if (!valid) {
      return;
    }
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.zeldaBazaar', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function (valid) {
    if (!valid) {
      return;
    }
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.zeldaBazaar', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});
