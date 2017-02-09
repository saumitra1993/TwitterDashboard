angular.module("twdashboard").factory('appfactory',function($q,$http,$location,$rootScope,$window){

	var factory={};
    var max_id = 0;
    var count = 200;
    factory.screen_name = "";
    factory.connectTwitter = function(){
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: '/twitter/connect'
        }).then(function successCallback(response) {
            console.log(response);
            defer.resolve();
            window.location = response.data.redirect_to;
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
    };
    
    factory.getHomeTimeline = function(){
        var defer = $q.defer();
        var url = '/twitter/timeline?count='+count;
        if(max_id > 0){
            url += "&max_id=" + max_id;
        }
        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            console.log(response);
            max_id = response.data[response.data.length - 1].id;
            defer.resolve(response.data);
            
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
        
    };
    
    return factory;  
});