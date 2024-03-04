package dev.patika.veterinary_project.business.abstracts;

import dev.patika.veterinary_project.entities.Customer;

import java.util.List;

public interface ICustomerService {

    Customer save (Customer customer);
    Customer update (Customer customer);
    Customer getById(Long id);
    void delete(Long id);
    List<Customer> findAll();

    public List<Customer> getFilteredCustomerByName(String name);


}
