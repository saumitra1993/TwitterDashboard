angular.module("twdashboard").controller("dashboardController", function($scope,appfactory,$q,$routeParams){
    var used_hashtags = [];
    appfactory.screen_name = $routeParams.screen_name;
    appfactory.getHomeTimeline().then(function(data){
        console.log(data);
        for(var i = 0;i < data.length;i++){
            var tweet = data[i];
            var entities = tweet.entities;
            var hashtags = entities.hashtags;
            if(hashtags.length > 0){
                hashtags.map(function(hashtag){
                   used_hashtags.push(hashtag.text); 
                });
            }
        }
        console.log(used_hashtags);
    });
});