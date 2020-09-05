const { create, train, transformation } = require("./services");

exports.createGame = (req, res) => {
  const data = req.body;
  //validaremos body
  const response = create(data);
  return res.json(response);
};

exports.trainArmy = (req, res) => {
  const data = req.body;
  console.log("req query :: ", req.query);
  //validate query params
  const { armyId, unity } = req.query;
  const response = train(data, armyId, unity);
  return res.json(response);
};

exports.transformArmy = (req, res) => {
  const data = req.body;
  console.log("query params ::", req.query);
  const { army, unityFrom, unityTo } = req.query;
  const response = transformation(data, army, unityFrom, unityTo);
  return res.json(response);
};
