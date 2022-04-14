const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var name , ListOfUser=[]
http.listen(4040, '0.0.0.0', () => console.log("listening on http://localhost:4040"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
io.on("connection", function(socket) {


		socket.on("disconnect", function(msg) {
		io.emit("dis","The User is Leaving")
		ListOfUser=[]
		io.emit("message",{Type : "Joining",
							Message : "User Leave the Chat"});
		console.log('Dead!'+msg[1]);
	});
		socket.on("message", function(msg) {
   		io.emit("message", msg);
  		console.log("useer send a message :"+msg)
 });

		socket.on("peoplename",async (msg)=>{
			console.log("msg:= ",msg)
			ListOfUser.push(msg)  
			console.log("active people in ListOfUser array:=",ListOfUser,ListOfUser.length)
			await io.emit("UserLoggIn",ListOfUser) 
		});
		socket.on('joining msg', function(msg){
		name=msg[1]
		console.log("joing the chat")
		ListOfUser.push(name)
		msg[1] = msg[1]+" join the Chat"
		io.emit("message", {Type : "Joining",
							Name : name,
							Message : name+" join the Chat"});
		console.log(msg[1],ListOfUser)
		io.emit("UserLoggIn",ListOfUser)
	});
 
		// ListOfUser.forEach((channelName)=>{
			socket.on("E2E",(msg)=>{
				io.emit(msg.Receiver,msg)
			})//on socket end
		// });//for each end


});   
