import { BrowserRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Pages from './Pages';

function App() {
  const [socket, setSocket] = useState(null);

  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const c = () => {
      const s = io.connect(SERVER_URL);
      setSocket(s);
    };
    c();
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      {socket && <Pages SERVER_URL={SERVER_URL} socket={socket} />}
    </BrowserRouter>
  );
}

export default App;
