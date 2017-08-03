var myApp=angular.module('myApp',['ngRoute','cart']);
myApp.config(function($routeProvider){
	$routeProvider.
	when('/',{
		templateUrl:"views/login.html",
        showHeader:false
	}).
	when('/register',{
		templateUrl:"views/register.html",
        showHeader:false
	}).
	when('/restaurants',{
		templateUrl:"views/restaurants.html",
		controller:"restaurantCtrl",
        showHeader:true
	}).
  when('/menu/:restaurantId',{
        templateUrl:"views/menu.html",
        controller:"menuCtrl",
        showHeader:true
  }).
      when('/customer', {
        controller: 'CustomerController',
        templateUrl: 'views/customer.html'
      }).
  when('/checkout',{
        templateUrl:"views/checkoutSummery.html",
        controller:"checkoutCtrl",
        showHeader:true
  }).
  when('/placeOrder',{
        templateUrl:"views/placeOrder.html",
        controller:"placeCtrl"
  }).
  when('/completeOrder',{
    templateUrl:"views/payment.html"
  }).
	otherwise({
		redirectTo:"/"
	});
}).
run(['$rootScope','$location', function($rootScope,$location) {
    $rootScope.$on("$routeChangeSuccess", function(event, next, current) {
        $rootScope.showHeader = next.$$route.showHeader;
    });
}]);
/*Restaurant Controller*/
myApp.controller('restaurantCtrl',function($scope,$http,$window){
        $scope.lat = "0";
        $scope.lng = "0";
        $scope.accuracy = "0";

        $scope.showPosition = function (position) {
            $scope.lat = position.coords.latitude;
            $scope.lng = position.coords.longitude;
            $scope.accuracy = position.coords.accuracy;
			      $http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+$scope.lat+','+$scope.lng+'&sensor=false&callback=parseme').success(function(data){
              $scope.address=data;
              $http.get('restaurants.json').success(function(data1){
              $scope.items=data1;
            })  
            var myAddress="";
              for (var i = 0; i < $scope.address.results.length; i++) {
                for(var j=0;j < $scope.address.results[i].address_components.length;j++){
              alert($scope.address.results[i].address_components[j].long_name)
              if(($scope.address.results[i].address_components[j].long_name)){
              }
                }
              }
            })
           // $scope.$apply();
        }

        
        $scope.getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        }

        $scope.getLocation();
           $http.get('restaurants.json').success(function(data){
           $scope.items=data;
         })    
})
.directive('hungrieRating', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '\u2605' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(newVal, oldVal) {
          if (newVal || newVal === 0) {
            updateStars();
          }
        });
      }
    }
  })
  .directive('hungriePrice', function () {
    return {
      restrict: 'A',
      template: '<ul class="rating">' +
                  '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
                    '$' +
                  '</li>' +
                '</ul>',
      scope: {
        ratingValue: '=',
        max: '=',
        readonly: '@',
        onRatingSelected: '&'
      },
      link: function (scope, elem, attrs) {

        var updateStars = function() {
          scope.stars = [];
          for (var  i = 0; i < scope.max; i++) {
            scope.stars.push({filled: i < scope.ratingValue});
          }
        };

        scope.toggle = function(index) {
          if (scope.readonly && scope.readonly === 'true') {
            return;
          }
          scope.ratingValue = index + 1;
          scope.onRatingSelected({rating: index + 1});
        };

        scope.$watch('ratingValue', function(newVal, oldVal) {
          if (newVal || newVal === 0) {
            updateStars();
          }
        });
      }
    }
  });
/*Menu Controller*/
myApp.controller('menuCtrl',function($scope,$http,$routeParams,cart){
      $http.get("restaurants.json").success(function(data){
        $scope.items=data;
        $scope.restaurant=$routeParams.restaurantId;
      });
      $scope.addProductToCart = function (product) {
        cart.addProduct(product.id, product.name, product.price);
        setTimeout(function() { 
          alert();
        $("#dvData").fadeOut(); 
        }, 2000);
      }
     
        
});
/*Checkout Controller*/
myApp.controller('checkoutCtrl',function($scope,cart,$http){
     $scope.cartData = cart.getProducts();
      $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
        total += ($scope.cartData[i].price * $scope.cartData[i].count);
         }
        return total;
       }
     $scope.remove = function (id) {
        cart.removeProduct(id);
      }
})
/*Navbar Controller*/
myApp.controller('navbarCtrl',function(){
    	$(".sidebar-toggle").click(function(){
          if($("body").hasClass("sidebar-collapse")){
          $("body").removeClass("sidebar-collapse");
          }
          else{
             $("body").addClass("sidebar-collapse");
          }
        })
})
myApp.controller('placeCtrl',function($scope,$http){
  $scope.save =function(){
    $scope.dataObject= [{
      name:$scope.data.shipping.name,
      address:$scope.data.shipping.street,
      city:$scope.data.shipping.city,
      state:$scope.data.shipping.state,
      zip:$scope.data.shipping.zip,
      country:$scope.data.shipping.country
    }];
  }
})

'use strict';

myApp.controller('CustomerController',
    function CustomerController($scope, customer, $location) {

  $scope.customerName = customer.name;
  $scope.customerAddress = customer.address;
  $scope.findRestaurants = function(customerName, customerAddress) {
    customer.name = customerName;
    customer.address = customerAddress;

    $location.url('/');
  };
});

myApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if(attrs.href ==='#' || attrs.href ==='#HIWorks' || attrs.href ==='#home' || attrs.href==='#help'){
                elem.on('click', function(e){
                    e.preventDefault();
                });
            }
        }
   };
}); 

