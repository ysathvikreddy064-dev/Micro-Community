package com.community.exception;

import com.community.util.ApiResponse;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<?>> handleValidation(MethodArgumentNotValidException ex) {
    String msg = ex.getBindingResult().getFieldErrors().stream()
        .map(e -> e.getField() + " " + e.getDefaultMessage()).findFirst().orElse("Validation error");
    return ResponseEntity.badRequest().body(ApiResponse.error(msg));
  }

  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ApiResponse<?>> handleConstraint(ConstraintViolationException ex) {
    String msg = ex.getConstraintViolations().stream().findFirst().map(v -> v.getMessage()).orElse("Validation error");
    return ResponseEntity.badRequest().body(ApiResponse.error(msg));
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ApiResponse<?>> handleRuntime(RuntimeException ex) {
    return ResponseEntity.badRequest().body(ApiResponse.error(ex.getMessage()));
  }
}
