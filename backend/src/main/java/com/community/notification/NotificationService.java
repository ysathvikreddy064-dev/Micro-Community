package com.community.notification;

import com.community.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationService {
  private final NotificationRepository repo;

  public void notify(User user, String message) {
    repo.save(Notification.builder()
        .user(user)
        .message(message)
        .readFlag(false)
        .createdAt(Instant.now())
        .build());
  }

  public List<Notification> getForUser(UUID userId) {
    return repo.findByUser_IdOrderByCreatedAtDesc(userId);
  }
}
