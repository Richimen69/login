import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const navigate = useNavigate();
    const [usuarioExiste, setUsuarioExiste] = useState(false);
    const [bloqueado, setBloqueado] = useState(false);
    var count = 0
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Realiza la solicitud GET para el inicio de sesión
        try {
            const response = await axios.get(`http://localhost:3001/iniciar-sesion?usuario=${usuario}&contraseña=${contraseña}`);

            if (response.status === 200) {
                console.log('Inicio de sesión exitoso');
                navigate('/inicio');
                // Realiza acciones adicionales después de un inicio de sesión exitoso.
            } else if (response.status === 401) {
                if (response.data.message === 'La cuenta está bloqueada') {
                    setBloqueado(true);
                } else {
                    console.error('Credenciales incorrectas');
                }
            }
        } catch (error) {
            console.error('Error al iniciar sesión: ' + error);
            setUsuarioExiste(true);
            count ++
            if (count === 3){
                setBloqueado(true);
            }
        }
    };

    return (
        <div>
            <form className='container w-50 py-5 bg-dark position-absolute top-50 start-50 translate-middle rounded-5' onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-center">
                    <p className="text-white text-center fs-2">Iniciar Sesión</p>
                </div>
                <div>
                    <div className='mx-auto w-75'>
                        <p className='text-white'>Usuario</p>
                        <input
                            className="form-control my-2"
                            type="text"
                            placeholder="Ingresa el Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className='mx-auto w-75'>
                        <p className='text-white'>Contraseña</p>
                        <input
                            className="form-control my-2"
                            type="password"
                            placeholder="Ingresa la Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className="d-flex justify-content-end mx-5">
                        <p><a className='text-white link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href='/registrar'>Registrar</a></p>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center my-4'>
                    <button className='btn btn-secondary w-50' type="submit" disabled={bloqueado}>Aceptar</button>
                </div>
                {usuarioExiste && (
                    <p className="text-danger text-center text-white">Credenciales incorrectas</p>
                )}
                {bloqueado && (
                    <p className="text-danger text-center text-white">La cuenta está bloqueada después de 3 intentos fallidos de inicio de sesión.</p>
                )}
            </form>
        </div>
    )
}

export default Login;
