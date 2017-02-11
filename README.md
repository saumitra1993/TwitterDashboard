# TwitterDashboard

Design goals - 

    1) To create a view that is zoomable i.e. can be seen with increased or decreased granularity of time durations at will of the user. 
    2) The dashboard is so designed that the time durations can be entirely configured. Currently, they adjust automatically according to the number of rows.
    3) Each topic can be clicked to see the tweets written with that hashtag. 
    4) One can click on fetch more and see topics from older tweets as well. 
    
**Implementation - Server side -** 

Let's start with "app.js" file -

    1) It sets up a simple ExpressJS server running atop NodeJS. It also has a SASS middleware
    that copies stylesheets present at /sass, compiles it and puts the result at public/stylesheets. 

    2) It sets up the root URL and returns the file "index.ejs" present inside views folder. EJS is just used to support the 
    rendering engine supported by Express and is a simple HTML file.

    3) It has all the routes that the app supports, including requesting access tokens and oauth tokens and finally fetching the timeline.



Now, let's go to "index.ejs" present inside the views folder -

    1) It bootstraps up the Angular webapp with the ng-app directive. 

    2) The markup has three tags - 

        1) navbar - It's a custom directive that has its own controller at public/scripts/controllers/navController.js and 
                    template at public/templates/navbar.html.

        2) ng-view - It's the container where the routes are dynamically injected as the user navigates across the site. Go to the file public/scripts/app.js. This file decides which template and controller will be injected depending on the  route.

        3) footer-custom - Another custom directive with controller at public/scripts/controllers/footerController.js and template at public/templates/footer.html


From "public/scripts/app.js", all the different routes and their respective controllers can be traced.

Let's go to the "sass" folder -

    1) The file "styles.scss" applies custom sass to used elements.
    
Libraries used - 

    1) Bootstrap (for common UI elements)
    2) Angular.JS
    3) Moment.JS (for date related operations)
    4) Angular UI (for modal and popover supported by Angular)
    
    
Future refinements - 

    1) Scroll bar or zoom action that lets user vary the time duration with which the topics are shown.
    2) Logout functionality.(Easily doable)
    3) Responsive design. 
    4) Handling timeout errors and situation when the user denies permission to the app.
    
