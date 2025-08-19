package com.akhil.model;


import com.akhil.domain.UserRole;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO )
    private Long id;


    private  String fullName;

    @NotBlank(message = "username is mandatory")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    private String phone;

    @Enumerated(EnumType.STRING)  // <-- Add this annotation
    @Column(name = "role")         // ensure column type VARCHAR or equivalent in DB
    @NotNull(message = "Role is mandatory")
    private UserRole role;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private  LocalDateTime updatedAt;

    @NotBlank(message = "Password is mandatory")
    private String password;



}
