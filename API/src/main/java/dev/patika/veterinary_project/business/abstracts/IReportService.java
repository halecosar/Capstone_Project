package dev.patika.veterinary_project.business.abstracts;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Report;

import java.util.List;

public interface IReportService {

    Report save (Report report);
    Report update (Report report);
    Report getById(Long id);
    void delete(Long id);

    List<Report> findAll();
}
