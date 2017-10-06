//dependencies
var express = require("express");
var path = require("path");
var session = require("express-session");
var bodyParser = require("body-parser");
//creates express app
var app = express();

//handles POST data
app.use(bodyParser.urlencoded({ extended: true }));
//handles static content
app.use(express.static(path.join(__dirname, "./static")));
//handles session
app.use(session({ secret: 'keepitsecretkeepitsafe'}));

//for ejs use and views
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');


//root route for .ejs files
app.get('/', function(req, res) {
	if(!req.session.count) {
		req.session.count = 1;
	} else {
		req.session.count++;
	}
	res.render('index', {count: req.session.count});
	console.log(req.session.count);
});

//route for additional +1 count
app.post('/plus', function(req, res) {
	req.session.count++;
	res.redirect('/');
});

//route to reset count
app.post('/reset', function(req, res) {
	req.session.count = 0;
	res.redirect('/');
});

//which port for express to listen on
app.listen(8000, function() {
	console.log('listening on port 8000, like a boss');
});