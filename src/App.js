// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        // Llamar a la API del backend para obtener los mensajes
        axios.get('http://localhost:3000/api/mensajes')
            .then(response => {
                setMensajes(response.data);
            })
            .catch(error => {
                console.error('Error al obtener los mensajes:', error);
            });
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
