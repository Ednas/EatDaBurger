var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var timeout = require('connect-timeout');
var morgan = require('morgan');
var fs = require('fs');
var path = require('path');

var app = express();

//Express static uses whatever domain name/public
// app.use(express.static(__dirname + '/public'));
app.use("/static", express.static("public")); //Handlebars likes this one better
// Timeout
app.use(timeout(15000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}

//Sets up morgan for logging
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// setup the logger (writes to the file)
app.use(morgan('combined', { stream: accessLogStream }));

//This sets up body-parser
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(haltOnTimedout);

//This is setting up method-override 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
app.use(haltOnTimedout);

//sets up express-handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Setting up the routes
var routes = require('./controllers/burgers_controllers.js');

app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);
app.use(haltOnTimedout);

//sets up the port as a variable and listens to it
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port %s", port));