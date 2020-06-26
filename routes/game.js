const express = require('express');
const { body } = require('express-validator/check');

const gameController = require('../controllers/game');
// const isAuth = require('../middleware/is-auth')

const router = express.Router();


router.get('/games', gameController.getGames)


router.post(
  '/game', 
  gameController.createGame
);

router.get('/game/:gameId', gameController.getGame);

module.exports = router;
