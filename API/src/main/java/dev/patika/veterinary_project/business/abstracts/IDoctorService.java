package dev.patika.veterinary_project.business.abstracts;

import dev.patika.veterinary_project.entities.Doctor;

import java.util.List;

public interface IDoctorService {
    Doctor save (Doctor doctor);
    Doctor update (Doctor doctor);
    Doctor getById(Long id);
    void delete(Long id);
    List<Doctor> findAll();
}
