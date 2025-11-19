package com.community.notification;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
  List<Notification> findByUser_IdOrderByCreatedAtDesc(UUID userId);
}
