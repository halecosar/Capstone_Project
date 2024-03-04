package dev.patika.veterinary_project.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentFilterByAnimalDTO {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long animalId;
}
