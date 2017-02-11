angular.module("twdashboard").controller("dashboardController", function($scope,appfactory,$q,$routeParams, $moment){
    
    var used_hashtags = {};
    $scope.showLoader = true;
    $scope.fetchMoreText = "Fetch older";
    
    $scope.activeColor = '#f48000';
    $scope.highestVolume = 0;
    
    appfactory.screen_name = $routeParams.screen_name;
    
    appfactory.getHomeTimeline().then(processData);
    
    $scope.fetchOlder = function(){
        $scope.fetchMoreText = "Fetching.. Bup Bop..";
        appfactory.getHomeTimeline().then(processData);
    };
    
    $scope.units = [];     //Unit determines the granularity of table
    
    $scope.unitDuration = 1;                   // in hours
    
    $scope.getTopicThisUnit = function(unit, duration){
        var unit_hashtags = {};
        for (var hashtag in used_hashtags) {
          if (used_hashtags.hasOwnProperty(hashtag)) {
              var tweets = used_hashtags[hashtag];
              
              for(var j = 0;j<tweets.length;j++){
                  var tweet = tweets[j];
                  var formatted_created_at = moment(tweet.created_at, "ddd MMM DD HH:mm:ss Z YYYY");
                  var unit_start_date_obj = moment(unit);
                  var unit_end_date_obj = moment(unit).add(duration, 'hours');
                  if(formatted_created_at > unit_start_date_obj && formatted_created_at <= unit_end_date_obj){
                        if (unit_hashtags.hasOwnProperty(hashtag)) {
                            unit_hashtags[hashtag] += 1 ;      
                        }
                        else{
                            
                            unit_hashtags[hashtag] = 1;
                        }
                  }
              }
          }
        }
        console.log(unit_hashtags);
        return unit_hashtags;
    };
    
    $scope.getFormattedUnit = function(unit){
        return $moment(unit).format('h a') + " - " + moment(unit).add($scope.unitDuration, 'hours').format('h a');  
    };
    
    function processData(data){
        console.log(data);
        $scope.last_tweet_datetime = moment(data[data.length - 1].created_at, "ddd MMM DD HH:mm:ss Z YYYY");
        console.log($scope.last_tweet_datetime);
        
        var now = moment();
        $scope.units = appfactory.getHourMarks($scope.unitDuration, $scope.last_tweet_datetime, now);
        
        if($scope.units.length > 8){
            $scope.unitDuration *= 2;
            $scope.units = appfactory.getHourMarks($scope.unitDuration, $scope.last_tweet_datetime, now);
        }
        
        $scope.last_tweet_datetime = $scope.last_tweet_datetime.format("dddd, MMM Do, h:mm a");
        
        for(var i = 0;i < data.length;i++){
            var tweet = data[i];
            var entities = tweet.entities;
            var hashtags = entities.hashtags;
            if(hashtags.length > 0){
                hashtags.map(function(hashtag){
                    try{
                        used_hashtags[hashtag.text].push(tweet) ;      
                    }
                    catch(err){
                        used_hashtags[hashtag.text] = [tweet];
                    }
                });
            }
        }
        for (var hashtag in used_hashtags) {
          if (used_hashtags.hasOwnProperty(hashtag)) {
              var tweets = used_hashtags[hashtag];
              if(tweets.length > $scope.highestVolume){
                $scope.highestVolume = tweets.length;
              }
          }
        }
        
        $scope.showLoader = false;
        $scope.fetchMoreText = "Fetch older";
        console.log(used_hashtags);
    }
});