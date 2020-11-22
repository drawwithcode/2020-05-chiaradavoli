console.log("node is running");

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = 3000;

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server);

io.on("connection", newConnection);

function newConnection(socket) {
  console.log("new connection: " + socket.client.id);
}
