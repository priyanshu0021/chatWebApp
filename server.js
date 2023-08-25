const express = require("express");
const app = express();
const port = process.env.PORT||3000;
const http = require("http").createServer(app)
 http.listen(port,()=>{
  console.log(`litsen on ${port}`)
 });
app.use(express.static(__dirname+"/public"))
 app.get("/",(req,res)=>{
  res.sendFile(__dirname+"/chateapp.html")
 })

 //socket
   const users={};
 const io= require("socket.io")(http);

 io.on("connection",(socket)=>{
      socket.on("newuser-join", (name)=>{
          users[socket.id]=name;
          io.emit("user-join",users);

      });
     socket.on("message",(msg)=>{
           socket.broadcast.emit("message",msg)
  })
 })

