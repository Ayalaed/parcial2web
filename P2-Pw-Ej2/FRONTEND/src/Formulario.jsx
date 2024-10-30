import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [correo, setCorreo] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [usuarioEnviado, setUsuarioEnviado] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const usuario = {
      nombre,
      edad: parseInt(edad),
      correo,
    };
  
    fetch("http://35.175.21.0/api/users", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar el formulario");
        }
        return response.json();
      })
      .then((data) => {
        setEnviado(true);               
        setUsuarioEnviado(usuario);     
        setNombre("");                  
        setEdad("");                     
        setCorreo("");                   
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      {enviado ? (
        <div>
          <h1>Datos Enviados</h1>
          <ul>
            <li>Nombre: {usuarioEnviado?.nombre}</li>
            <li>Edad: {usuarioEnviado?.edad}</li>
            <li>Correo: {usuarioEnviado?.correo}</li>
          </ul>
          <button onClick={() => setEnviado(false)}>Registrar otro usuario</button>
          <button onClick={() => navigate('/usuarios')}>Ver Lista de Usuarios</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
  
}

export default Formulario;