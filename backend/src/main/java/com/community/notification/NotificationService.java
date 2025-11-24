package com.community.notification;

import com.community.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository repo;

    public void notify(User user, String message) {
        Notification n = Notification.builder()
                .user(user)
                .message(message)
                .readFlag(false)
                .createdAt(Instant.now())
                .build();

        repo.save(n);
    }
}
