// src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'; // Importar Socket.IO Client

const socket = io('http://localhost:5000'); // Conectar a Socket.IO en el backend

function App() {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        // Escuchar el evento 'mensajes' de Socket.IO
        socket.on('mensajes', (data) => {
          console.log('Mensajes recibidos desde el servidor:', data); // Log para verificar
            setMensajes(data); // Actualizar los mensajes en tiempo real
        });

        // Limpiar la conexión cuando el componente se desmonte
        return () => {
            socket.off('mensajes');
        };
    }, []);

    return (
        <div className="App">
            <h1>Panel de Control - Mensajes de WhatsApp</h1>
            <ul>
                {mensajes.map(mensaje => (
                    <li key={mensaje.id}>
                        <strong>{mensaje.from}:</strong> {mensaje.body} <br/>
                        <small>{new Date(mensaje.timestamp * 1000).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

