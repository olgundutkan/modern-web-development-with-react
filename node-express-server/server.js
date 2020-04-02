var express = require("express");
var cors = require("cors");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

var port = 8080;

var bodyParser = require("body-parser");

var clients = require("./db/clients");

app.use(cors());
app.options('*', cors());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.use((req, res, next) => {
  setTimeout(() => next(), 900);
});
// start the server
app.listen(port, function() {
  console.log("app started");
});

// route our app
app.get("/", function(req, res) {
  res
    .status(200)
    .send({ message: "Welcome to my express server" });
});
app.get("/clients", function(req, res) {
  res.status(200).send(clients.data);
});
// app.post("/clients/create", function(req, res) {
//   clients.add(req.query);
//   res.status(200).send(clients.data);
// });

app.get("/clients/:clientID", function(req, res) {
  try {
    res.status(200).send(clients.getItem(req.params.clientID));
  } catch {
    res.status(404).send({ error: `Can not found id ${req.params.clientID}` });
  }
});

app.delete("/clients/:clientID", function(req, res) {
  try {
    clients.delete(req.params.clientID);
    res.status(200).send(clients.data);
  } catch {
    res.status(404).send({ error: `Can not found id ${req.params.clientID}` });
  }
});

app.put("/clients/:clientID", function(req, res) {
  try {
    const client = clients.updateItem(req.params.clientID, req.body);
    res.status(200).send(client);
    io.emit("clientUpdated", client);
  } catch {
    res.status(404).send({ error: `Can not found id ${req.params.clientID}` });
  }
});

server.listen(3001);



io.on("connection", function(socket) {

  socket.on("clientConnection", function (data) {
    const client = clients.addClient(socket.id);
    socket.emit("currentClientConnected", client);
    socket.broadcast.emit("clientConnected", client);
  });

  socket.on("clientDisconnect", function (data) {
    try {
      const client = clients.getItem(data.id);
      if (client) {
        clients.delete(data.id);
        socket.broadcast.emit("clientDisconnected", client);
        socket.disconnect();
      }
    } catch (e) {
      return null
    }
  });

  socket.on("clientMoveOnBoard", function (client) {
    const updatedClient = clients.updateItem(client.id, client.position);
    // socket.emit("clientDraggingOnBoard", updatedClient);
    socket.broadcast.emit("clientDraggingOnBoard", updatedClient);
  });

});
