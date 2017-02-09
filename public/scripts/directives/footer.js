angular.module('twdashboard').directive('footerCustom', function(){
    return {
        restrict: 'E',
        templateUrl:'templates/footer.html',
        controller:'footerController'
        
    };
    
});