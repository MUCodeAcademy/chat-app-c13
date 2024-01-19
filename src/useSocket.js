import { useEffect, useState, useRef } from "react";
import socketIOClient from "socket.io-client";

const useSocketHook = () => {
    // This stores the list of messages that everyone has sent
    const [response, setResponse] = useState([]);
    // useRef is basically the same thing as a state variable, but it doesn't re-render the component
    // Using a useRef because we don't want it to trigger re-renders
    const socketRef = useRef();

    // This useEffect runs once when the page first loads.
    useEffect(() => {
        // Connect to the server and store it in the socketRef
        socketRef.current = socketIOClient('http://localhost:8080');

        // Listen for a 'chat message' event
        socketRef.current.on('chat message', data => {
            // Add the message to the list of responses
            setResponse(prevState => [...prevState, data]);
        });

        socketRef.current.on('private message', data => {
            setResponse(prevState => [...prevState, data]);
        });

        // When the component unmounts, disconnect from the server
        return () => {
            socketRef.current.disconnect();
        }
    }, []);

    const sendMessage = (message, type, toUsername) => {
        if (type === "public") {
            // Send a 'chat message' event with the user's message to the server
            socketRef.current.emit('chat message', message);
        } else {
            // Send a 'private message' event with the user's message to a specific username
            socketRef.current.emit('private message', message, toUsername);
        }
    }

    const login = (username) => {
        // Send a 'login' event with the user's username to the server
        socketRef.current.emit('login', username);
    }

    // return the response state and the sendMessage/login functions so that we can use it in our main page
    return { response, sendMessage, login }
}

export default useSocketHook;