package dev.patika.veterinary_project.dao;

import dev.patika.veterinary_project.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IReportRepo extends JpaRepository<Report, Long> {
}
