import React from 'react';
import LlamadaActiva from '../agente/LlamadaActiva';
import LlamadaForm from '../agente/LlamadaForm';
import { useAgente } from '../../context/AgenteContext';

const PanelLlamada = ({ onFinalizar, setAlerta }) => {
  const { estadoAgente } = useAgente();

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>📞 Panel de Llamada</h3>
      {estadoAgente === 'en_llamada' ? (
        <LlamadaActiva onFinalizar={onFinalizar} setAlerta={setAlerta} />
      ) : (
        <LlamadaForm onLlamadaRegistrada={onFinalizar} />
      )}
    </div>
  );
};

export default PanelLlamada;
