import io from 'socket.io-client';
import { useState, useEffect } from "react";
import BandAdd from "./components/BandAdd";
import BandList from "./components/BandList";

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState( connectSocketServer() );
  const [online, setOnline] = useState(true);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline( true );
    })
  }, [ socket ]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline( false );
    })
  }, [ socket ]);

  useEffect(() => {
    socket.on('currentBands', (bands) => {
      setBands(bands)
    })
  }, [socket]);

  const vote = ( id ) => {
    socket.emit('voteBand', id)
  }

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            online 
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList 
            data={ bands }
            vote = { vote }
          />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>


    </div>
  );
}

export default App;
