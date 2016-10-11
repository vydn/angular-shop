"use strict";angular.module("myApp",["ngRoute","myApp.cart","myApp.shop"]).config(["$locationProvider","$routeProvider",function(a,b){a.hashPrefix("!"),b.otherwise({redirectTo:"/shop"})}]),angular.module("myApp.cart",["ngRoute"]).config(["$routeProvider",function(a){a.when("/cart",{templateUrl:"cart/cart.html",controller:"CartTopController"})}]).factory("Cart",["Product","$filter","Util",function(a,b,c){var d=[];return{all:function(){return d},add:function(e,f){var g=a.find_by_id(a.all(),f);if(g){var h=b("filter")(d,{id:f},!0);h.length?h[0].quantity+=e:d.push(c.merge_obj(g,{quantity:e}))}},total:function(){for(var a=0,b=0;b<d.length;b++)a+=parseFloat(d[b].price)*d[b].quantity;return a},quantities:function(){for(var a=0,b=0;b<d.length;b++)a+=parseInt(d[b].quantity);return a}}}]).factory("Util",["$filter",function(a){return{merge_obj:function(a,b){var c={};for(var d in a)c[d]=a[d];for(var d in b)c[d]=b[d];return c}}}]).controller("CartTopController",["$scope","Cart","Product","Util","$filter","$rootScope",function(a,b,c,d,e,f){a.cart=b.all(),a.total=b.total(),a.updateTotal=function(c,d){var g=e("filter")(b.all(),{id:c},!0);b.add(d-g[0].quantity,c),f.$broadcast("cartChanged"),a.cart=b.all(),a.total=0;for(var h=0;h<a.cart.length;h++)a.total+=parseFloat(a.cart[h].price)*a.cart[h].quantity},a.removeItem=function(c){b.all().splice(c,1),f.$broadcast("cartChanged"),a.cart=b.all(),a.total=0;for(var d=0;d<a.cart.length;d++)a.total+=parseFloat(a.cart[d].price)*a.cart[d].quantity}}]),angular.module("myApp.shop",["ngRoute"]).config(["$routeProvider",function(a){a.when("/shop",{templateUrl:"shop/shop.html",controller:"ShopTopController"})}]).factory("Product",["$filter",function(a){var b={},c=[{id:"1",name:"SADES SA-708 Stereo Gaming Headphone Headset with Microphone",producer:"Sades",features:"Unique, well shaped and designed gaming headset, with foldable hidden microphone",rating:"4",price:"29.99",image:"p1.jpg"},{id:"2",name:"LOGITECH G430 981-000536 Dolby 7.1",producer:"Logitech",features:"Customizable padded headset with immersive 360-degree sound for serious",rating:"4",price:"67.50",image:"p2.jpg"},{id:"3",name:"Logitech G230 Stereo Gaming Headset with Mic",producer:"Logitech",features:" Windows 8, Windows 7, or Linux operating system, Headset and microphone inputs",rating:"4",price:"28.99",image:"p3.jpg"},{id:"4",name:"VersionTech G2000 Stereo Gaming Headset PC with Mic, Over-ear Headphones",producer:"VersionTech",features:"This VersionTech G2000 gaming headset provides you vivid sound field",rating:"4",price:"30.99",image:"p4.jpg"},{id:"5",name:"Bengoo Stereo PC Gaming Headset 7 Colors Breathing LED Light Over-ear Headphones",producer:"Bengoo",features:"50mm driver, Bengoo gaming headset release vivid verisimilitude",rating:"5",price:"59.99",image:"p5.jpg"},{id:"6",name:"UL SADES SA807 Multi-Platform Gaming Headsets Headphones For New Xbox",producer:"Sades",features:"earcup design in SA807 Gaming Headset, covers your entire ear and",rating:"4",price:"19.99",image:"p6.jpg"},{id:"7",name:"Sentey GS-4730 Virtual 7.1 USB DAC Gaming Headset Arches with Vibration",producer:"Sentey",features:"1 Digital Surround Computer Headset: you can jam to the beat of own",rating:"3",price:"39.99",image:"p7.jpg"},{id:"8",name:"ASTRO Gaming A50 Wireless Dolby Gaming Headset PS4 - Black/Blue",producer:"ASTRO Gaming",features:"up mute functionality. The A50 headset is lightweight, easily",rating:"5",price:"299.99",image:"p8.jpg"},{id:"9",name:"HyperX Cloud Stinger Gaming Headset for PC, Xbox One¹, PS4, Wii U",producer:"Kingston",features:"business, entertainment, and more! Headset splitter helps turn a 3",rating:"4",price:"49.99",image:"p9.jpg"},{id:"10",name:"Razer Kraken Mobile Analog Music & Gaming Headset-Neon Orange",producer:"Razer",features:"This durable yet lightweight headset is made for Apple iOS with an in",rating:"4",price:"86.99",image:"p10.jpg"},{id:"11",name:"Bengoo Gaming Headset Comfortable 3.5mm Stereo with LED Lighting",producer:"Bengoo",features:"fashion appearance. Professional gaming headset for your choice",rating:"5",price:"22.99",image:"p11.jpg"},{id:"12",name:"XIBERIA V10 PC Gaming Headset Surround Sound Over-ear Headphones",producer:"XIBERIA",features:"audiophiles alike.All XIBERIA headsets are plug and play.",rating:"5",price:"26.99",image:"p12.jpg"}];return{all:function(){return c},find_by_id:function(c,d){var e=a("filter")(c,{id:d},!0);return e.length&&(b=e[0]),b}}}]).controller("ShopTopController",["$scope","$rootScope","Cart","Product","Util",function(a,b,c,d,e){a.add_to_cart=function(a,d){c.add(a,d),b.$broadcast("cartChanged")},a.products=d.all()}]).controller("NavBarController",["$scope","$rootScope","Cart","Util",function(a,b,c,d){a.cart_quantities=0,a.cart_total=0,b.$on("cartChanged",function(){a.cart_quantities=c.quantities(),a.cart_total=c.total()})}]),angular.module("angularShopApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> <img src="images/yeoman.8cb970fb.png" alt="I\'m Yeoman"><br> Always a pleasure scaffolding your apps. </p> <p><a class="btn btn-lg btn-success" ng-href="#/">Splendid!<span class="glyphicon glyphicon-ok"></span></a></p> </div> <div class="row marketing"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>')}]);