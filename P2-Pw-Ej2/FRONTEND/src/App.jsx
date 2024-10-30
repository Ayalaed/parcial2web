import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Formulario from "./Formulario";
import ListaUsuarios from "./ListaUsuarios";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <Link to="/" className="boton">Formulario</Link>
          <Link to="/usuarios" className="boton">Lista de Usuarios</Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Formulario />} />
          <Route path="/usuarios" element={<ListaUsuarios />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
