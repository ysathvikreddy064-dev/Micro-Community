package com.community.notification;

import com.community.user.User;
import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "notifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private User user;

    @Column(nullable = false)
    private String message;

    @Column(nullable = false)
    private boolean readFlag;

    @Column(nullable = false)
    private Instant createdAt;
}
