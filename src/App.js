import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import useSocketHook from './useSocket';

function App() {
  // Get our list of responses and the sendMessage function from our hook.
  const { response, sendMessage } = useSocketHook();
  // Stores whatever message they're currently typing.
  const [message, setMessage] = useState("");

  return (
    <div className="App">
      <ul>
        {response.map((message) => <li>{message}</li>)}
      </ul>
      <input 
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
}

export default App;
