'use strict';

angular.module('myApp.cart', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/cart', {
      templateUrl: 'cart/cart.html',
      controller: 'CartTopController'
    });
}])

.factory('Cart', ['Product', '$filter', 'Util', function(Product, $filter, Util) {
  var cart = [];
  return {
    all: function() {
      return cart;
    },
    add: function(quantity, pid) {
      var product = Product.find_by_id(Product.all(), pid);
      if (product) {
        var found = $filter('filter')(cart, {id: pid}, true);
        if (found.length) {
          found[0].quantity += quantity;
        } else {
          cart.push(Util.merge_obj(product, {quantity: quantity }));
        }
      }
    },
    // set: function() {
    //   var found = $filter('filter')(cart, {id: pid}, true);
    //   found[0].quantity = quantity;
    // },
    total: function() {
      var total = 0.00;
      for ( var i=0; i < cart.length; i++ ) {
        total += parseFloat(cart[i].price)*cart[i].quantity;
      }
      return total;
    },
    quantities: function() {
      var quantities = 0;
      for ( var i=0; i < cart.length; i++ ) {
        quantities += parseInt(cart[i].quantity);
      }
      return quantities;
    }
  };
}])

.factory('Util', ['$filter', function($filter) {
  return {
    merge_obj: function(obj1, obj2) {
      var obj3 = {};
      for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
      for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
      return obj3;
    }
  }
}])

.controller('CartTopController', [
  "$scope", "Cart", "Product", "Util", "$filter", "$rootScope",
  function($scope, Cart, Product, Util, $filter, $rootScope) {
    $scope.cart = Cart.all();
    $scope.total = Cart.total();

    $scope.updateTotal = function(pid, quantity) {
      var found = $filter('filter')(Cart.all(), {id: pid}, true);
      Cart.add(quantity - found[0].quantity, pid);
      $rootScope.$broadcast('cartChanged');
      $scope.cart = Cart.all();
      $scope.total = 0.00;
      for ( var i=0; i < $scope.cart.length; i++ ) {
        $scope.total += parseFloat($scope.cart[i].price)*$scope.cart[i].quantity;
      }
    }

    $scope.removeItem = function(idx) {
      Cart.all().splice(idx, 1);
      $rootScope.$broadcast('cartChanged');
      $scope.cart = Cart.all();
      $scope.total = 0.00;
      for ( var i=0; i < $scope.cart.length; i++ ) {
        $scope.total += parseFloat($scope.cart[i].price)*$scope.cart[i].quantity;
      }
    }
  }
]);