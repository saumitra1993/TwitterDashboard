var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session')
var path = require('path');
var redis   = require("redis");
var redisStore = require('connect-redis')(session);
var client  = redis.createClient();
var sassMiddleware = require('node-sass-middleware');
var Flutter = require('flutter');
var access_token;
var secret;

var flutter = new Flutter({
  consumerKey: 'BMWdpobothenelY8as7eIXmHN',
  consumerSecret: 'ZKFHzk0NBOhcv4F4zH2VXku7zEUTFU8zcRfqFF5xix1EqDgLyu',
  loginCallback: 'https://c0d57269.ngrok.io/twitter/callback',
  debug: function(msg){
      console.log(msg);
  },
  connectCallback: function(req, res){
      
  },
  authCallback: function(req, res) {
    if (req.error) {
        console.log(req.error);
      // Authentication failed, req.error contains details
      return;
    }
    console.log(req.results);
    console.log("Authentication successful!");
    accessToken = req.session.oauthAccessToken;
    secret = req.session.oauthAccessTokenSecret;

    // Store away oauth credentials here

    // Redirect user back to your app
    res.redirect('/#!/dashboard/'+req.results.screen_name);
  }
});

var app = module.exports = express();

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
  saveUninitialized: true,
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
}))

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(sassMiddleware({
     src: __dirname + '/sass', 
     dest: __dirname + '/public/stylesheets',
     prefix:  '/stylesheets',
     debug: true,         
 })
);  

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function (req, res) {
  res.render('index');
});

app.get('/twitter/connect', flutter.connect);


app.get('/twitter/callback', flutter.auth);

app.get('/twitter/timeline', function(req,res){
    
    var query_obj = {};
    var count = req.query.count;
    var max_id = req.query.max_id;
    
    query_obj['count'] = count;
    if(max_id != null){
        query_obj['max_id'] = max_id;
    }
    console.log(query_obj);
    flutter.API.fetch('statuses/home_timeline.json',query_obj, accessToken, secret, function(err, results) {
      res.json(results); // { statuses: [ { ...etc } ] }
    });
    
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
});
