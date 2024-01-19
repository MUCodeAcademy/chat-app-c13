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

// This stores usernames and their socket connection
let users = {};

// When anyone connects to the server...
io.on("connection", (socket) => {
    console.log("New Client Connected");

    socket.on("login", (username) => {
        // Stores their username in the socket.username property
        socket.username = username;
        // This stores their socket connection and their username in the users object
        users[username] = socket;
        console.log(users);
    });

    socket.on("private message", (message, toUsername) => {
        // Get the target user's socket
        const targetSocket = users[toUsername];
        // Send the message to that socket
        targetSocket.emit("private message", message);
        // Also send the message to the sender's socket
        socket.emit("chat message", message);
    });

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