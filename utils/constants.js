exports.TIE = "tie";
exports.DEFEATED = "defeated";
exports.VICTORIOUS = "victorious";
exports.INITIAL_COINS = 1000;

exports.INITIAL_FORCE_POINT_APORTED = {
  pikeman: 5,
  archer: 10,
  cavalier: 20,
};

exports.UNITY_NAME = {
  pikeman: "pikeman",
  archer: "archer",
  cavalier: "cavalier",
};
exports.TRAINING_FEATURES = {
  pikeman: { cost: 10, points: 3 },
  archer: { cost: 20, points: 7 },
  cavalier: { cost: 30, points: 10 },
};

exports.TRANSFORMATIONS = {
  pikeman_to_archer: {
    cost: 30,
    tyoe: "pikeman_to_archer",
  },
  archer_to_cavalier: {
    cost: 40,
    type: "archer_to_cavalier",
  },
};
