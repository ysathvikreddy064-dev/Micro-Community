package com.community.issue.dto;

import com.community.issue.IssueStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class IssueUpdateStatusRequest {
  @NotNull private IssueStatus status;
  private String note;
  private String assignedDepartment;
}
