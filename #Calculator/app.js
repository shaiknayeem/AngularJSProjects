var myApp=angular.module('myApp',[]);
myApp.controller('calcCtrl',function($scope){
	  $scope.output = "0";
	  $scope.newVal=true;
	  $scope.pendingVal=null;
	  $scope.lastOperation=null;
	  $scope.total=null;
	  $scope.pendingOperation=null;
	  $scope.pendingOperationToken=null;
	  $scope.operationToken="";
	  
	  var ADD="add";
	  var SUB="subtract";
	  var MUL="multiply";
	  var DIV="divide";
	  
	  $scope.update=function(btn){
		  if($scope.output== '0' || $scope.newVal){
			  $scope.newVal=false;
			  $scope.output=btn;
		  }
		  else{
			  $scope.output+=String(btn)
		  }
		  	  $scope.pendingVal=toNumber($scope.output)
	  }
	  
	$scope.add=function(){
		if($scope.pendingVal){
			if($scope.total && $scope.pendingOperation==ADD){
				$scope.total+=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==SUB){
			    $scope.total-=$scope.pendingVal;	
			}
			else if($scope.total && $scope.pendingOperation==MUL){
				 $scope.total*=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==DIV){
				 $scope.total/=$scope.pendingVal;
			}
			else{
				$scope.total=$scope.pendingVal;
			}
		}
		setOperationToken(ADD);
		setOutput(String($scope.total));
		$scope.pendingOperation = ADD;
		$scope.newVal=true;
		$scope.pendingVal=null;
		
	}
	$scope.sub=function(){
			if($scope.pendingVal){
			if($scope.total && ($scope.pendingOperation==SUB)){
				$scope.total-=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==ADD){
			    $scope.total+=$scope.pendingVal;	
			}
			else if($scope.total && $scope.pendingOperation==MUL){
				 $scope.total*=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==DIV){
				 $scope.total/=$scope.pendingVal;
			}
			else{
				$scope.total=$scope.pendingVal;
			}
		}
		setOperationToken(SUB);
		setOutput(String($scope.total));
		$scope.pendingOperation = SUB;
		$scope.newVal=true;
		$scope.pendingVal=null;
	}
	
	$scope.mul=function(){
			if($scope.pendingVal){
			if($scope.total && $scope.pendingOperation==MUL){
				$scope.total*=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==ADD){
			    $scope.total+=$scope.pendingVal;	
			}
			else if($scope.total && $scope.pendingOperation==SUB){
				 $scope.total-=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==DIV){
				 $scope.total/=$scope.pendingVal;
			}
			else{
				$scope.total=$scope.pendingVal;
			}
		}
		setOperationToken(MUL);
		setOutput(String($scope.total));
		$scope.pendingOperation = MUL;
		$scope.newVal=true;
		$scope.pendingVal=null;
	}
	
		$scope.div=function(){
			if($scope.pendingVal){
			if($scope.total && $scope.pendingOperation==DIV){
				$scope.total*=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==ADD){
			    $scope.total+=$scope.pendingVal;	
			}
			else if($scope.total && $scope.pendingOperation==SUB){
				 $scope.total-=$scope.pendingVal;
			}
			else if($scope.total && $scope.pendingOperation==MUL){
				 $scope.total*=$scope.pendingVal;
			}
			else{
				$scope.total=$scope.pendingVal;
			}
		}
		setOperationToken(DIV);
		setOutput(String($scope.total));
		$scope.pendingOperation = DIV;
		$scope.newVal=true;
		$scope.pendingVal=null;
	}
	
	$scope.calc=function(){
		if(!$scope.newVal){
			$scope.pendingVal=toNumber($scope.output);
			$scope.lastVal=$scope.pendingVal;
		}
		if($scope.pendingOperation== ADD){
			$scope.total+=$scope.pendingVal;
			$scope.lastOperation= ADD;
		}
		else if($scope.pendingOperation== SUB){
			$scope.total-=$scope.pendingVal;
			$scope.lastOperation= SUB;
		}
		else if($scope.pendingOperation== MUL){
			$scope.total*=$scope.pendingVal;
			$scope.lastOperation= MUL;
		}
		else if($scope.pendingOperation== DIV){
			$scope.total/=$scope.pendingVal;
			$scope.lastOperation= DIV;
		}
		else{
			if($scope.lastOperation==ADD){
				if($scope.total){
				$scope.total+=$scope.lastVal;
				}
				else{
					$scope.total=0;
				}
			}
			else if($scope.lastOperation==SUB){
				if($scope.total){
				$scope.total-=$scope.lastVal;
				}
				else{
					$scope.total=0;
				}
			}
			else if($scope.lastOperation == MUL){
				if($scope.total){
					$scope.total*=$scope.lastVal;
				}
				else{
					$scope.total=0;
				}
			}
			else if($scope.lastOperation == DIV){
				if($scope.total){
					$scope.total*=$scope.lastVal;
				}
				else{
					$scope.total=0;
				}
			}
			else{
				$scope.total=0;
			}   
		}
			    setOutput($scope.total);
				setOperationToken();
				$scope.pendingOperation = null;
				$scope.newVal=true;
				$scope.pendingValue = null;
	}
	
	$scope.clear=function(){
		$scope.total=null;
		$scope.pendingVal=null;
		$scope.pendingOperation=null;
		setOutput("0");
	}
	
	 var toNumber = function(numberString) {
      var result = 0;
       if(numberString) {
         result = numberString*1;
       }
       return result;
    };
	
	var setOutput = function(outputString) {
    $scope.output = outputString;
    $scope.newNumber = true;
  };
  
  var setOperationToken = function(operation) {
    if(operation == ADD) {
      $scope.operationToken = "+";
    } 
	else if (operation == SUB) {
      $scope.operationToken = "-";
    } 
	else if(operation == MUL){
	$scope.operationToken = "*";
	}
	else if(operation == DIV){
	$scope.operationToken = "/";
	}else {
      $scope.operationToken = "";
    }
  };	
 })
 
 