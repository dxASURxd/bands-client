import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const BandList = () => {

    const [bands, setBands] = useState([]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on('currentBands', (bands) => {
            setBands(bands)
        })
        return () => socket.off('currentBands');
    }, [socket]);


    const changeName = (e, id) => {
        const newName = e.target.value;
        setBands(bands => bands.map(band => {
            if (band.id === id) {
                band.name = newName;
            }
            return band;
        }));
    }

    const onfocused = (id, name) => {
        socket.emit('changName', {
            id, name
        });
    }

    const vote = (id) => {
        socket.emit('voteBand', id);
    }

  const deleteBand = (id) => {
    socket.emit('delBand', id);
  }

    const createRows = () => {
        return (

            bands.map(band => (

                <tr key={band.id}>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={() => vote(band.id) }
                        > +1 </button>
                    </td>
                    <td>
                        <input
                            className='form-control'
                            value={band.name}
                            onChange={(e) => changeName(e, band.id)}
                            onBlur={() => onfocused(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteBand(band.id)}
                        >
                            borrar
                        </button>
                    </td>
                </tr >
            ))
        );
    }

    return (
        <>
            <table className='table table-stripped'>
                <thead>
                    <tr>
                        <th></th>
                        <th>nombre</th>
                        <th>votos</th>
                        <th>borrar</th>
                    </tr>
                </thead>
                <tbody>
                    {createRows()}
                </tbody>
            </table>
        </>
    )
}

export default BandList
