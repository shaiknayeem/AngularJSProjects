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

	$http.jsonp('https://api.flickr.com/services/feeds/photos_public.gne?format=json').success(function (data) {
	});
jsonFlickrFeed = function(d){
	$scope.photos=d;
       }
	  }
    }
    mydata = function(){
	return $http.get('http://ip-api.com/json/?callback=').success(function(data){
	$scope.address=data;	
	});
    }
    
    mydata().success(function(data){
    })
  $scope.map = {
    control: {},
    center: {
        latitude: -37.812150,
        longitude: 144.971008
    },
    zoom: 14
  };
  // marker object
  $scope.marker = {
    center: {
        latitude: -37.812150,
        longitude: 144.971008
    }

  } 
  // instantiate google map objects for directions
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  var geocoder = new google.maps.Geocoder();
  // directions object -- with defaults
  $scope.directions = {
    origin: "Bangalore",
    destination: "Chennai",
    showList: false
  }
   var request = {
      origin: $scope.directions.origin,
      destination: $scope.directions.destination,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(request, function (response, status) {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
        directionsDisplay.setMap($scope.map.control.getGMap());
        directionsDisplay.setPanel(document.getElementById('directionsList'));
        $scope.directions.showList = true;
      } else {
        alert('Google route unsuccesfull!');
      }
    });
});