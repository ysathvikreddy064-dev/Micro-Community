package com.community.issue.dto;

import com.community.issue.IssueStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueUpdateStatusRequest {

    private IssueStatus status;
    private String note;
    private String assignedDepartment;
}
