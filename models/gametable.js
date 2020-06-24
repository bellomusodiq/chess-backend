const mongoose = require('mongoose');
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
  moves: {
    type: String,
    required: true 
    // still don't understand
  },
  status: {
    type: String,
    default: 'I am New'
  },
  result: {
    type: Schema.Types.ObjectId,
    ref: Player
    // Something like this?
  },
  game: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Games'
    }
  ]
});

module.exports = mongoose.model('Game', gameSchema);
