package dev.patika.veterinary_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "animals")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "animal_id", columnDefinition = "serial")
    private Long id;

    @Column(name = "animal_name")
    private String name;

    @Column(name = "species")
    private String species;

    @Column(name = "breed")
    private String breed;

    @Column(name = "gender")
    private String gender;

    @Column(name = "color")
    private String color;

    @Column(name = "birthday")
    @Temporal(TemporalType.DATE)
    private LocalDate dateofBirth;

    @OneToMany(mappedBy = "animal",cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Vaccine> vaccine;

    @OneToMany(mappedBy = "animal",cascade = CascadeType.REMOVE,fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Appointment> appointment;

    @ManyToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "animal_customer_id", referencedColumnName = "customer_id")
    private Customer customer;


}
