// create db var to allow requests to use database
var db

//require bodyParser, a middleware that changes req or res object before being handled by server
const bodyParser= require('body-parser')

//require express framework
// for more on const vs var, read here: 
// https://medium.com/javascript-scene/javascript-es6-var-let-or-const-ba58b8dcde75#.3wwcgejjc
const express = require('express')
const app = express()

//The urlencoded method within body-parser allows body-parser to extract data from the <form> element and add them to the body property in the request object.
app.use(bodyParser.urlencoded({extended: true}))
//allow server to receive json data
app.use(bodyParser.json())
//tell express to make the following folder accessible to public
app.use(express.static('public'))

//tell express to use ejs as view engine
app.set('view engine', 'ejs')

//connect to Mongo
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://james:james@ds151697.mlab.com:51697/car-maintenance', (err, database) => {
  // create server for browser to connect to (after mongo is connected)
	if (err) return console.log(err)
	db = database
	app.listen(3000, function() {
		console.log('listening on 3000')
	})
})

// create write method for new interval route
app.post('/intervals', (req, res) => {
	//simultaneously create and save intervals collection in mongo db
  db.collection('intervals').save(req.body, (err, result) => {
    if (err) return console.log(err)
    res.redirect('/')
  })
})

// send response for root directory route 
// using ES6 convention
app.get('/', (req, res) => {
	// find all documents in collection
  db.collection('intervals').find().toArray((err, result) => { 
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {intervals: result})
  })
})


//handle delete request from main.jss
app.delete('/intervals', (req, res) => {
	db.collection('intervals').findOneAndDelete(
		{ service: req.body.service,
  	intervalMiles: req.body.intervalMiles,
  	intervalMonths: req.body.intervalMonths,
  	firstOrLast: req.body.firstOrLast},
  (err, result) => {
    if (err) return res.send(500, err)
		res.json('all good')
  })
})