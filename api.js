const { create, train, transformation, battle } = require("./services");
const { error } = require("./utils/errorUtil");

exports.createGame = (req, res) => {
  try {
    const data = req.body;
    //validaremos body
    const response = create(data);
    return res.json(response);
  } catch (e) {
    if (e.code)
      return res.status(e.code).json({
        error: e.message,
      });
    return res.json({ message: e.message });
  }
};

exports.trainArmy = (req, res) => {
  try {
    const data = req.body;
    //validate query params
    const { army, unity } = req.query;

    if (!army || !unity)
      error("invalid params... params must be army,unity ", "BAD_REQUEST");
    const response = train(data, army, unity);
    return res.json(response);
  } catch (e) {
    if (e.code)
      return res.status(e.code).json({
        error: e.message,
      });
    return res.json({ message: e.message });
  }
};

exports.transformArmy = (req, res) => {
  try {
    const data = req.body;
    const { army, unityFrom, unityTo } = req.query;
    if (!army || !unityFrom || !unityTo)
      error(
        "invalid params... params must be army, unityFrom, unityTo ",
        "BAD_REQUEST"
      );

    const response = transformation(data, army, unityFrom, unityTo);
    return res.json(response);
  } catch (e) {
    if (e.code)
      return res.status(e.code).json({
        error: e.message,
      });
    return res.json({ message: e.message });
  }
};

exports.runBattle = (req, res) => {
  try {
    const data = req.body;
    const { army1, army2 } = req.query;
    if (!army1 || !army2)
      error("invalid params... params must be army1,army2 ", "BAD_REQUEST");

    const response = battle(data, army1, army2);
    return res.json(response);
  } catch (e) {
    if (e.code)
      return res.status(e.code).json({
        error: e.message,
      });
    return res.json({ message: e.message });
  }
};
