package com.auradot.backend.controller.User;


import com.auradot.backend.Config.Security.ApplicationConfigProperties;
import com.auradot.backend.Config.Security.TokenProvider;
import com.auradot.backend.dto.AdmiApprovalDto;
import com.auradot.backend.dto.ResponseDto.GetUserDetailsResponse;
import com.auradot.backend.dto.ResponseDto.SigninResponse;
import com.auradot.backend.dto.SigninDto;
import com.auradot.backend.dto.DetailsUpdateRequestDto;
import com.auradot.backend.service.AuthService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private ApplicationConfigProperties applicationConfigProperties;

    private static final String TOKEN_PREFIX = "Bearer";

    @PostMapping("/signin")
    private ResponseEntity<SigninResponse> authSignin(@Valid @RequestBody SigninDto signinDto){
        log.info("signin controller");
        SigninResponse response = authService.authSignin(signinDto);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/update-user-details")
    public ResponseEntity<?> updateUserDetails(@RequestHeader("Authorization") String header, @RequestBody DetailsUpdateRequestDto detailsUpdateRequestDto){
        log.info("update details controller");
        String authToken = String.valueOf(tokenProvider.extractTokenFromHeader(header));
        Integer userId = Math.toIntExact(tokenProvider.getUserIdFromToken(authToken));

        authService.detailsUpdate(userId, detailsUpdateRequestDto);
        return ResponseEntity.status(HttpStatus.OK)
                .body("Details updated successfully");
    }

    @GetMapping("/get-user-details")
    private ResponseEntity<GetUserDetailsResponse> getUserDetails(@RequestHeader("Authorization") String header){
        log.info("getUserDetails controller");
        String authToken = String.valueOf(tokenProvider.extractTokenFromHeader(header));
        Integer userId = Math.toIntExact(tokenProvider.getUserIdFromToken(authToken));

        GetUserDetailsResponse response = authService.userDetails(userId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/get-all-users-details")
    private ResponseEntity<List<GetUserDetailsResponse>> getAllUserDetails(@RequestHeader("Authorization") String header){
        log.info("getAllUsersDetails controller");
        List<GetUserDetailsResponse> response = authService.allUserDetails();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/admin-approval")
    public ResponseEntity<?> adminApproval(@RequestBody AdmiApprovalDto admiApprovalDto){
        log.info("admin approval controller");
        authService.giveAdminApproval(admiApprovalDto.getUserId());
        return ResponseEntity.status(HttpStatus.OK)
                .body("Admin approval successfully completed.");
    }



}
