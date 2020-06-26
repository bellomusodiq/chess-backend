<<<<<<< HEAD
const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth')

const router = express.Router();

// GET /feed/posts
router.get('/games', isAuth, feedController.getPosts);

// POST /feed/post
router.post(
  '/game', 
  feedController.createGame
);

router.get('/post/:gameId', feedController.getGame);

router.put(
  '/post/:gameId',
  feedController.updatePost
);

router.delete('/post/:gameId', feedController.deleteGame);

module.exports = router;
=======
var express = require('express')
var router = express.Router()


module.exports = router;
>>>>>>> 13e16e174a9ba6a91ba6f54176ab78ce5f632e42
