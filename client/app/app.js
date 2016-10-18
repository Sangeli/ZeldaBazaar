
angular.module('zeldaBazaar', [
  'zeldaBazaar.auth',
  'zeldaBazaar.services',
  'zeldaBazaar.store',
  'ngRoute'
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/store/store.html',
      controller: 'StoreController'
    })
    // .when('/', {
    //   templateUrl: 'app/auth/signup.html',
    //   controller: 'AuthController'
    // })
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/store', {
      templateUrl: 'app/store/store.html',
      controller: 'StoreController'
    })

    ;
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');
});
/*
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.zeldaBazaar');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
});
*/

