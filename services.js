const {
  INITIAL_COINS,
  TRAINING_FEATURES,
  UNITY_NAME,
  TRANSFORMATIONS,
} = require("./utils/constants");
exports.create = (data) => {
  let response = data;
  response.armies.forEach((el) => {
    el.balance = INITIAL_COINS;
    el.battle_history = [];
    el.unities.pikeman = { size: el.unities.pikeman, fp: 5 };
    el.unities.archer = { size: el.unities.archer, fp: 10 };
    el.unities.cavalier = { size: el.unities.cavalier, fp: 20 };
  });
  return response;
};
exports.train = (gameBoard, armyId, unity) => {
  let response = gameBoard;
  //balance validations
  let army = response.armies.find((el) => (el.id = armyId));
  let currentBalance = army.balance;

  if (!currentBalance >= TRAINING_FEATURES[unity].cost)
    throw Error(
      `insufficient coins, current balance of ${army.id} is ${currentBalance}`
    );

  let auxUnity = army.unities[unity];

  if (auxUnity.size > 0) throw Error(`${unity} unity size insufficient`);

  //set training results
  auxUnity.fp = auxUnity.fp + TRAINING_FEATURES[unity].points;
  army.balance = currentBalance - TRAINING_FEATURES[unity].cost;
  return response;
};
exports.transformation = (gameBoard, armyId, unityFrom, unityTo) => {
  //some of validations
  if (
    unityFrom === unityTo ||
    unityFrom === UNITY_NAME.cavalier ||
    (unityFrom === UNITY_NAME.cavalier && unityTo === UNITY_NAME.pikeman) ||
    (unityFrom === UNITY_NAME.pikeman && unityTo === UNITY_NAME.cavalier)
  )
    throw Error("Invalid params ");

  let response = gameBoard;
  let army = response.armies.find((el) => (el.id = armyId));

  let cost_and_type =
    unityFrom === UNITY_NAME.pikeman
      ? TRANSFORMATIONS.pikeman_to_archer
      : TRANSFORMATIONS.archer_to_cavalier; //is there suficient unities for transformation?

  if (!army.unities[unityFrom].size > 0)
    throw Error(`${unityFrom} unity size insufficient`);

  let currentBalance = army.balance;

  if (!currentBalance >= cost_and_type.cost)
    throw Error(
      `insufficient coins, current balance of ${army.id} is ${currentBalance}`
    );

  //up to here, the transformation can be valid, lets  transform it...
  army.unities[unityFrom].size--;
  army.unities[unityTo].size++;
  army.balance = army.balance - cost_and_type.cost;
  return response;
};
