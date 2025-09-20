import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Importamos componentes de Bootstrap React
const RegistroFormulario = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({}); // Estado para mensajes de error
  const [registroExitoso, setRegistroExitoso] = useState(false); // Nuevo estado

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    }
    if (!correo.trim()) {
      nuevosErrores.correo = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = 'Ingresa un correo válido.';
    }
    if (password.length < 8) {
      nuevosErrores.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validarFormulario()) {
      // Si la validación es exitosa
      setRegistroExitoso(true);
      setNombre('');
      setCorreo('');
      setPassword('');
      setErrores({}); // Limpiar errores
      setTimeout(() => setRegistroExitoso(false), 3000); // Ocultar mensaje después de 3s
    }
  };

    return (
    <>
        <h1>Registro de Usuario </h1>
         {registroExitoso && (
          <div className="alert alert-success text-center" role="alert">
            ✅ ¡Registro exitoso! ✨
          </div>
        )}
        <form id="registroForm" novalidate onSubmit={handleSubmit}>
        <div  className="form-group">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              className={`${errores.nombre ? 'is-invalid' : ''}`}
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>
        
        <div className="form-group">
            <label for="correo">Correo:</label>
            <input
              type="email"
              className={`${errores.correo ? 'is-invalid' : ''}`}
              id="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="ejemplo@correo.com"
            />
             {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
        </div>
        
        <div className="form-group">
            <label for="password">Contraseña:</label>
            <input
              type="password"
              className={` ${errores.password ? 'is-invalid' : ''}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 8 caracteres"
            />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </div>
        
        <button type="submit">
            Registrarse <i className="fas fa-paper-plane"></i>
        </button>
        <p id="mensajeError" className="error"></p>
        </form>
    </>
    );
};

export default RegistroFormulario;