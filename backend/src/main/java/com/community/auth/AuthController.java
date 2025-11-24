package com.community.auth;

import com.community.auth.JwtResponse;
import com.community.auth.LoginRequest;
import com.community.auth.RegisterRequest;

import com.community.user.Role;
import com.community.user.User;
import com.community.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authManager;

  @PostMapping("/register")
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
    if (userRepository.findByEmail(req.getEmail()).isPresent()) {
      return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
    }
    User user = User.builder()
        .email(req.getEmail())
        .password(passwordEncoder.encode(req.getPassword()))
        .fullName(req.getFullName())
        .area(req.getArea())
        .role(Role.USER)
        .build();
    userRepository.save(user);

    String token = jwtService.generateToken(user.getEmail(), Map.of("role", user.getRole().name(), "name", user.getFullName()));
    return ResponseEntity.ok(new JwtResponse(token, user.getRole().name(), user.getFullName()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
    authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getEmail(), req.getPassword()));
    var user = userRepository.findByEmail(req.getEmail()).orElseThrow();
    String token = jwtService.generateToken(user.getEmail(), Map.of("role", user.getRole().name(), "name", user.getFullName()));
    return ResponseEntity.ok(new JwtResponse(token, user.getRole().name(), user.getFullName()));
  }
}
