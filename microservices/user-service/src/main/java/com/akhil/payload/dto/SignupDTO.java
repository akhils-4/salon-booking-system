package com.akhil.payload.dto;

import com.akhil.domain.UserRole;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SignupDTO {

    private String fullName;
    private String email;
    private String password;
    private String username;
    @NotNull(message = "Role is mandatory")
    private UserRole role;
}
