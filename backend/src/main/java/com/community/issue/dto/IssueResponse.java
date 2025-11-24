package com.community.issue.dto;

import com.community.issue.IssueStatus;
import lombok.*;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueResponse {

    private Long id;
    private String title;
    private String description;
    private Double latitude;
    private Double longitude;
    private String categoryName;
    private IssueStatus status;
    private String assignedDepartment;
    private Instant createdAt;
    private UUID createdBy;
    private List<String> imageUrls;
}
