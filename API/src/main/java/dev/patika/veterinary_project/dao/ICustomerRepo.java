package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.Customer;
import dev.patika.veterinary_project.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ICustomerRepo extends JpaRepository<Customer,Long> {
    @Query("SELECT c FROM Customer c WHERE c.mail = :mail OR c.phone = :phone")
    List<Customer> checkCustomerInfo(@Param("mail") String mail, @Param("phone") String phone);
}
