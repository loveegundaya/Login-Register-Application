const express = require("express");
const controller = require('./controller')
const port = 8000;

const app = express();
app.use(express.json());

controller(app);

app.listen(port, () => {
    console.log("Server running at port: ", port);
});