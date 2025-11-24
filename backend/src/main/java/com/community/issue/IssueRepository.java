package com.community.issue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueRepository extends JpaRepository<Issue, Long> {
  Page<Issue> findByCreatedBy_Id(java.util.UUID userId, Pageable pageable);
  Page<Issue> findByCategory_Id(Long categoryId, Pageable pageable);
  Page<Issue> findByStatus(IssueStatus status, Pageable pageable);
}
