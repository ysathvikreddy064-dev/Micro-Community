package com.community.s3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import jakarta.annotation.PostConstruct;
import java.net.URI;
import java.util.UUID;

@Service
public class S3Service {
  @Value(\"${app.s3.bucket}\") private String bucket;
  @Value(\"${app.s3.region}\") private String region;
  @Value(\"${app.s3.access-key}\") private String accessKey;
  @Value(\"${app.s3.secret-key}\") private String secretKey;
  @Value(\"${app.s3.endpoint:}\") private String endpoint;

  private S3Client s3;

  @PostConstruct
  public void init() {
    var builder = S3Client.builder()
        .region(Region.of(region))
        .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey, secretKey)));
    if (endpoint != null && !endpoint.isBlank()) {
      builder.endpointOverride(URI.create(endpoint));
    }
    s3 = builder.build();
  }

  public String upload(MultipartFile file, String folder) {
    try {
      String key = folder + \"/\" + UUID.randomUUID() + \"-\" + file.getOriginalFilename();
      s3.putObject(PutObjectRequest.builder().bucket(bucket).key(key).contentType(file.getContentType()).build(),
          software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes()));
      return \"https://\" + bucket + \".s3.\" + region + \".amazonaws.com/\" + key;
    } catch (Exception e) {
      throw new RuntimeException(\"Failed to upload to S3\", e);
    }
  }
}
