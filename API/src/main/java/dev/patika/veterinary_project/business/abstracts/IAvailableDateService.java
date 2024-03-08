package dev.patika.veterinary_project.business.abstracts;

import dev.patika.veterinary_project.entities.AvailableDate;

import java.util.List;

public interface IAvailableDateService {

    AvailableDate save (AvailableDate availableDate);
    AvailableDate update (AvailableDate availableDate);
    AvailableDate getById(Long id);
    void delete(Long id);
    List<AvailableDate> findAll();
    List<AvailableDate> getAvailableDatesByDoctor(long doctorId);
}
