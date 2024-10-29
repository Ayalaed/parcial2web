import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => setUsuarios(data))
      .catch((error) => console.error('Error al obtener los usuarios:', error));
  }, []);

  return (
    <div className="usuarios-container">
      <h1 className="usuarios-titulo">Lista de Usuarios</h1>
      <ul className="usuarios-lista">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="usuario-item">
            {usuario.nombre} - {usuario.edad} - {usuario.correo}
          </li>
        ))}
      </ul>
      <Link to="/">
        <button className="regresar-boton">Regresar al Formulario</button>
      </Link>
    </div>
  );
}

export default ListaUsuarios;
