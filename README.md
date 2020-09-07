# Army challenge

## Installation

- clone this repo
- cd folder container
- npm install
- npm start

### Create game :stuck_out_tongue_winking_eye:

POST /api/createGame

##### Example

Request:

```sh
curl --location --request POST 'http://localhost:3000/api/createGame' \
--header 'Content-Type: application/json' \
--data-raw '{
  "civilizations": [
    { "id": 1, "name": "civil 1" },
    { "id": 2, "name": "civil 2" }
  ],
  "armies": [
    {
      "id": "bizantino",
      "civilization": 1,
      "unities": {
        "pikeman": 5,
        "archer": 2,
        "cavalier": 10
      }
    },
    {
      "id": "ingleses",
      "civilization": 1,
      "unities": {
        "pikeman": 5,
        "archer": 2,
        "cavalier": 10
      }
    },
    {
      "id": "chinos",
      "civilization": 2,
      "unities": {
        "pikeman": 5,
        "archer": 2,
       "cavalier": 10
      }
    }
  ]
}'
```

Response:

```json
{
  "civilizations": [
    {
      "id": 1,
      "name": "civil 1"
    },
    {
      "id": 2,
      "name": "civil 2"
    }
  ],
  "armies": [
    {
      "id": "bizantino",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    },
    {
      "id": "ingleses",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    },
    {
      "id": "chinos",
      "civilization": 2,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    }
  ]
}
```

### Train army :muscle:

POST /api/trainArmy?army={army}&unity={unity}

##### Example

Request:

```sh
curl --location --request POST 'http://localhost:3000/api/trainArmy?armyId=ingleses&unity=pikeman' \
--header 'Content-Type: application/json' \
--data-raw '{
    "civilizations": [
        {
            "id": 1,
            "name": "civil 1"
        },
        {
            "id": 2,
            "name": "civil 2"
        }
    ],
    "armies": [
        {
            "id": "bizantino",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        },
        {
            "id": "ingleses",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        },
        {
            "id": "chinos",
            "civilization": 2,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        }
    ]
}'
```

Response:

```json
{
  "civilizations": [
    {
      "id": 1,
      "name": "civil 1"
    },
    {
      "id": 2,
      "name": "civil 2"
    }
  ],
  "armies": [
    {
      "id": "bizantino",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    },
    {
      "id": "ingleses",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 8
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 990,
      "battle_history": []
    },
    {
      "id": "chinos",
      "civilization": 2,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    }
  ]
}
```

### Transform army :factory:

POST /api/transformArmy?army={army}&unityFrom={unityFrom}&unityTo={unityTo}

##### Example

Request:

```sh
curl --location --request POST 'http://localhost:3000/api/transformArmy?army=ingleses&unityFrom=pikeman&unityTo=archer' \
--header 'Content-Type: application/json' \
--data-raw '{
    "civilizations": [
        {
            "id": 1,
            "name": "civil 1"
        },
        {
            "id": 2,
            "name": "civil 2"
        }
    ],
    "armies": [
        {
            "id": "bizantino",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        },
        {
            "id": "ingleses",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 8
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 990,
            "battle_history": []
        },
        {
            "id": "chinos",
            "civilization": 2,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        }
    ]
}'
```

Response:

```json
{
  "civilizations": [
    {
      "id": 1,
      "name": "civil 1"
    },
    {
      "id": 2,
      "name": "civil 2"
    }
  ],
  "armies": [
    {
      "id": "bizantino",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    },
    {
      "id": "ingleses",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 4,
          "fp": 8
        },
        "archer": {
          "size": 3,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 960,
      "battle_history": []
    },
    {
      "id": "chinos",
      "civilization": 2,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    }
  ]
}
```

### Run battle :fire:

POST /api/battle?army1={army1}&army2={army2}

##### Example

Request:

```sh
curl --location --request POST 'http://localhost:3000/api/battle?army1=ingleses&army2=chinos' \
--header 'Content-Type: application/json' \
--data-raw '{
    "civilizations": [
        {
            "id": 1,
            "name": "civil 1"
        },
        {
            "id": 2,
            "name": "civil 2"
        }
    ],
    "armies": [
        {
            "id": "bizantino",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        },
        {
            "id": "ingleses",
            "civilization": 1,
            "unities": {
                "pikeman": {
                    "size": 4,
                    "fp": 8
                },
                "archer": {
                    "size": 3,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 960,
            "battle_history": []
        },
        {
            "id": "chinos",
            "civilization": 2,
            "unities": {
                "pikeman": {
                    "size": 5,
                    "fp": 5
                },
                "archer": {
                    "size": 2,
                    "fp": 10
                },
                "cavalier": {
                    "size": 10,
                    "fp": 20
                }
            },
            "balance": 1000,
            "battle_history": []
        }
    ]
}'
```

Response:

```json
{
  "civilizations": [
    {
      "id": 1,
      "name": "civil 1"
    },
    {
      "id": 2,
      "name": "civil 2"
    }
  ],
  "armies": [
    {
      "id": "bizantino",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 5,
          "fp": 5
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1000,
      "battle_history": []
    },
    {
      "id": "ingleses",
      "civilization": 1,
      "unities": {
        "pikeman": {
          "size": 4,
          "fp": 8
        },
        "archer": {
          "size": 3,
          "fp": 10
        },
        "cavalier": {
          "size": 10,
          "fp": 20
        }
      },
      "balance": 1060,
      "battle_history": [
        {
          "against": "chinos",
          "result": "victorious",
          "date": "Mon Sep 07 2020 00:18:36 GMT-0300 (Argentina Standard Time)"
        }
      ]
    },
    {
      "id": "chinos",
      "civilization": 2,
      "unities": {
        "pikeman": {
          "size": 0,
          "fp": 0
        },
        "archer": {
          "size": 2,
          "fp": 10
        },
        "cavalier": {
          "size": 0,
          "fp": 0
        }
      },
      "balance": 1000,
      "battle_history": [
        {
          "against": "ingleses",
          "result": "defeated",
          "date": "Mon Sep 07 2020 00:18:36 GMT-0300 (Argentina Standard Time)"
        }
      ]
    }
  ]
}
```

## ToDo!

- Testing
- Data persistance
