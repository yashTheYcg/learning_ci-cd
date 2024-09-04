
const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const {Server} = require('socket.io');


const server = http.createServer(app);
const io = new Server(server);

// handle all socket connections
io.on('connection',(socket)=> {

    console.log("A new user has been connected", socket.id);

    socket.on('sendMessage', (message)=> {
        io.emit("receiveMessage", {message});
        console.log("A new user message -> ", message)
    })

    socket.on('disconnect',()=> console.log("A user has been disconnected",socket.id));
});

const filePath = path.join(__dirname,'/public/index.html');
app.use(express.static(path.resolve("/public")));

app.get('/',(req,res)=> {
    return res.sendFile(filePath);
})

// let a=2;

server.listen(9000,()=> console.log("server started at port: 9000"));