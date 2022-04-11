const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
var name , ListOfUser=[],activeuser =[]
http.listen(4040, /*'0.0.0.0',*/ () => console.log("listening on http://localhost:4040"));
app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));
io.on("connection", function(socket) {


		socket.on("disconnect", function(msg) {
		io.emit("dis","The User is Leaving")
		ListOfUser=[]
		io.emit("message", [false,name+' Left The Chat']);
		console.log('Dead!'+msg[1]);
	});
		socket.on("message", function(msg) {
   		io.emit("message", msg);
  		console.log("useer send a message :"+msg)
 });

		socket.on("peoplename",(msg)=>{
			console.log(msg)
			ListOfUser.push(msg)  
			console.log("actice people",ListOfUser,ListOfUser.length)
			io.emit("UserLoggIn",ListOfUser,activeuser) 
			console.log("name in Active User array ",activeuser)
			for(i=0; i < activeuser.length;i++){
				if(activeuser.includes(ListOfUser[i]))
				{
					console.log("Found the user that leave the House",activeuser[i])
				}
			}
		});
		socket.on('joining msg', function(msg){
		name=msg[1]
		console.log("joing the chat")
		ListOfUser.push(name)
		activeuser.push(name)
		msg[1] = msg[1]+" join the Chat"
		io.emit("message", msg);
		console.log(msg[1],ListOfUser)
		io.emit("UserLoggIn",ListOfUser)
	});

}); 

