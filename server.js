var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();

//Express static uses whatever domain name/public
app.use(express.static(__dirname + '/public'));

//This sets up body-parser
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
//This is setting up method-override 
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
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


//sets up the port as a variable and listens to it
var port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port %s", port));