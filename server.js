const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var name , ListOfUser=[]
http.listen(4040, /*'0.0.0.0',*/ () => console.log("listening on http://localhost:4040"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
io.on("connection", function(socket) {


		socket.on("disconnect", function(msg) {
		// msg[1] = msg[1]+" Left the Chat"
		io.emit("message", [false,name+' Left The Chat']);
		console.log('Dead!'+msg[1]);
	});
		socket.on("message", function(msg) {
   		io.emit("message", msg);
  		console.log("useer send a message :"+msg)
 });
		socket.on("dis",function(msg){
			console.log(msg)
		});


	socket.on('joining msg', function(msg){
		name=msg[1]
		console.log("joing the chat")
		ListOfUser.push(name)
		msg[1] = msg[1]+" join the Chat"
		io.emit("message", msg);
		console.log(msg[1],ListOfUser)
			// var UserArray = JSON.stringify(ListOfUser)
			// localStorage.setItem("ActiveUser", UserArray )
			// console.log("data after joining ",localStorage.getItem("ActiveUser"))
	});

});
