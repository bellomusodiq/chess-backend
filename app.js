const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid')
const multer = require('multer');
const path = require('path');
const url = require('url');
const querystring = require('querystring');

const Game = require('./models/game');
const Player = require('./models/player');



const gameRoutes = require('./routes/game');
const authRoutes = require('./routes/auth');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/chess', gameRoutes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// web socket (socket.io)
app.get('/socket-testing', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  const urlParts = url.parse(socket.handshake.headers.referer);
  const user = querystring.decode(urlParts.query).user;
  console.log(`player ${user} joined`);
  socket.on('disconnect', () => {
      console.log(`player ${user} disconnected`);
  })
  io.emit('broadcast', {
    message: 'Hello World!'
  })
});

const PORT = 8080;
const MONGODB_CONNECTION_STRING = 'mongodb+srv://tosin:Cy2svEQC0bAz4IDv@cluster0-hqnwm.mongodb.net/feed?retryWrites=true&w=majority';

mongoose
  .connect(
    MONGODB_CONNECTION_STRING,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(result => {
    http.listen(PORT, () => {
      console.log(`listening on *:${PORT}`);
    });
  })
  .catch(err => console.log(err));
