// Imports express and intitializes it
const app = require('express')();
const cors = require('cors');
// Create the server with express
const server = require('http').createServer(app);
// Imports socket.io and initializes it with our server
const io = require('socket.io')(server, {
    // This is saying we want to accept get and post requests from our port 3000
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
        credentails: true,
    }
});

app.use(cors());

// When anyone connects to the server...
io.on("connection", (socket) => {
    console.log("New Client Connected");

    // When the user sends a chat message...
    socket.on("chat message", (message) => {
        // Send that message to everyone else
        io.emit("chat message", message);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected");
    });
});

server.listen(8080, () => console.log("Server listening on port 8080"));