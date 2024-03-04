package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppointmentRepo extends JpaRepository<Appointment,Long> {
}
