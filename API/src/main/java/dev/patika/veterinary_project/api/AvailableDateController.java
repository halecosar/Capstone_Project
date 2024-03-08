package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IAvailableDateService;
import dev.patika.veterinary_project.entities.AvailableDate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Doktorların müsait günlerini ekleme, bilgilerini güncelleme, görüntüleme ve silme
@RestController
@RequestMapping ("v1/availabledates") public class AvailableDateController {
    private final IAvailableDateService availableDateService;

    public AvailableDateController(IAvailableDateService availableDateService) {
        this.availableDateService = availableDateService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public AvailableDate save(@RequestBody AvailableDate availableDate)  { //entitiy'i gönderdik.
        return this.availableDateService.save(availableDate);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public AvailableDate update (@RequestBody AvailableDate availableDate) {
        return this.availableDateService.update(availableDate);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.availableDateService.delete(id);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public AvailableDate getById(@PathVariable("id") Long id) {
        return this.availableDateService.getById(id);
    }

    @GetMapping("/getAvailableDatesByDoctor/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<AvailableDate> getAvailableDatesByDoctor(@PathVariable("id") Long id) {
        return this.availableDateService.getAvailableDatesByDoctor(id);
    }
}

