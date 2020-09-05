const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { createGame, trainArmy, transformArmy } = require("./api");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.post("/api/createGame", createGame);
app.post("/api/trainArmy", trainArmy);
app.post("/api/transformArmy", transformArmy);

app.listen(3000, () => console.log("Server running on port 3000"));
