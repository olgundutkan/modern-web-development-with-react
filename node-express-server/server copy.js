var express = require('express');
var cors = require('cors');
var app = express();
var port = 8080;

var bodyParser = require('body-parser');

var clients = require('./db/clients');

app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
app.use((req, res, next) => {
    setTimeout(() => next(), 900);
});
// start the server
app.listen(port, function() {
  console.log('app started');
});

// route our app
app.get('/', function(req, res) {
  res.status(200).send("Welcome to my express server");
});
app.get('/clients', function(req, res) {
    res.status(200).send(clients.data);
});
app.post('/clients/create', function(req, res) {
    clients.add(req.query);
    res.status(200).send(clients.data);
});
app.get('/clients/:clientID', function(req, res) {
    try {
        res.status(200).send(clients.getItem(parseInt(req.params.clientID)));
    } catch {
        res.status(404).send({error: `Can not found id ${req.params.clientID}`});
    }
});
app.delete('/clients/:clientID', function(req, res) {
    try {
        clients.delete(parseInt(req.params.clientID));
        res.status(200).send(clients.data);
    } catch {
        res.status(404).send({error: `Can not found id ${req.params.clientID}`});
    }
});