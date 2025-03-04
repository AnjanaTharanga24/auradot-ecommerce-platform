package com.auradot.backend.service;

import com.auradot.backend.dto.SignupDto;
import com.auradot.backend.model.UserModel;
import jakarta.validation.Valid;

public interface SignupService {
    UserModel registerCustomer(@Valid SignupDto signupDto);

}
