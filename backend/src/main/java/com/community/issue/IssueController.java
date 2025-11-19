package com.community.issue;

import com.community.issue.dto.IssueCreateRequest;
import com.community.issue.dto.IssueResponse;
import com.community.issue.dto.IssueUpdateStatusRequest;
import com.community.util.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping(\"/api/issues\")
@RequiredArgsConstructor
public class IssueController {
  private final IssueService service;
  private final CategoryRepository categoryRepository;
  private final IssueStatusHistoryRepository historyRepository;

  @PostMapping(value = \"\", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ApiResponse<IssueResponse> create(Authentication auth,
      @RequestPart(\"payload\") @Valid IssueCreateRequest req,
      @RequestPart(value = \"images\", required = false) List<MultipartFile> files) {

    return ApiResponse.ok(service.create(auth, req, files));
  }

  @GetMapping(\"/me\")
  public ApiResponse<Page<IssueResponse>> my(Authentication auth,
                                             @RequestParam(defaultValue = \"0\") int page,
                                             @RequestParam(defaultValue = \"10\") int size) {
    return ApiResponse.ok(service.myIssues(auth, page, size));
  }

  @GetMapping(\"/admin\")
  @PreAuthorize(\"hasRole('ADMIN')\")
  public ApiResponse<Page<IssueResponse>> all(@RequestParam(defaultValue=\"0\") int page,
                                              @RequestParam(defaultValue=\"10\") int size,
                                              @RequestParam(required=false) Long categoryId,
                                              @RequestParam(required=false) IssueStatus status) {
    return ApiResponse.ok(service.allIssues(page, size, categoryId, status));
  }

  @GetMapping(\"/public/resolved\")
  public ApiResponse<Page<IssueResponse>> resolved(@RequestParam(defaultValue=\"0\") int page,
                                                   @RequestParam(defaultValue=\"10\") int size) {
    return ApiResponse.ok(service.allIssues(page, size, null, IssueStatus.RESOLVED));
  }

  @GetMapping(\"/{id}\")
  public ApiResponse<IssueResponse> get(@PathVariable Long id) {
    return ApiResponse.ok(service.get(id));
  }

  @PutMapping(\"/{id}/status\")
  @PreAuthorize(\"hasRole('ADMIN')\")
  public ApiResponse<IssueResponse> updateStatus(@PathVariable Long id, Authentication auth,
                                                 @RequestBody @Valid IssueUpdateStatusRequest req) {
    return ApiResponse.ok(service.updateStatus(id, auth, req));
  }

  @GetMapping(\"/categories\")
  public ApiResponse<?> categories() {
    return ApiResponse.ok(categoryRepository.findAll());
  }

  @GetMapping(\"/{id}/history\")
  public ApiResponse<?> history(@PathVariable Long id) {
    return ApiResponse.ok(historyRepository.findAll().stream().filter(h -> h.getIssue().getId().equals(id)).toList());
  }
}
