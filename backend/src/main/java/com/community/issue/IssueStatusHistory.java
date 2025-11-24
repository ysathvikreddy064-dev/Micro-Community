package com.community.issue;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "issue_status_history")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Issue issue;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus fromStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus toStatus;

    private String note;
    private String changedBy;
    private Instant changedAt;
}
