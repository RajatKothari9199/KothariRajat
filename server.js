require('./models/db');

const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const expressHandlebars = require('express-handlebars');

const internsController = require('./controller/internsController');

var app = express();

//configure middleware

app.use(bodyParser.urlencoded({
	extended : true
}));

app.use(bodyParser.json()); // it will be converting all the request data to JSON format

// configure views

app.set('views',path.join(__dirname,'/views/'))

app.engine('hbs',expressHandlebars({
	extname:'hbs',
	defaultLayout:'mainLayout',
	layoutsDir:__dirname + '/views/layouts/'
}))

app.set('view engine','hbs'); // successfully configured the express handlebars



app.listen(5000,() => {
	console.log("Server is listening to port 5000");
})

// configuring the route for home route

/*app.get('/',(req,res) => {
	res.send("<h1>Hello Platify</h1>");
})*/

app.use('/interns',internsController);