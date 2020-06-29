const url = require('url');
const querystring = require('querystring');

const Game = require('../models/game');


class GameSocket {
    static listen(socket, io, playerId) {
        socket.on('game_room', (data) => {
            console.log(data)
           
            Game.updateOne({ _id: gameId }, { $set: { pieces: data.pieces } })
                .then(game => {
                    Game.findById(gameId)
                        .exec()
                        .then(gameObj => {
                            io.emit('game_room', { status: 200, message: gameObj.populate() })
                        })
                })
                .catch(err => {
                    io.emit('game_room', { status: 404, message: 'game not found' })
                })
        })
    }
}


const socketConnection = (io) => {
    io.on('connection', (socket) => {
        const user = socket.handshake.query.user;
        console.log(`player ${user} joined`);
        socket.on('disconnect', () => {
            console.log(`player ${user} disconnected`);
        })
        // listen to game invite
        socket.on('game_notification', (data) => {
            // data = {gameId}
            console.log(data)
            io.emit('game_notification', data);
        })
        socket.on('broadcast', data => {
            console.log(data);
            io.emit('broadcast', data);
        })
        // socket.emit('5ef5e3d53523fc32b0300741', {message: user})
        socket.on(user.trim(), (data) => {
            console.log(data)
            io.emit(user.trim(), data)
        })
        GameSocket.listen(socket, io, user);
    });
}

module.exports = socketConnection;