var myApp=angular.module('ngMap',['ngResource','google-maps']);
myApp.controller('weatherApp',function($scope,$http){
	
	$scope.showme=function(){
		if($scope.name.length>0){
        $http.get('http://api.openweathermap.org/data/2.5/weather?q='+$scope.name+'&APPID=98c355d73f22c6eb33c4bc0bd22031fe').success(function(data){
		$scope.geo=data;
        $http.get('https://maps.googleapis.com/maps/api/timezone/json?location='+$scope.geo.coord.lat+','+$scope.geo.coord.lon+'&timestamp='+$scope.geo.dt+'&sensor=false').success(function(data1){
			$scope.zone=data1;
			$http.get('https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz='+$scope.zone.timeZoneId+'').success(function(data2){
				$scope.time=data2;
			})
		})
	});
	}
    }
    mydata = function(){
	return $http.get('http://ip-api.com/json/?callback=').success(function(data){
	$scope.address=data;	
	});
    }
    mydata().success(function(data){
    }) 
});

 