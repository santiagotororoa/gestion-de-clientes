import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Link } from 'react-router-dom';

export const ListClientesComponent = () => {

  const [clientes, setClientes]  = useState([]);
  useEffect(() => {
    listarClientes()
  },[])

  const listarClientes = () => {
    ClienteService.getAllClientes().then(response => {
        setClientes(response.data);
    }).catch(error => {
        console.log(error)
    })
  };

  const deleteCliente = (clienteId) => {
    
    ClienteService.deleteCliente(clienteId).then((response) => {
        listarClientes()
    }).catch(error => {
        console.log(error)
    })

  }

  return (
    <div className='container'>
        <h2 className='text-center'>Lista de Clientes</h2>
        <Link to="/add-cliente" className='btn btn-primary mb-2'>Agregar cliente</Link>
        <table className='table table-bordered table-striped'>
            <thead>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                {
                    clientes.map(
                        cliente =>
                        <tr key={cliente.id}>
                            <td>{ cliente.id }</td>
                            <td>{ cliente.firsname }</td>
                            <td>{ cliente.lastname }</td>
                            <td>{ cliente.email }</td>
                            <td>
                                <Link to={`/edit-cliente/${cliente.id}`} className='btn btn-info'>Actualizar</Link>
                                <button style={ { marginLeft:"10px" }} className='btn btn-danger' onClick={() => deleteCliente(cliente.id)}>eliminar</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListClientesComponent;