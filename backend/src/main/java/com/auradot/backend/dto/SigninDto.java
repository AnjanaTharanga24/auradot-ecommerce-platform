package com.auradot.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SigninDto {
    private String userName;
    private String userEmail;
    @NotNull(message = "password is required")
    private String password;
}
