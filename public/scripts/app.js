angular.module('twdashboard', ['ngRoute','ui.bootstrap','ngAnimate','angular-momentjs'])
.config(function($locationProvider,$routeProvider){
    
    $routeProvider
    .when('/',                                      
    {controller:'connectController',
    templateUrl:'templates/connect.html'})

    .when('/dashboard/:screen_name',                                      
    {controller:'dashboardController',
    templateUrl:'templates/dashboard.html'})
    


    .otherwise({
       redirectTo: '/'
    });
});

