const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
console.log('hi')
var name
http.listen(4040, () => console.log("listening on http://localhost:4040"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
io.on("connection", function(socket) {


		socket.on("disconnect", function(socket) {
		// msg[1] = msg[1]+" Left the Chat"
		io.emit("message", [false,name+' Left The Chat']);
		console.log('User are Dead!'+socket);
	});



		socket.on("message", function(msg) {
   		io.emit("message", msg);
  		console.log("useer send a message :"+msg)
 });



	socket.on('joining msg', function(msg){
		name=msg[1]
		console.log("joing the chat")
		msg[1] = msg[1]+" join the Chat"
		io.emit("message", msg);
		console.log(msg[1])
	});



});	