import { createContext, useContext, useState } from 'react';

const AgenteContext = createContext();

export const useAgente = () => {
  return useContext(AgenteContext);
}

export const AgenteProvider = ({ children }) => {
    const [estadoAgente, setEstadoAgente] = useState('desconectado');
    const [clienteActual, setClienteActual] = useState(null);
    
    const resetLlamada = () => {
        setEstadoAgente('Activo');
        setClienteActual(null);
    }

    return(
        <AgenteContext.Provider value={{ estadoAgente, setEstadoAgente, clienteActual, setClienteActual, resetLlamada }}>
            {children}
        </AgenteContext.Provider>
    )
}