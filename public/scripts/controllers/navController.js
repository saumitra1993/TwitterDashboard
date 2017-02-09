angular.module("twdashboard").controller("navController", function($scope,appfactory,$q,$routeParams){
    
    $scope.screen_name = "";
    console.log(appfactory);
    $scope.$watch(function(){return appfactory.screen_name;},function(newVal, oldVal){
       if(newVal != ""){
           
           $scope.screen_name = appfactory.screen_name;
       } 
    });
    
});