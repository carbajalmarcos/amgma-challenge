exports.gameboardSchema = {
  id: "/Game",
  type: "object",
  properties: {
    civilizations: {
      type: "array",
      items: {
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
        required: ["name", "id"],
      },
    },
    armies: {
      type: "array",
      items: {
        properties: {
          id: { type: "string" },
          civilization: { type: "number" },
          unities: {
            type: "object",
            properties: {
              pikeman: {
                type: "object",
                properties: {
                  size: { type: "number" },
                  fp: { type: "number" },
                },
                required: ["size", "fp"],
              },
              archer: {
                type: "object",
                properties: {
                  size: { type: "number" },
                  fp: { type: "number" },
                },
                required: ["size", "fp"],
              },
              cavalier: {
                type: "object",
                properties: {
                  size: { type: "number" },
                  fp: { type: "number" },
                },
                required: ["size", "fp"],
              },
            },
          },
          balance: { type: "number" },
          battle_history: { type: "array" },
        },
        required: [
          "id",
          "civilization",
          "unities",
          "balance",
          "battle_history",
        ],
      },
    },
  },
  required: ["civilizations", "armies"],
};
exports.createGameSchema = {
  id: "/CreateGame",
  type: "object",
  properties: {
    civilizations: {
      type: "array",
      items: {
        properties: {
          id: { type: "number" },
          name: { type: "string" },
        },
        required: ["name", "id"],
      },
    },
    armies: {
      type: "array",
      items: {
        properties: {
          id: { type: "string" },
          civilization: { type: "number" },
          unities: {
            type: "object",
            properties: {
              pikeman: { type: "number" },
              archer: { type: "number" },
              cavalier: { type: "number" },
            },
          },
        },
        required: ["id", "civilization", "unities"],
      },
    },
  },
  required: ["civilizations", "armies"],
};
