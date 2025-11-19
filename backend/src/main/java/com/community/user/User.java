package com.community.user;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = \"users\")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class User implements org.springframework.security.core.userdetails.UserDetails {
  @Id
  @GeneratedValue
  private UUID id;

  @Column(unique = true, nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  private String fullName;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role;

  private String area;

  @Override
  public java.util.Collection<? extends org.springframework.security.core.GrantedAuthority> getAuthorities() {
    return java.util.List.of(new org.springframework.security.core.authority.SimpleGrantedAuthority(\"ROLE_\" + role.name()));
  }
  @Override public String getUsername() { return email; }
  @Override public boolean isAccountNonExpired() { return true; }
  @Override public boolean isAccountNonLocked() { return true; }
  @Override public boolean isCredentialsNonExpired() { return true; }
  @Override public boolean isEnabled() { return true; }
}
