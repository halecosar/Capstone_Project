package dev.patika.veterinary_project.business.abstracts;

import dev.patika.veterinary_project.entities.Animal;

import java.util.List;

public interface IAnimalService {

    Animal save (Animal animal);
    Animal update (Animal animal);
    Animal getById(Long id);
    void delete(Long id);
    List<Animal> findAll();
    public List<Animal> getFilteredAnimalByName(String name);

    List<Animal> getAnimalsByCustomerId(Long customerId); //customer id'ye göre animal listesi döner.


}
