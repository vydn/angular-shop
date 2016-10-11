'use strict';

angular.module('myApp.shop', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/shop', {
      templateUrl: 'shop/shop.html',
      controller: 'ShopTopController'
    });
}])

.factory('Product', ['$filter', function($filter) {
  var product = {};
  var products = [
    {
      id: "1",
      name: "SADES SA-708 Stereo Gaming Headphone Headset with Microphone",
      producer: "Sades",
      features: "Unique, well shaped and designed gaming headset, with foldable hidden microphone",
      rating: "4",
      price: "29.99",
      image: "p1.jpg"
    },
    {
      id: "2",
      name: "LOGITECH G430 981-000536 Dolby 7.1",
      producer: "Logitech",
      features: "Customizable padded headset with immersive 360-degree sound for serious",
      rating: "4",
      price: "67.50",
      image: "p2.jpg"
    },
    {
      id: "3",
      name: "Logitech G230 Stereo Gaming Headset with Mic",
      producer: "Logitech",
      features: " Windows 8, Windows 7, or Linux operating system, Headset and microphone inputs",
      rating: "4",
      price: "28.99",
      image: "p3.jpg"
    },
    {
      id: "4",
      name: "VersionTech G2000 Stereo Gaming Headset PC with Mic, Over-ear Headphones",
      producer: "VersionTech",
      features: "This VersionTech G2000 gaming headset provides you vivid sound field",
      rating: "4",
      price: "30.99",
      image: "p4.jpg"
    },
    {
      id: "5",
      name: "Bengoo Stereo PC Gaming Headset 7 Colors Breathing LED Light Over-ear Headphones",
      producer: "Bengoo",
      features: "50mm driver, Bengoo gaming headset release vivid verisimilitude",
      rating: "5",
      price: "59.99",
      image: "p5.jpg"
    },
    {
      id: "6",
      name: "UL SADES SA807 Multi-Platform Gaming Headsets Headphones For New Xbox",
      producer: "Sades",
      features: "earcup design in SA807 Gaming Headset, covers your entire ear and",
      rating: "4",
      price: "19.99",
      image: "p6.jpg"
    },
    {
      id: "7",
      name: "Sentey GS-4730 Virtual 7.1 USB DAC Gaming Headset Arches with Vibration",
      producer: "Sentey",
      features: "1 Digital Surround Computer Headset: you can jam to the beat of own",
      rating: "3",
      price: "39.99",
      image: "p7.jpg"
    },
    {
      id: "8",
      name: "ASTRO Gaming A50 Wireless Dolby Gaming Headset PS4 - Black/Blue",
      producer: "ASTRO Gaming",
      features: "up mute functionality. The A50 headset is lightweight, easily",
      rating: "5",
      price: "299.99",
      image: "p8.jpg"
    },
    {
      id: "9",
      name: "HyperX Cloud Stinger Gaming Headset for PC, Xbox One¹, PS4, Wii U",
      producer: "Kingston",
      features: "business, entertainment, and more! Headset splitter helps turn a 3",
      rating: "4",
      price: "49.99",
      image: "p9.jpg"
    },
    {
      id: "10",
      name: "Razer Kraken Mobile Analog Music & Gaming Headset-Neon Orange",
      producer: "Razer",
      features: "This durable yet lightweight headset is made for Apple iOS with an in",
      rating: "4",
      price: "86.99",
      image: "p10.jpg"
    },
    {
      id: "11",
      name: "Bengoo Gaming Headset Comfortable 3.5mm Stereo with LED Lighting",
      producer: "Bengoo",
      features: "fashion appearance. Professional gaming headset for your choice",
      rating: "5",
      price: "22.99",
      image: "p11.jpg"
    },
    {
      id: "12",
      name: "XIBERIA V10 PC Gaming Headset Surround Sound Over-ear Headphones",
      producer: "XIBERIA",
      features: "audiophiles alike.All XIBERIA headsets are plug and play.",
      rating: "5",
      price: "26.99",
      image: "p12.jpg"
    }];
  return {
    all: function() {
      return products;
    },
    find_by_id: function(list, pid) {
      var found = $filter('filter')(list, {id: pid}, true);
      if (found.length) {
        product = found[0];
      }
      return product;
    }
  }
}])

.controller('ShopTopController', [
  "$scope", "$rootScope", "Cart", "Product", "Util",
  function($scope, $rootScope, Cart, Product, Util) {
    $scope.add_to_cart = function(quantity, pid) {
      Cart.add(quantity, pid);
      $rootScope.$broadcast('cartChanged');
    }
    $scope.products = Product.all();
  }
])

.controller('NavBarController', [
  "$scope", "$rootScope", "Cart", "Util",
  function($scope, $rootScope, Cart, Util) {
    $scope.cart_quantities = 0;
    $scope.cart_total = 0.00;
    $rootScope.$on('cartChanged', function () {
      $scope.cart_quantities = Cart.quantities();
      $scope.cart_total = Cart.total();
    });
  }
]);