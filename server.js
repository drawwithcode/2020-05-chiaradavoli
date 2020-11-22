console.log("node is running");

let express = require("express");

let app = express();

let port = 3000;

let server = app.listen(port);

app.use(express.static("public"));
