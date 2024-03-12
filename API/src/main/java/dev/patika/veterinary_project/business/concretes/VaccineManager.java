package dev.patika.veterinary_project.business.concretes;

import dev.patika.veterinary_project.business.abstracts.IVaccineService;
import dev.patika.veterinary_project.dao.IVaccineRepo;
import dev.patika.veterinary_project.dto.request.AnimalVaccineDTO;
import dev.patika.veterinary_project.dto.request.VaccineDateFilterDTO;
import dev.patika.veterinary_project.entities.Animal;
import dev.patika.veterinary_project.entities.Vaccine;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class VaccineManager implements IVaccineService {
    private final IVaccineRepo vaccineRepo;
    private final EntityManager entityManager;

    public VaccineManager(IVaccineRepo vaccineRepo, EntityManager entityManager) {
        this.vaccineRepo = vaccineRepo;
        this.entityManager = entityManager;
    }

    @Override
    public Vaccine save(Vaccine vaccine) {

        if (!vaccine.getProtectionFinishDate().isAfter(vaccine.getProtectionStartDate())) {
            throw new RuntimeException("Girdiğiniz aralıktaki bitiş tarihi  başlangıç tarihinden küçük olamaz.");
        }

        if (LocalDate.now().isAfter(vaccine.getProtectionFinishDate())) {
            throw new RuntimeException("Koruyuculuk bitiş tarihi bugünden geride olan aşı eklenemez.");
        }

        List<Vaccine> vaccines = checkVaccineByAnimal(vaccine);
        if (vaccines.size() == 0) {
            return this.vaccineRepo.save(vaccine);
        } else {
            throw new RuntimeException("İlgili aşının koruyuculuk süresi bu pet için devam etmektedir.");
        }

    }

    @Override
    public Vaccine update(Vaccine vaccine) {
        getById(vaccine.getId());
        return this.vaccineRepo.save(vaccine);
    }

    @Override
    public Vaccine getById(Long id) {
        Vaccine vaccine = this.vaccineRepo.findById(id).orElse(null);
        if (vaccine == null) {
            throw new RuntimeException(id + " id’li kayıt sistemde bulunamadı.");
        } else {
            return vaccine;
        }

    }

    @Override
    public void delete(Long id) {
        getById(id);
        this.vaccineRepo.deleteById(id);
    }


    @Override
    public List<Vaccine> findAll() {
        return this.vaccineRepo.findAll();
    }

    @Override
    public List<Vaccine> getVaccinesByAnimalId(Long animalId) {
        String queryString = "SELECT v FROM Vaccine v WHERE v.animal.id = :animal_id";

        Query query = entityManager.createQuery(queryString, Vaccine.class);
        query.setParameter("animal_id", animalId);

        return query.getResultList();
    }

    public List<Vaccine> checkVaccineByAnimal(Vaccine vaccine) {
        String queryString = "SELECT v FROM Vaccine v WHERE v.animal.id = :animal_id AND v.code = :code AND v.name = :vaccine_name AND v.protectionFinishDate > :date";

        Query query = entityManager.createQuery(queryString);
        query.setParameter("animal_id", vaccine.getAnimal().getId());
        query.setParameter("code", vaccine.getCode());
        query.setParameter("vaccine_name", vaccine.getName());
        query.setParameter("date", LocalDate.now());

        return query.getResultList();
    }

    public List<Animal> getAnimalsByComingVaccines(AnimalVaccineDTO animalVaccineDTO) {
        String queryString = "SELECT DISTINCT a FROM Animal a " +
                "INNER JOIN Vaccine v ON a = v.animal " +
                "WHERE v.protectionFinishDate > :start_date AND v.protectionFinishDate < :end_date";

        TypedQuery<Animal> query = entityManager.createQuery(queryString, Animal.class);
        query.setParameter("start_date", animalVaccineDTO.getProtectionStartDate());
        query.setParameter("end_date", animalVaccineDTO.getProtectionFinishDate());

        return query.getResultList();
    }

    @Override
    public List<Vaccine> vaccineDateFilter(VaccineDateFilterDTO vaccineDateFilterDTO) {
        String queryString = "SELECT v FROM Vaccine v WHERE v.protectionFinishDate > :startDate AND v.protectionFinishDate < :endDate ";

        Query query = entityManager.createQuery(queryString);
        query.setParameter("startDate", vaccineDateFilterDTO.getStartDate());
        query.setParameter("endDate", vaccineDateFilterDTO.getEndDate());

        return query.getResultList();
    }

    @Override
    public List<Vaccine> getVaccinesByAnimalName(String animalName) {
        String queryString = "SELECT v FROM Vaccine v WHERE v.animal.name ILIKE :animal_name";

        Query query = entityManager.createQuery(queryString, Vaccine.class);
        query.setParameter("animal_name", "%" + animalName + "%");

        return query.getResultList();
    }
}
