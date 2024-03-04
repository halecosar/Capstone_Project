package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.AvailableDate;
import dev.patika.veterinary_project.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface IAvailableDateRepo extends JpaRepository<AvailableDate,Long> {

}
