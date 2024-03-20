import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const AddClienteComponent = () => {
    
    const [cliente, setCliente] = useState({
        firsname: "",
        lastname: "",
        email: ""
    })
    const navigate = useNavigate();
    const { id } = useParams();

    const saveCliente = (e) => {
        e.preventDefault();
        ClienteService.createCliente(cliente).then((response) => {
            console.log(response.data);
            navigate('/clientes');

        }).catch(error => {
            console.log(error)
        })
    }

    const updateCliente = (e) => {
        e.preventDefault();
        ClienteService.updateCliente(id, cliente).then((response) => {
            console.log(response.data);
            navigate('/clientes');
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        ClienteService.getClienteById(id).then((response) => {
            setCliente(response.data);
            console.log("dfas")
        }).catch(error => {
            console.log(error);
        })
    },[]);

    const hadleInputChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 '>
                    <h2 className='text-center'>
                        {id ? "Editar cliente" : "Registrar cliente"}
                    </h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Firsname</label>
                                <input 
                                    type='text' 
                                    placeholder='Digite su firsname'
                                    name='firsname'
                                    className='form-Control'
                                    value={ cliente.firsname }
                                    onChange={ hadleInputChange }
                                    />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Lastname</label>
                                <input 
                                    type='text' 
                                    placeholder='Digite su lastname'
                                    name='lastname'
                                    className='form-Control'
                                    value={ cliente.lastname }
                                    onChange={hadleInputChange }
                                    />
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input 
                                    type='text' 
                                    placeholder='Digite su email'
                                    name='email'
                                    className='form-Control'
                                    value={ cliente.email }
                                    onChange={ hadleInputChange }
                                    />
                            </div>
                            <button className='btn btn-success' onClick={ (e) => id ? updateCliente(e) : saveCliente(e) }>Guardar</button>
                            &nbsp;  &nbsp;
                            <Link to="/clientes" className='btn btn-danger'>Cancelar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddClienteComponent;