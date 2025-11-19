package com.community.issue;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueStatusHistoryRepository extends JpaRepository<IssueStatusHistory, Long> {}
