package com.community.issue;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "issue_images")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class IssueImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private Issue issue;

    @Column(nullable = false)
    private String url;
}
