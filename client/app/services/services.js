angular.module('zeldaBazaar.services', [])

.factory('Store', function ($http) {
  var getItems = function() {

    return $http({
      method: 'GET',
      url: '/api/store'
    })
    .then( function (resp) {
      console.log('data', resp.data);
      return resp.data;
    }, function (err) {
      console.log('getItems error', err);
    });
  };

  var addOne = function(link) {
    return $http({
      method: 'POST',
      url: '/api/store',
      data: {url: link}
    })
    .then(function(resp) {
      return resp;
    });
  };

  return {
    getItems: getItems,
    addOne: addOne
  };
  // Your code here
})
.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.zeldaBazaar'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.zeldaBazaar');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.zeldaBazaar');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
