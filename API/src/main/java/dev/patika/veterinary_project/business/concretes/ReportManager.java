package dev.patika.veterinary_project.business.concretes;
import dev.patika.veterinary_project.business.abstracts.IReportService;
import dev.patika.veterinary_project.dao.IReportRepo;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Report;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportManager implements IReportService {

    private final IReportRepo iReportRepo;

    public ReportManager(IReportRepo iReportRepo) {
        this.iReportRepo = iReportRepo;
    }

    @Override
    public Report save(Report report) {
        return iReportRepo.save(report);
    }

    @Override
    public Report update(Report report) {
        return iReportRepo.save(report);
    }

    @Override
    public Report getById(Long id) {
        Report report = iReportRepo.findById(id).orElse(null);
        if (report == null) {
            throw new RuntimeException(id + " id’li kayıt sistemde bulunamadı.");
        } else {
            return report;
        }
    }

    @Override
    public void delete(Long id) {
        getById(id);
        this.iReportRepo.deleteById(id);
    }

    @Override
    public List<Report> findAll() {
        return this.iReportRepo.findAll();
    }
}
