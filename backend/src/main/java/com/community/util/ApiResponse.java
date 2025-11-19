package com.community.util;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data @AllArgsConstructor
public class ApiResponse<T> {
  private boolean success;
  private T data;
  private String error;

  public static <T> ApiResponse<T> ok(T data) { return new ApiResponse<>(true, data, null); }
  public static <T> ApiResponse<T> error(String msg) { return new ApiResponse<>(false, null, msg); }
}
