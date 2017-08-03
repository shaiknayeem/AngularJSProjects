var myApp=angular.module('ngMap',['ngResource']);
myApp.controller('weatherApp',function($scope,$http){
	$http.get('http://ip-api.com/json/?callback=').success(function(data){
	$scope.address=data;	
	});
});