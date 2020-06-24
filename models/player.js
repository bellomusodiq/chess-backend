const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'I am New'
  },
  rating: {
      type: Nu,
      require: true
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Games'
    }
  ]
});

module.exports = mongoose.model('Player', playerSchema);
