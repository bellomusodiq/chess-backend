const mongoose = require('mongoose');
const Player = require('./player');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  whitePlayer: {
    type: Schema.Types.ObjectId,
    ref: Player
  },
  blackPlayer: {
    type: Schema.Types.ObjectId,
    ref: Player
  },
  turn: {
    type: String,
    default: 'W',
    required: true
  },
  moves: {
    type: [String],
    required: true,
    default: []
    // still don't understand
  },
  pieces: {
    type: String,
    default: `
    {
      "0": {
        "color": "B",
        "id": "BR1",
        "alias": "R",
        "position": 0,
        "coordinates": "1,1",
        "piece": {
          "icon": "fas fa-chess-rook",
          "color": "black"
        }
      },
      "1": {
        "color": "B",
        "id": "BN1",
        "alias": "N",
        "position": 1,
        "coordinates": "1,2",
        "piece": {
          "icon": "fas fa-chess-knight",
          "color": "black"
        }
      },
      "2": {
        "color": "B",
        "id": "BB1",
        "alias": "B",
        "position": 2,
        "coordinates": "1,3",
        "piece": {
          "icon": "fas fa-chess-bishop",
          "color": "black"
        }
      },
      "3": {
        "color": "B",
        "id": "BQ",
        "alias": "Q",
        "position": 3,
        "coordinates": "1,4",
        "piece": {
          "icon": "fas fa-chess-queen",
          "color": "black"
        }
      },
      "4": {
        "color": "B",
        "id": "BK",
        "alias": "K",
        "position": 4,
        "coordinates": "1,5",
        "piece": {
          "icon": "fas fa-chess-king",
          "color": "black"
        }
      },
      "5": {
        "color": "B",
        "id": "BB2",
        "alias": "B",
        "position": 5,
        "coordinates": "1,6"
      },
      "6": {
        "color": "B",
        "id": "BN2",
        "alias": "N",
        "position": 6,
        "coordinates": "1,7"
      },
      "7": {
        "color": "B",
        "id": "BR2",
        "alias": "R",
        "position": 7,
        "coordinates": "1,8"
      },
      "8": {
        "color": "B",
        "id": "BP1",
        "alias": "",
        "position": 8,
        "coordinates": "2,1",
        "piece": {
          "icon": "fas fa-chess-pawn",
          "color": "black"
        }
      },
      "9": {
        "color": "B",
        "id": "BP2",
        "alias": "",
        "position": 9,
        "coordinates": "2,2"
      },
      "10": {
        "color": "B",
        "id": "BP3",
        "alias": "",
        "position": 10,
        "coordinates": "2,3"
      },
      "11": {
        "color": "B",
        "id": "BP4",
        "alias": "",
        "position": 11,
        "coordinates": "2,4"
      },
      "12": {
        "color": "B",
        "id": "BP5",
        "alias": "",
        "position": 12,
        "coordinates": "2,5"
      },
      "13": {
        "color": "B",
        "id": "BP6",
        "alias": "",
        "position": 13,
        "coordinates": "2,6"
      },
      "14": {
        "color": "B",
        "id": "BP7",
        "alias": "",
        "position": 14,
        "coordinates": "2,7"
      },
      "15": {
        "color": "B",
        "id": "BP8",
        "alias": "",
        "position": 15,
        "coordinates": "2,8"
      },
      "48": {
        "color": "W",
        "id": "WP1",
        "alias": "",
        "position": 48,
        "coordinates": "7,1",
        "piece": {
          "icon": "fas fa-chess-pawn",
          "color": "white"
        }
      },
      "49": {
        "color": "W",
        "id": "WP2",
        "alias": "",
        "position": 49,
        "coordinates": "7,2"
      },
      "50": {
        "color": "W",
        "id": "WP3",
        "alias": "",
        "position": 50,
        "coordinates": "7,3"
      },
      "51": {
        "color": "W",
        "id": "WP4",
        "alias": "",
        "position": 51,
        "coordinates": "7,4"
      },
      "52": {
        "color": "W",
        "id": "WP5",
        "alias": "",
        "position": 52,
        "coordinates": "7,5"
      },
      "53": {
        "color": "W",
        "id": "WP6",
        "alias": "",
        "position": 53,
        "coordinates": "7,6"
      },
      "54": {
        "color": "W",
        "id": "WP7",
        "alias": "",
        "position": 54,
        "coordinates": "7,7"
      },
      "55": {
        "color": "W",
        "id": "WP8",
        "alias": "",
        "position": 55,
        "coordinates": "7,8"
      },
      "56": {
        "color": "W",
        "id": "WR2",
        "alias": "R",
        "position": 56,
        "coordinates": "8,1",
        "piece": {
          "icon": "fas fa-chess-rook",
          "color": "white"
        }
      },
      "57": {
        "color": "W",
        "id": "WN2",
        "alias": "N",
        "position": 57,
        "coordinates": "8,2",
        "piece": {
          "icon": "fas fa-chess-knight",
          "color": "white"
        }
      },
      "58": {
        "color": "W",
        "id": "WB2",
        "alias": "B",
        "position": 58,
        "coordinates": "8,3",
        "piece": {
          "icon": "fas fa-chess-bishop",
          "color": "white"
        }
      },
      "59": {
        "color": "W",
        "id": "WQ",
        "alias": "Q",
        "position": 59,
        "coordinates": "8,4",
        "piece": {
          "icon": "fas fa-chess-queen",
          "color": "white"
        }
      },
      "60": {
        "color": "W",
        "id": "WK",
        "alias": "K",
        "position": 60,
        "coordinates": "8,5",
        "piece": {
          "icon": "fas fa-chess-king",
          "color": "white"
        }
      },
      "61": {
        "color": "W",
        "id": "WB1",
        "alias": "B",
        "position": 61,
        "coordinates": "8,6"
      },
      "62": {
        "color": "W",
        "id": "WN1",
        "alias": "N",
        "position": 62,
        "coordinates": "8,7"
      },
      "63": {
        "color": "W",
        "id": "WR1",
        "alias": "R",
        "position": 63,
        "coordinates": "8,8"
      }
    }
    `
  },
  status: {
    type: String,
    default: 'ongoing',
    enum: ['ongoing', 'white-wins', 'black-wins', 'draw']
  },
  // result: {
  //   type: Schema.Types.ObjectId,
  //   ref: Player  // why ?
  //   // Something like 
  // }
});

module.exports = mongoose.model('Game', gameSchema);
