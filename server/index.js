const express = require("express");
const bodyParser = require("body-parser");
const Route = require('./route')
const port = 9000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Route(app);

app.listen(port, () => {
    console.log("Server running at port: ", port);
});