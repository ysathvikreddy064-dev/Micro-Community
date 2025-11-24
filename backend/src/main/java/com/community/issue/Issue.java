package com.community.issue;

import com.community.user.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "issues")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 2000)
    private String description;

    @Column(nullable = false)
    private Double latitude;

    @Column(nullable = false)
    private Double longitude;

    @ManyToOne(optional = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus status;

    private String assignedDepartment;
    private Instant createdAt;

    @ManyToOne(optional = false)
    private User createdBy;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<IssueImage> images = new ArrayList<>();
}
