package com.auradot.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
    private Integer user_id;
    @NotNull(message = "Username is required")
    private String user_name;
    @Email(message = "Invalid email")
    @NotNull(message = "Email is required")
    private String user_email;
    @NotNull(message = "Password is required")
    private String password;
    @NotNull(message = "Phone_no is required")
    private String phone_no;
}
