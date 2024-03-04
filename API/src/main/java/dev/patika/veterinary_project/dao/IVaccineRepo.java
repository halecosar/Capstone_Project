package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IVaccineRepo extends JpaRepository<Vaccine,Long> {
}
