var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors')

const PORT = 5000;

app.use(cors())


app.get('/socket-testing', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
      console.log('user disconnected')
  })
});


http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});