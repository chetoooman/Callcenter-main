import { UserAgent, Inviter, URI, Registerer } from 'sip.js';
import React, { useEffect, useRef, useState } from 'react';
 
const WebPhone = ({
  username = '12345',
  password = 'Agent_12345',
  domain = 'call.freyia.vip',
  wsPort = '8089',
  destinoDefault = '5522916848'
}) => {
  const [connected, setConnected] = useState(false);
  const [destino, setDestino] = useState(destinoDefault);
  const userAgentRef = useRef(null);
  const registererRef = useRef(null);
  const remoteAudioRef = useRef(null);
 
  useEffect(() => {
    const uri = UserAgent.makeURI(`sip:${username}@${domain}`);
    const server = `wss://${domain}:${wsPort}`;
 
    const userAgent = new UserAgent({
      uri,
      transportOptions: {
        server
      },
      authorizationUsername: username,
      authorizationPassword: password
    });
 
    userAgent.start().then(() => {
      const registerer = new Registerer(userAgent);
      registerer.register().then(() => {
        console.log('✅ Registrado en Asterisk');
        setConnected(true);
        userAgentRef.current = userAgent;
        userAgent.delegate = {
          onInvite(invitation) {
            console.log("📞 Llamada entrante");
            invitation.accept().then(() => {
              const pc = invitation.sessionDescriptionHandler.peerConnection;
              pc.getReceivers().forEach(receiver => {
                if (receiver.track && receiver.track.kind === 'audio') {
                  const stream = new MediaStream([receiver.track]);
                  if (remoteAudioRef.current) {
                    remoteAudioRef.current.srcObject = stream;
                    remoteAudioRef.current.play().then(() => {
                      console.log('Audio entrante reproduciéndose');
                    }).catch(console.error);
                  }
                }
              });
            });
          }
        };
        registererRef.current = registerer;
      });
    }).catch(err => console.error('❌ Error al conectar SIP.js:', err));
 
    return () => {
      registererRef.current?.unregister();
      userAgentRef.current?.stop();
    };
  }, [username, password, domain, wsPort]);
 
  const hacerLlamada = () => {
    if (!destino) return alert('Ingrese un número válido');
    const targetURI = UserAgent.makeURI(`sip:${destino}@${domain}`);
    if (!targetURI) {
      alert('Error al crear URI de destino');
      return;
    }
 
    const inviter = new Inviter(userAgentRef.current, targetURI);
    inviter.invite();
  };
 
  return (
<div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
<h3>📞 WebPhone ({connected ? 'Conectado' : 'Desconectado'})</h3>
<p><strong>Usuario:</strong> {username}</p>
<p><strong>Servidor:</strong> {domain}:{wsPort}</p>
<input
        type="text"
        placeholder="Número a marcar"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
        style={{ marginRight: '0.5rem', padding: '4px' }}
      />
<button onClick={hacerLlamada} disabled={!connected}>
        Llamar
</button>
      <audio ref={remoteAudioRef} autoPlay controls />
</div>
  );
};
 
export default WebPhone;