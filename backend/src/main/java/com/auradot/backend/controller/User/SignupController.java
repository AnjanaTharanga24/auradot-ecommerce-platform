package com.auradot.backend.controller.User;

import com.auradot.backend.dto.SignupDto;
import com.auradot.backend.model.UserModel;
import com.auradot.backend.service.SignupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/v1/user")
public class SignupController {
    @Autowired
    private SignupService signupService;

    @PostMapping("/signup")
    private ResponseEntity<?> customerRegister(@Valid @RequestBody SignupDto signupDto){
        log.info("signup controller");
        UserModel savedUser =  signupService.registerCustomer(signupDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Resource Created");
    }
}
