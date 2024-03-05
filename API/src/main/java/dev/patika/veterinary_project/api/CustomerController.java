package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.ICustomerService;
import dev.patika.veterinary_project.entities.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//Hayvan sahiplerini kaydetme, bilgilerini güncelleme, görüntüleme ve silme
@RestController
@RequestMapping("/v1/customers")
public class CustomerController {
    private final ICustomerService customerService;

    public CustomerController(ICustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Customer save(@RequestBody Customer customer) { //entitiy'i gönderdik.
        return this.customerService.save(customer);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Customer update (@RequestBody Customer customer) {
        return this.customerService.update(customer);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.customerService.delete(id);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Customer getById(@PathVariable("id") Long id) {
        return this.customerService.getById(id);
    }

    //Hayvan sahipleri isme göre filtrelenecek şekilde end point oluşturmak.
    @GetMapping("/getFilteredCustomerByName/{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<Customer> getFilteredCustomerByName(@PathVariable("name") String name) {
        return this.customerService.getFilteredCustomerByName(name);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Customer> findAll() {
        return this.customerService.findAll();
    }
}

