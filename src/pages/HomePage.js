import { useContext } from "react";
import { SocketContext } from '../context/SocketContext'
import BandAdd from "../components/BandAdd";
import BandList from "../components/BandList";

function HomePage() {

  // const [bands, setBands] = useState([]);

  const { online } = useContext( SocketContext );


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
          <BandList/>
        </div>
        <div className="col-4">
          <BandAdd/>
        </div>
      </div>


    </div>
  );
}

export default HomePage;
