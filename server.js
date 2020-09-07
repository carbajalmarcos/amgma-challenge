const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { createGame, trainArmy, transformArmy, runBattle } = require("./api");
app.use(bodyParser.json());

app.post("/api/createGame", createGame);
app.post("/api/trainArmy", trainArmy);
app.post("/api/transformArmy", transformArmy);
app.post("/api/battle", runBattle);

app.listen(3000, () => console.log("Server running on port 3000"));
