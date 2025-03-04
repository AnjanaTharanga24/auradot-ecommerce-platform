package com.auradot.backend.service.impl;


import com.auradot.backend.Config.Security.PasswordEncoder;
import com.auradot.backend.Config.Security.TokenProvider;
import com.auradot.backend.dto.DetailsUpdateRequestDto;
import com.auradot.backend.dto.ResponseDto.GetUserDetailsResponse;
import com.auradot.backend.dto.ResponseDto.SigninResponse;
import com.auradot.backend.dto.SigninDto;
import com.auradot.backend.exception.CustomException;
import com.auradot.backend.model.RoleModel;
import com.auradot.backend.model.UserModel;
import com.auradot.backend.repository.RoleRepository;
import com.auradot.backend.repository.UserRepository;
import com.auradot.backend.service.AuthService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    @Autowired
    private AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public SigninResponse authSignin(SigninDto signinDto) {
        try{
            UserModel userEntity = userRepository.findByUserName(signinDto.getUserName());
            if (userEntity == null || userEntity.getStatus() == false) {
                throw new CustomException("Invalid email or user not found", HttpStatus.NOT_FOUND);
            }

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(signinDto.getUserName(), signinDto.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            final String token = tokenProvider.generateToken(userEntity);
            SigninResponse signinResponse = new SigninResponse();
            signinResponse.setAccessToken(token);

            return signinResponse;
        }
        catch(CustomException ex){
            throw ex;
        } catch (BadCredentialsException ex) {
            throw new CustomException("Invalid email or password", HttpStatus.UNAUTHORIZED);
        } catch (Exception ex) {
            throw new CustomException("An error occurred during login", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void detailsUpdate(Integer userId, DetailsUpdateRequestDto detailsUpdateRequestDto) {
        if (userId == null) {
            throw new CustomException("user id cannot be null.", HttpStatus.BAD_REQUEST);
        }

        userRepository.findById(userId.longValue())
                .map(
                        existingUser -> {
                            existingUser.setUserName(Optional.ofNullable(detailsUpdateRequestDto.getUserName()).orElse(existingUser.getUserName()));
                            existingUser.setUserEmail(Optional.ofNullable(detailsUpdateRequestDto.getUserEmail()).orElse(existingUser.getUserEmail()));
                            existingUser.setPhoneNo(Optional.ofNullable(detailsUpdateRequestDto.getPhoneNo()).orElse(existingUser.getPhoneNo()));
                            existingUser.setStatus(Optional.ofNullable(detailsUpdateRequestDto.getStatus()).orElse(existingUser.getStatus()));

                            if (detailsUpdateRequestDto.getPassword() != null && !detailsUpdateRequestDto.getPassword().isEmpty()) {
                                existingUser.setPassword(passwordEncoder.encodePassword(detailsUpdateRequestDto.getPassword()));
                            }

                            return userRepository.save(existingUser);
                        }
                )
                .orElseThrow(() -> new CustomException("User with ID " + userId + " not found", HttpStatus.NOT_FOUND));

    }

    @Override
    public GetUserDetailsResponse userDetails(Integer userId) {
        if (userId == null) {
            throw new CustomException("user id cannot be null.", HttpStatus.BAD_REQUEST);
        }

        try {
            UserModel existingUserDetail = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new CustomException("user not found", HttpStatus.NOT_FOUND));
            return new GetUserDetailsResponse(
                    existingUserDetail.getUserId(),
                    existingUserDetail.getUserName(),
                    existingUserDetail.getUserEmail(),
                    existingUserDetail.getPassword(),
                    existingUserDetail.getPhoneNo(),
                    existingUserDetail.getStatus(),
                    existingUserDetail.getCreatedAt(),
                    existingUserDetail.getUpdatedAt(),
                    existingUserDetail.getRole()
            );
        } catch (DataAccessException ex) {
            throw new CustomException("Database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<GetUserDetailsResponse> allUserDetails() {
        try{
            List<UserModel> usersDetails = userRepository.findAll();

            if(usersDetails.isEmpty()){
                throw new CustomException("No Users Found", HttpStatus.NO_CONTENT);
            }

            return usersDetails.stream()
                    .map(details -> GetUserDetailsResponse.builder()
                            .userId(details.getUserId())
                            .userName(details.getUserName())
                            .userEmail(details.getUserEmail())
                            .password(details.getPassword())
                            .phoneNo(details.getPhoneNo())
                            .status(details.getStatus())
                            .createdAt(details.getCreatedAt())
                            .updatedAt(details.getUpdatedAt())
                            .role(details.getRole())
                            .build())
                    .collect(Collectors.toList());
        }catch (DataAccessException ex){
            throw new CustomException("Database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public void giveAdminApproval(String userId) {
        try{
            UserModel existingUser = userRepository.findById(Long.valueOf(userId))
                    .orElseThrow(() -> new CustomException("user not found in user id "+ userId, HttpStatus.NOT_FOUND));

            RoleModel roleAdmin = roleRepository.findByRoleName("ADMIN");
            if (roleAdmin == null) {
                throw new CustomException("Admin role not found in the system", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            existingUser.setRole(roleAdmin);
            userRepository.save(existingUser);

        }catch(DataAccessException ex){
            throw new CustomException("Database error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }catch (Exception ex) {
            throw new CustomException("Unexpected error: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}