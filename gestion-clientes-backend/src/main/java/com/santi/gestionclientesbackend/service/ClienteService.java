package com.santi.gestionclientesbackend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.santi.gestionclientesbackend.entitys.Cliente;
import com.santi.gestionclientesbackend.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Cliente findById(Long Id) {
        Optional<Cliente> optionalCliente = clienteRepository.findById(Id);
        if (optionalCliente.isPresent()) {
            return optionalCliente.get();
        } else {
            return null;
        }
    }

    public void delete (Long Id) {
        clienteRepository.deleteById(Id);
    }

}