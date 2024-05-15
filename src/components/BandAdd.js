import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext';

const BandAdd = ({}) => {

  const [ valor, setValor ]  = useState('');
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    if (valor.length > 0) {

      socket.emit('create-band', {name: valor});

      setValor('');
    }
  }

  return (
    <>
        <h3>Agregar banda</h3>
        <form
          onSubmit={ onSubmit }
        >
            <input 
              className='form-control' 
              placeholder='Nuevo nombre de bands'
              value={ valor }
              onChange={ (e) => setValor( e.target.value )}
            />
        </form> 
    </>
  )
}

export default BandAdd;
