angular.module("twdashboard").controller("modalInstanceController", function($scope,appfactory,$q,$routeParams, tweets, topic, $uibModalInstance){
    
    $scope.tweets = tweets;
    $scope.topic = topic;

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    
});