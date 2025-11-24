package com.community.issue.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueCreateRequest {

    @NotBlank private String title;
    @NotBlank private String description;

    @NotNull @DecimalMin("-90") @DecimalMax("90")
    private Double latitude;

    @NotNull @DecimalMin("-180") @DecimalMax("180")
    private Double longitude;

    @NotNull
    private Long categoryId;
}
