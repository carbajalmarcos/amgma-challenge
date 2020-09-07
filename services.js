const Validator = require("jsonschema").Validator;

const {
  INITIAL_COINS,
  TRAINING_FEATURES,
  UNITY_NAME,
  TRANSFORMATIONS,
  VICTORIOUS,
  DEFEATED,
  TIE,
} = require("./utils/constants");
const { error } = require("./utils/errorUtil");
const { createGameSchema, gameboardSchema } = require("./utils/schemas");

//CREATE GAME
exports.create = (data) => {
  schemaValidation(data, createGameSchema);
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

//EXCECUTE TRAINING
exports.train = (gameBoard, armyId, unity) => {
  schemaValidation(gameBoard, gameboardSchema);
  let response = gameBoard,
    army,
    currentBalance;
  army = response.armies.find((el) => el.id === armyId);

  if (!army) error(` ${armyId} army not found ! `, "NOT_FOUND");

  currentBalance = army.balance;

  if (currentBalance < TRAINING_FEATURES[unity].cost)
    error(
      `insufficient coins, current balance of ${army.id} is ${currentBalance}`,
      "BAD_REQUEST"
    );

  let auxUnity = army.unities[unity];

  if (auxUnity.size <= 0)
    error(`${unity} unity size insufficient`, "BAD_REQUEST");

  //set training results
  auxUnity.fp = auxUnity.fp + TRAINING_FEATURES[unity].points;
  army.balance = currentBalance - TRAINING_FEATURES[unity].cost;

  return response;
};

//EXCECUTE UNITY TRANSFORMATION
exports.transformation = (gameBoard, armyId, unityFrom, unityTo) => {
  //some of validations
  schemaValidation(gameBoard, gameboardSchema);
  if (
    unityFrom === unityTo ||
    unityFrom === UNITY_NAME.cavalier ||
    (unityFrom === UNITY_NAME.cavalier && unityTo === UNITY_NAME.pikeman) ||
    (unityFrom === UNITY_NAME.pikeman && unityTo === UNITY_NAME.cavalier)
  )
    error(`invalid params`, "BAD_REQUEST");

  let response = gameBoard,
    army,
    cost_and_type =
      unityFrom === UNITY_NAME.pikeman
        ? TRANSFORMATIONS.pikeman_to_archer
        : TRANSFORMATIONS.archer_to_cavalier; //is there suficient unities for transformation?

  army = response.armies.find((el) => el.id === armyId);
  if (!army) error(` ${armyId} army not found ! `, "NOT_FOUND");

  if (!army.unities[unityFrom].size > 0)
    error(`${unityFrom} unity size insufficient`, "BAD_REQUEST");

  let currentBalance = army.balance;

  if (!currentBalance >= cost_and_type.cost)
    error(
      `insufficient coins, current balance of ${army.id} is ${currentBalance}`,
      "BAD_REQUEST"
    );

  //up to here, the transformation can be valid, lets  transform it...
  army.unities[unityFrom].size--;
  army.unities[unityTo].size++;
  army.balance = army.balance - cost_and_type.cost;
  return response;
};

//EXCECUTE BATLE
// feature commentary : in case of tie the  both armies lose the lowest scoring unit
exports.battle = (gameBoard, army1, army2) => {
  schemaValidation(gameBoard, gameboardSchema);
  let response = gameBoard,
    player1 = response.armies.find((el) => el.id === army1),
    player2 = response.armies.find((el) => el.id === army2),
    player1Scoring,
    player2Scoring;

  if (!player1) error(` ${army1} army not found ! `, "NOT_FOUND");
  if (!player2) error(` ${army2} army not found ! `, "NOT_FOUND");
  player1Scoring = scoringCalculator(player1);
  player2Scoring = scoringCalculator(player2);

  if (player1Scoring.total > player2Scoring.total) {
    //player 1 win
    player1.balance = player1.balance + 100;
    player2.unities[player2Scoring.unities[0].name].fp = 0;
    player2.unities[player2Scoring.unities[0].name].size = 0;
    player2.unities[player2Scoring.unities[1].name].fp = 0;
    player2.unities[player2Scoring.unities[1].name].size = 0;
    player1.battle_history = [
      ...player1.battle_history,
      { against: player2.id, result: VICTORIOUS, date: Date(Date.now()) },
    ];
    player2.battle_history = [
      ...player2.battle_history,
      { against: player1.id, result: DEFEATED, date: Date(Date.now()) },
    ];
  } else if (player1Scoring.total < player2Scoring.total) {
    //player 2 win
    player2.balance = player2.balance + 100;
    player1.unities[player1Scoring.unities[0].name].fp = 0;
    player1.unities[player1Scoring.unities[0].name].size = 0;
    player1.unities[player1Scoring.unities[1].name].fp = 0;
    player1.unities[player1Scoring.unities[1].name].size = 0;
    player1.battle_history = [
      ...player1.battle_history,
      { against: player2.id, result: DEFEATED, date: Date(Date.now()) },
    ];
    player2.battle_history = [
      ...player2.battle_history,
      { against: player1.id, result: VICTORIOUS, date: Date(Date.now()) },
    ];
  } else {
    //the game ended in a tie
    player1.unities[player1Scoring.unities[2].name].fp = 0;
    player1.unities[player1Scoring.unities[2].name].size = 0;
    player2.unities[player2Scoring.unities[2].name].fp = 0;
    player2.unities[player2Scoring.unities[2].name].size = 0;
    player1.battle_history = [
      ...player1.battle_history,
      { against: player2.id, result: TIE, date: Date(Date.now()) },
    ];
    player2.battle_history = [
      ...player2.battle_history,
      { against: player1.id, result: TIE, date: Date(Date.now()) },
    ];
  }

  return response;
};

const scoringCalculator = (player) => {
  let total = 0,
    response = {
      unities: [],
    };

  Object.keys(player.unities).forEach((el) => {
    let currentUnity = {};
    currentUnity["scoring"] = player.unities[el].size * player.unities[el].fp;
    currentUnity["name"] = el;

    response.unities = [...response.unities, currentUnity];

    total = total + currentUnity.scoring;
  });

  //sort by scoring
  response.unities.sort((a, b) => {
    if (a.scoring < b.scoring) {
      return 1;
    }
    if (a.scoring > b.scoring) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  return { ...response, total };
};
//validate jsonbody
const schemaValidation = (data, schema) => {
  try {
    const v = new Validator();
    v.validate(data, schema, { throwError: true });
    let civilizationsId = data.civilizations.map((el) => el.id);
    data.armies.forEach((el) => {
      if (!civilizationsId.includes(el.civilization))
        error(
          `civilization ${el.civilization} not found, error in army ${el.id}`,
          "NOT_FOUND"
        );
    });
  } catch (e) {
    error(`data error : ${e.message}`, "BAD_REQUEST");
  }
};
