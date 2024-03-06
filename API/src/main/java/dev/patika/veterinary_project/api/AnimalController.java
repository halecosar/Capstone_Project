package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IAnimalService;
import dev.patika.veterinary_project.entities.Animal;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//Hayvanları kaydetme, bilgilerini güncelleme, görüntüleme ve silme
@RestController
@RequestMapping("/v1/animals")
public class AnimalController {
    private final IAnimalService iAnimalService;


    public AnimalController(IAnimalService iAnimalService) {
        this.iAnimalService = iAnimalService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Animal save(@RequestBody Animal animal) { //entitiy'i gönderdik.
        return this.iAnimalService.save(animal);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Animal update (@RequestBody Animal animal) {
        return this.iAnimalService.update(animal);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.iAnimalService.delete(id);
    }
    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Animal getById(@PathVariable("id") Long id) {
        return this.iAnimalService.getById(id);
    }

    //Hayvanlar isme göre filtrelenecek şekilde end point oluşturmak.
    @GetMapping("/getFilteredAnimalByName/{name}")
    @ResponseStatus(HttpStatus.OK)
    public List<Animal> getFilteredAnimalByName(@PathVariable("name") String name) {
        return this.iAnimalService.getFilteredAnimalByName(name);
    }

   // Hayvan sahibinin sistemde kayıtlı tüm hayvanlarını görüntülemek için API end point'ini oluşturmak. Hayvan sahibine göre hayvanlara filtreleme yapmalısın.
    @GetMapping("/getAnimalsByCustomerId/{id}")
    @ResponseStatus(HttpStatus.OK)
    public List<Animal> getAnimalsByCustomerId(@PathVariable("id") Long customerId) {
        return this.iAnimalService.getAnimalsByCustomerId(customerId);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Animal> findAll() {
        return this.iAnimalService.findAll();
    }


}

