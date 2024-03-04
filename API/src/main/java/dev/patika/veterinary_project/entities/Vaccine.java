package dev.patika.veterinary_project.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table(name = "vaccines")
public class Vaccine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vaccine_id", columnDefinition = "serial")
    private Long id;

    @Column(name = "vaccine_name")
    private String name;

    @Column(name = "code") //unique olmalı mı?
    private String code;

    @Column (name = "start_date")
    @Temporal(TemporalType.DATE)
    private LocalDate protectionStartDate;

    @Column (name = "finish_date")
    @Temporal(TemporalType.DATE)
    private LocalDate protectionFinishDate;

    @ManyToOne  (fetch = FetchType.EAGER)
    @JoinColumn(name = "animal_vaccine_id", referencedColumnName = "animal_id")
    private Animal animal;
}
