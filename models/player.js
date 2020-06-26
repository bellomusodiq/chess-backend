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
      type: Number,
<<<<<<< HEAD
      require: true
=======
      require: true,
      default: 1200
>>>>>>> 13e16e174a9ba6a91ba6f54176ab78ce5f632e42
  },
  games: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Games'
    }
  ]
});

module.exports = mongoose.model('Player', playerSchema);
