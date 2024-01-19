import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useSocketHook from './useSocket';

function App() {
  // Get our list of responses and the sendMessage/login functions from our hook.
  const { response, sendMessage, login } = useSocketHook();
  // Stores whatever message they're currently typing.
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [toUsername, setToUsername] = useState("");
  const [type, setType] = useState("public");

  const textToSpeech = () => {
    const speech = window.speechSynthesis;

    // Give the speechSynthesis what we want it to speak
    // We want it to read the last response
    const talk = new SpeechSynthesisUtterance(response[response.length - 1]);

    // Speak it
    speech.speak(new SpeechSynthesisUtterance(username));
    speech.speak(talk);
  }

  return (
    <div className="App">
      <input
        value={username}
        placeholder='Username'
        onChange={e => setUsername(e.target.value)}
      />
      <button onClick={() => login(username)}>Login</button>
      <ul>
        {response.map((message) => <li>{username}: {message}</li>)}
      </ul>
      <input 
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <select onChange={e => setType(e.target.value)}>
        <option value={"public"}>Public</option>
        <option value={"private"}>Private</option>
      </select>
      {type === "private" && 
        <input 
          value={toUsername}
          onChange={e => setToUsername(e.target.value)}
          placeholder='Username to send message to'
        />
      }
      <button onClick={() => sendMessage(message, type, toUsername)}>Send</button>
      <button onClick={() => textToSpeech()}>Speak</button>
    </div>
  );
}

export default App;
