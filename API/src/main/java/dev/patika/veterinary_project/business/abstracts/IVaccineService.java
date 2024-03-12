package dev.patika.veterinary_project.business.abstracts;

import dev.patika.veterinary_project.dto.request.AnimalVaccineDTO;
import dev.patika.veterinary_project.dto.request.VaccineDateFilterDTO;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Vaccine;

import java.util.List;

public interface IVaccineService {

    Vaccine save (Vaccine vaccine);
    Vaccine update (Vaccine vaccine);
    Vaccine getById(Long id);
    void delete(Long id);
    List<Vaccine> findAll();
    List<Vaccine> getVaccinesByAnimalId(Long animalId); //animal id'ye göre aşı listesi döner.
    List<Animal> getAnimalsByComingVaccines(AnimalVaccineDTO animalVaccineDTO);
    List<Vaccine> vaccineDateFilter(VaccineDateFilterDTO vaccineDateFilterDTO);
    List<Vaccine> getVaccinesByAnimalName (String animalName);
}
