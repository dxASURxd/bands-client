import React, { useState } from 'react'

const BandAdd = ({createBand}) => {

  const [ valor, setValor ]  = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (valor.length > 0) {

      createBand(valor);

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

export default BandAdd
