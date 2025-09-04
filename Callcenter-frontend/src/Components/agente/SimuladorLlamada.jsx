import React, { useState } from "react";
import api from '../../services/api';
import { useAgente } from "../../context/AgenteContext";

const SimuladorLlamada = () => {
  const [numero, setNumero] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { setClienteActual, setEstadoAgente } = useAgente();

  const simular = async () => {
    if (!numero) return
    try {
        await api.post('/agente/estado', { estado: 'en_llamada' });
        setEstadoAgente('en_llamada');

        const res = await api.get(`/clientes/buscar/${numero}`);
        setClienteActual(res.data);
        setMensaje(`✅ Cliente detectado: ${res.data.nombre}`);
      } catch (err) {
        setMensaje('⚠️ No se encontró ningún cliente con ese número.');
        setClienteActual({ telefono: numero }); // cliente desconocido
    }
  }

  return(
    <div style={{ marginBottom: '1rem' }}>
      <input
        placeholder="Número entrante..."
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        style={{ padding: '8px', marginRight: '8px' }}
      />
      <button onClick={simular}>📲 Simular llamada</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};
export default SimuladorLlamada;