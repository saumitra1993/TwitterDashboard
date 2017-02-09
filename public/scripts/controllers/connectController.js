angular.module("twdashboard").controller("connectController", function($scope,appfactory,$q,$routeParams){
    
    $scope.signInText = "Sign In With Twitter";
    $scope.connect = function(){
        $scope.signInText = "Redirecting...";
        appfactory.connectTwitter().then(function(){
            
        }).catch(function(err){
            
        });
    };
});