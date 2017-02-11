angular.module('twdashboard').directive('colorTopic', function(){
    var directive = {};

    directive.restrict = 'A';

    directive.link = function(scope, element, attributes) {
        
        var volume = attributes.colorTopic;
        console.log(volume);
        element.css('background-color',shadeColor2(scope.activeColor, ((1-volume)/scope.highestVolume)*0.5 )); 
        

    };
    
    function shadeColor2(color, percent) {   
        var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }

    return directive;
    
});