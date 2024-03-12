package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IVaccineService;
import dev.patika.veterinary_project.dto.request.AnimalVaccineDTO;
import dev.patika.veterinary_project.dto.request.VaccineDateFilterDTO;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Doctor;
import dev.patika.veterinary_project.entities.Vaccine;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//Hayvanlara uygulanan aşıları kaydetme, bilgilerini güncelleme, görüntüleme ve silme
@RestController
@RequestMapping ("v1/vaccines")
public class VaccineController {
    private final IVaccineService vaccineService;

    public VaccineController(IVaccineService vaccineService) {
        this.vaccineService = vaccineService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Vaccine save(@RequestBody Vaccine vaccine) { //entitiy'i gönderdik.
        return this.vaccineService.save(vaccine);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Vaccine update (@RequestBody Vaccine vaccine) {
        return this.vaccineService.update(vaccine);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.vaccineService.delete(id);
    }

    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Vaccine getById(@PathVariable("id") Long id) {
        return this.vaccineService.getById(id);
    }

    //Hayvan id’sine göre belirli bir hayvana ait tüm aşı kayıtlarını listelemek için gerekli API end point'ini oluşturmak.
    @GetMapping("/getVaccinesByAnimalId/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Vaccine> getVaccinesByAnimalId(@PathVariable("id") Long id) {
        return this.vaccineService.getVaccinesByAnimalId(id);
    }

    //Eğer hastaya ait aynı tip aşının (adı ve kodu aynı olan aşı) aşı koruyuculuk bitiş tarihi daha gelmemiş ise sisteme yeni aşı girilememelidir. Aşı kodlarından ve aşı bitiş tarihlerinden bunu kontrol edebilirsin.
    @GetMapping("/getAnimalsByComingVaccines")
    @ResponseStatus(HttpStatus.OK)
    public List<Animal> getAnimalsByComingVaccines(@RequestBody AnimalVaccineDTO animalVaccineDTO) {
        return this.vaccineService.getAnimalsByComingVaccines(animalVaccineDTO);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Vaccine> findAll() {
        return this.vaccineService.findAll();
    }

    @PostMapping("/vaccineDateFilter")
    @ResponseStatus(HttpStatus.OK)
    public List<Vaccine> vaccineDateFilter(@RequestBody VaccineDateFilterDTO vaccineDateFilterDTO) {
        return this.vaccineService.vaccineDateFilter(vaccineDateFilterDTO);
    }
    @GetMapping("/getVaccinesByAnimalName/{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<Vaccine> getVaccinesByAnimalName(@PathVariable("name") String animalName) {
        return this.vaccineService.getVaccinesByAnimalName(animalName);
    }
}
