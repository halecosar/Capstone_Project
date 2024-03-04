package dev.patika.veterinary_project.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppointmentFilterByDoctorDTO {
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private Long doctorId;

}
