import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from "react-router-dom";

const Registrar = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [usuarioExiste, setUsuarioExiste] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/agregar-usuario?usuario=${usuario}&contraseña=${contraseña}`);
            
            if (response.status === 200) {
                console.log(response.data.message);
                // El usuario se agregó correctamente
                setUsuarioExiste(false);
                navigate('/inicio');
            } else if (response.status === 400) {
                console.error(response.data.message);
                // El usuario ya existe, muestra un mensaje de error al usuario
            } else {
                console.error('Error desconocido al agregar el usuario');
                
            }
            
        } catch (error) {
            console.error('Error al registrar el usuario: ' + error);
            setUsuarioExiste(true);
        }
    };

    return (
        <div>
            <form className='container w-50 py-5 bg-dark position-absolute top-50 start-50 translate-middle rounded-5' onSubmit={handleSubmit}>
                <div className="d-flex align-items-center justify-content-center">
                    <p className="text-white text-center fs-2">Registrar</p>
                </div>
                <div>
                    <div className='mx-auto w-75'>
                        <label className='text-white' htmlFor="usuario">Usuario</label>
                        <input
                            className="form-control my-2"
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Ingresa el Usuario"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <div className='mx-auto w-75'>
                        <label className='text-white' htmlFor="contraseña">Contraseña</label>
                        <input
                            className="form-control my-2"
                            type="password"
                            id="contraseña"
                            name="contraseña"
                            placeholder="Ingresa la Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <div className="mx-5">
                        <p><a className='text-white link-light link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover' href='/'>Iniciar Sesion</a></p>
                    </div>
                </div>
                <div className='d-flex align-items-center justify-content-center my-4'>
                    <button className='btn btn-secondary w-50'>Aceptar</button>
                </div>
                {usuarioExiste && (
                    <p className="text-danger text-center 'text-white'">El usuario ya existe. Por favor, elige otro nombre de usuario.</p>
                )}
            </form>
        </div>
    )
}

export default Registrar;
