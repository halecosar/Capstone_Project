package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IReportService;
import dev.patika.veterinary_project.entities.Appointment;
import dev.patika.veterinary_project.entities.Report;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/reports")
public class ReportController {
    private final IReportService iReportService;

    public ReportController(IReportService iReportService) {
        this.iReportService = iReportService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Report save(@RequestBody Report report) { //entitiy'i gönderdik.
        return this.iReportService.save(report);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Report update (@RequestBody Report report) {
        return this.iReportService.update(report);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.iReportService.delete(id);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Report getById(@PathVariable("id") Long id) {
        return this.iReportService.getById(id);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Report> findAll() {
        return this.iReportService.findAll();
    }
}
