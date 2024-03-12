package dev.patika.veterinary_project.api;

import dev.patika.veterinary_project.business.abstracts.IAppointmentService;
import dev.patika.veterinary_project.dto.request.AnimalVaccineDTO;
import dev.patika.veterinary_project.dto.request.AppointmentFilterByAnimalDTO;
import dev.patika.veterinary_project.dto.request.AppointmentFilterByDoctorDTO;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Appointment;
import dev.patika.veterinary_project.entities.Customer;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Hayvanların aşı ve muayene randevularının oluşturulması, bilgilerinin güncellenmesi, görüntülenmesi ve silinmesi
@RestController
@RequestMapping ("v1/appointments")
public class AppointmentController {
    private final IAppointmentService appointmentService;

    public AppointmentController(IAppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Appointment save(@RequestBody Appointment appointment) { //entitiy'i gönderdik.
        return this.appointmentService.save(appointment);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.OK)
    public Appointment update (@RequestBody Appointment appointment) {
        return this.appointmentService.update(appointment);
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.OK)
    void delete (@PathVariable("id") Long id){
        this.appointmentService.delete(id);
    }
    @GetMapping("/getById/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Appointment getById(@PathVariable("id") Long id) {
        return this.appointmentService.getById(id);
    }

    //Randevular kullanıcı tarafından girilen tarih aralığına ve doktora göre filtrelenmelidir. Buna ait API end point’i oluşturulmalıdır.
    @PostMapping("/filterbyDoctor")
    @ResponseStatus(HttpStatus.OK)
    public List<Appointment> filterbyDoctor(@RequestBody AppointmentFilterByDoctorDTO appointmentFilterByDoctorDTO) {
        return this.appointmentService.filterbyDoctor(appointmentFilterByDoctorDTO);
    }
    // Randevular kullanıcı tarafından girilen tarih aralığına ve hayvana göre filtrelenmelidir.
    @PostMapping("/filterbyAnimal")
    @ResponseStatus(HttpStatus.OK)
    public List<Appointment> filterbyAnimal(@RequestBody AppointmentFilterByAnimalDTO appointmentFilterByAnimalDTO) {
        return this.appointmentService.filterbyAnimal(appointmentFilterByAnimalDTO);
    }

    @GetMapping("/findAll")
    @ResponseStatus(HttpStatus.OK)
    public List<Appointment> findAll() {
        return this.appointmentService.findAll();
    }
}
