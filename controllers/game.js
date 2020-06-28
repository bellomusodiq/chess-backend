// const fs = require('fs');
// const path = require('path');

const { validationResult } = require('express-validator/check');

const Game = require('../models/game');
const Player = require('../models/player');


exports.getGames = (req, res, next) => {
  const currentPage = req.query.page || 1;   //Pagination, 2 games per game, what does front end say ?
  const perPage = 2;
  let totalItems;                  
  Game.find()
    .countDocuments() 
    .then(count => {
      totalItems = count;
      return Game.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then(games => {
      res
        .status(200)
        .json({
          message: 'Fetched games successfully.',
          games: games,
          totalItems: totalItems
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createGame = (req, res, next) => {
  const errors = validationResult(req);  //do we need to validate anything 
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error;
  }
  const whitePlayer = req.body.whitePlayer  
  const blackPlayer = req.body.blackPlayer
  const game = new Game({
    whitePlayer: whitePlayer,
    blackPlayer: blackPlayer
  });
  game
    .save()
    .then(result => {
      return Player.findById(req.playerId); //the logic to find other player to save too will be added
    })
    .then(player => {
      whitePlayer = player;
      player.games.push(game);
      return player.save();
    })
    .then(result =>
      res.status(201).json({
      message: 'Game created successfully!' // plus whatever you need for F.E
     
    })
    )
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getGame = (req, res, next) => {
  const gameId = req.params.gameId;
  Game.findById(gameId)
    .then(game => {
      if (!game) {
        const error = new Error('Could not find game.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Game fetched' });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

// exports.updatePost = (req, res, next) => {
//   const gameId = req.params.postId;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     const error = new Error('Validation failed, entered data is incorrect.');
//     error.statusCode = 422;
//     throw error;
//   }
//   const title = req.body.title;
//   const content = req.body.content;
//   let imageUrl = req.body.image;
//   if (req.file) {
//     imageUrl = req.file.path.replace('\\', '/');;
//   }
//   if (!imageUrl) {
//     const error = new Error('No file picked.');
//     error.statusCode = 422;
//     throw error;
//   }
//   Post.findById(postId)
//     .then(post => {
//       if (!post) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }
//       if(post.creator.toString() !== req.userId){
//         const error = new Error('Not Authorized');
//         error.statusCode = 403;
//         throw error;
//       }
//       if (imageUrl !== post.imageUrl) {
//         clearImage(post.imageUrl);
//       }
//       post.title = title;
//       post.imageUrl = imageUrl;
//       post.content = content;
//       return post.save();
//     })
//     .then(result => {
//       res.status(200).json({ message: 'Post updated!', post: result });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// exports.deletePost = (req, res, next) => {
//   const postId = req.params.postId;
//   Post.findById(postId)
//     .then(post => {
//       if (!post) {
//         const error = new Error('Could not find post.');
//         error.statusCode = 404;
//         throw error;
//       }
//       if(post.creator.toString() !== req.userId){
//         const error = new Error('Not Authorized');
//         error.statusCode = 403;
//         throw error;
//       }
//       clearImage(post.imageUrl);
//       return Post.findByIdAndRemove(postId);
//     })
//     .then(result => {
//       console.log(result);
//       res.status(200).json({ message: 'Deleted post.' });
//     })
//     .catch(err => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       next(err);
//     });
// };

// const clearImage = filePath => {
//   filePath = path.join(__dirname, '..', filePath);
//   fs.unlink(filePath, err => console.log(err));
// };
