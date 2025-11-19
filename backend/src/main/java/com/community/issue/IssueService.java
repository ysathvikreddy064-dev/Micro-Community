package com.community.issue;

import com.community.issue.dto.IssueCreateRequest;
import com.community.issue.dto.IssueResponse;
import com.community.issue.dto.IssueUpdateStatusRequest;
import com.community.notification.NotificationService;
import com.community.s3.S3Service;
import com.community.user.User;
import com.community.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IssueService {
  private final IssueRepository issueRepository;
  private final IssueImageRepository imageRepository;
  private final IssueStatusHistoryRepository historyRepository;
  private final CategoryRepository categoryRepository;
  private final UserRepository userRepository;
  private final S3Service s3Service;
  private final NotificationService notificationService;

  @Transactional
  public IssueResponse create(Authentication auth, IssueCreateRequest req, List<MultipartFile> files) {
    User user = (User) auth.getPrincipal();
    var category = categoryRepository.findById(req.getCategoryId()).orElseThrow();

    Issue issue = Issue.builder()
        .title(req.getTitle())
        .description(req.getDescription())
        .latitude(req.getLatitude())
        .longitude(req.getLongitude())
        .category(category)
        .status(IssueStatus.OPEN)
        .createdAt(Instant.now())
        .createdBy(user)
        .build();
    issue = issueRepository.save(issue);

    if (files != null) {
      for (MultipartFile file : files) {
        String url = s3Service.upload(file, \"issues\");
        imageRepository.save(IssueImage.builder().issue(issue).url(url).build());
      }
    }

    historyRepository.save(IssueStatusHistory.builder()
        .issue(issue).fromStatus(IssueStatus.OPEN).toStatus(IssueStatus.OPEN)
        .note(\"Issue created\").changedBy(user.getEmail()).changedAt(Instant.now()).build());

    return toResponse(issue);
  }

  public Page<IssueResponse> myIssues(Authentication auth, int page, int size) {
    User user = (User) auth.getPrincipal();
    return issueRepository.findByCreatedBy_Id(user.getId(), PageRequest.of(page, size)).map(this::toResponse);
  }

  public Page<IssueResponse> allIssues(int page, int size, Long categoryId, IssueStatus status) {
    PageRequest pr = PageRequest.of(page, size);
    if (categoryId != null) return issueRepository.findByCategory_Id(categoryId, pr).map(this::toResponse);
    if (status != null) return issueRepository.findByStatus(status, pr).map(this::toResponse);
    return issueRepository.findAll(pr).map(this::toResponse);
  }

  @Transactional
  public IssueResponse updateStatus(Long id, Authentication auth, IssueUpdateStatusRequest req) {
    User admin = (User) auth.getPrincipal();
    var issue = issueRepository.findById(id).orElseThrow();
    IssueStatus from = issue.getStatus();
    issue.setStatus(req.getStatus());
    if (req.getAssignedDepartment() != null) issue.setAssignedDepartment(req.getAssignedDepartment());
    issueRepository.save(issue);

    historyRepository.save(IssueStatusHistory.builder()
        .issue(issue).fromStatus(from).toStatus(req.getStatus())
        .note(req.getNote()).changedBy(admin.getEmail()).changedAt(Instant.now()).build());

    notificationService.notify(issue.getCreatedBy(),
        String.format(\"Your issue '%s' status changed from %s to %s\", issue.getTitle(), from, req.getStatus()));

    return toResponse(issue);
  }

  public IssueResponse get(Long id) {
    return issueRepository.findById(id).map(this::toResponse).orElseThrow();
  }

  private IssueResponse toResponse(Issue i) {
    return IssueResponse.builder()
        .id(i.getId())
        .title(i.getTitle())
        .description(i.getDescription())
        .latitude(i.getLatitude())
        .longitude(i.getLongitude())
        .categoryName(i.getCategory().getName())
        .status(i.getStatus())
        .assignedDepartment(i.getAssignedDepartment())
        .createdAt(i.getCreatedAt())
        .createdBy(i.getCreatedBy().getId())
        .imageUrls(i.getImages().stream().map(IssueImage::getUrl).collect(Collectors.toList()))
        .build();
  }
}
