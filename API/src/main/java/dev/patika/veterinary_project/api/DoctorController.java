package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IDoctorService;
import dev.patika.veterinary_project.entities.Customer;
import dev.patika.veterinary_project.entities.Doctor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Veteriner doktorların kaydedilmesi, bilgilerinin güncellenmesi, görüntülenmesi ve silinmesi
@RestController
@RequestMapping ("/v1/doctors")
public class DoctorController {
    private final IDoctorService doctorService;

    public DoctorController(IDoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Doctor save(@RequestBody Doctor doctor) { //entitiy'i gönderdik.
        return this.doctorService.save(doctor);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Doctor update (@RequestBody Doctor doctor) {
        return this.doctorService.update(doctor);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.doctorService.delete(id);
    }
    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Doctor getById(@PathVariable("id") Long id) {
        return this.doctorService.getById(id);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Doctor> findAll() {
        return this.doctorService.findAll();
    }
}

