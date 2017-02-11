angular.module("twdashboard").factory('appfactory',function($q,$moment,$http,$location,$rootScope,$window){

	var factory={};
    var max_id = 0;
    var count = 200;
    
    var start_of_day = moment().startOf('day');
    var now = moment();
    var i = start_of_day;
    factory.hours = [];
    console.log(start_of_day);
    while(i < now){
        factory.hours.push(i.toObject());
        i.add(1, 'hours');
    }
    factory.hours.reverse();
    
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
            if(max_id > 0){
                response.data = response.data.slice(0,1);
            }
            max_id = response.data[response.data.length - 1].id;
            defer.resolve(response.data);
            
        }, function errorCallback(response) {
            defer.reject(response);
        });
        return defer.promise;
        
    };
    
    return factory;  
});