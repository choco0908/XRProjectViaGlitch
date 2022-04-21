// server.js
// where your node app starts
//require('aframe');
//require('aframe-super-shooter-kit');

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const socket = require("socket.io");
const app = express();
const server = require('http').createServer(app);
const io = socket(server);
//const socket_client = require("socket.io-client")("https://xrproject.glitch.me");

/*socket_client.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
*/
const startX = 0;
const startY = -1;
const startZ = -1.2;
const startAng = 180;

class User{
  constructor(socket){
    this.socket = socket;
    this.x = startX;
    this.y = startY;
    this.z = startZ;
    this.ang = startAng;
    this.idx = Math.floor(Math.random() * 3);
    console.log('User create requested ',socket.id,' with idx ',this.idx);
  }
  
  get id() {
    return this.socket.id;
  }
}

let users = [];
let userMap = {};

function join(socket){
  let user = new User(socket);
  
  users.push(user)
  userMap[socket.id] = user;
  
  return user;
}

function leave(socket){
  for(let i = 0; i< users.length; i++){
    if(users[i].id = socket.id){
      users.splice(i,1);
      break;
    }
  }
  delete userMap[socket.id];
}

io.on('connection', function(socket) {
  console.log(`${socket.id}님이 입장하였습니다.`);
  
  socket.on('disconnect', function(reason){
    console.log(`${socket.id}님이 ${reason}의 이유로 퇴장하였습니다.`);
    leave(socket)
    socket.broadcast.emit('leave_user', socket.id);
  });
  
  let newUser = join(socket);
  let charStrings = ["woman","man","robot"];
  socket.emit('user_id', socket.id);
  
  for(let i = 0; i < users.length; i++){
    let user = users[i];
    console.log(`${user.id}님의 캐릭터는 ${charStrings[user.idx]}입니다.`);
    socket.emit('join_user', {
      id: user.id,
      x: user.x,
      y: user.y,
      z: user.z,
      ang: user.ang,
      idx: user.idx
    });
  }
  
  socket.broadcast.emit('join_user', {
    id: socket.id,
    x: newUser.x,
    y: newUser.y,
    z: newUser.z,
    ang: newUser.ang,
    idx: newUser.idx
  });
  
  socket.on('send_location', function(data){
    socket.broadcast.emit('update_state', {
      id: data.id,
      x: data.x,
      y: data.y,
      z: data.z,
      ang: data.ang,
      idx: data.idx
    });
  })

  socket.on('send_broadcast_message', function(data){
    socket.broadcast.emit('receive_broadcast_message', {
      id: data.id,
      msg: data.msg
    });
    console.log(`${data.id}님이 ${data.msg} 전송함.`);
  })
})

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public/"));
app.use('/js', express.static(__dirname + '/js'));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/controller.html");
});

app.get("/index", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// send the default array of dreams to the webpage
app.get("/second", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/second.html");
});

// send the default array of dreams to the webpage
app.get("/controller", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/controller.html");
});

// send the default array of dreams to the webpage
app.get("/face_detection", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/mediapipe/face_detection.html");
});

// send the default array of dreams to the webpage
app.get("/face_mesh", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/mediapipe/face_mesh.html");
});

// send the default array of dreams to the webpage
app.get("/hands", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/mediapipe/hands.html");
});

// send the default array of dreams to the webpage
app.get("/pose", (request, response) => {
  // express helps us take JS objects and send them as JSON
  response.sendFile(__dirname + "/views/mediapipe/pose.html");
});

// listen for requests :)
server.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});
/*
const listener = app.listen(process.env.PORT, () => {
  server.listen(process.env.PORT);
  console.log("Your app is listening on port " + listener.address().port);
});
*/