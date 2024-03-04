package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDoctorRepo extends JpaRepository<Doctor,Long> {

    @Query("SELECT d FROM Doctor d WHERE d.mail = :mail OR d.phone = :phone")
    List<Doctor> checkDoctorInfo(@Param("mail") String mail, @Param("phone") String phone);
}
