package com.santi.gestionclientesbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.santi.gestionclientesbackend.entitys.Cliente;
import com.santi.gestionclientesbackend.exception.ResourceNotFoundException;
import com.santi.gestionclientesbackend.service.ClienteService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;
    
    @GetMapping("/clientes")
    public List<Cliente> listarClientes() {
        return clienteService.findAll();
    }
    

    @PostMapping("/clientes")
    public Cliente guardarCliente(@RequestBody Cliente cliente) { 
        return clienteService.save(cliente);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> listarClientePorId (@PathVariable Long id) {
       Cliente clienteOptional = clienteService.findById(id);
        
        if (clienteOptional != null) {;
            return ResponseEntity.ok(clienteOptional);
        } else {
            throw new ResourceNotFoundException("El cliente con ese ID no existe: " + id);
        }
    }
    
    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> actualizarCliente(@PathVariable ("id")Long id, @RequestBody Cliente cliente) {
        Cliente clienteOptional = clienteService.findById(id);
        
        if (clienteOptional != null) {;

            clienteOptional.setFirsname(cliente.getFirsname());
            clienteOptional.setLastname(cliente.getLastname());
            clienteOptional.setEmail(cliente.getEmail());
            Cliente clienteActualizado = clienteService.save(clienteOptional);
            return ResponseEntity.ok(clienteActualizado);
        } else {
            throw new ResourceNotFoundException("El cliente con ese ID no existe: " + id);
        }
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarCliente (@PathVariable ("id") Long Id) {
        Cliente cliente = clienteService.findById(Id);

        if(cliente != null) {
            clienteService.delete(Id);
            Map<String,Boolean> response = new HashMap<>();
            response.put("delete",Boolean.TRUE);
            return ResponseEntity.ok(response);
        }else {
            throw new ResourceNotFoundException("El cliente con ese ID no existe: " + Id);
        }
    }
}
