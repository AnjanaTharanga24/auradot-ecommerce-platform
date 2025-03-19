package com.auradot.backend.service.impl;

import com.auradot.backend.Config.Security.PasswordEncoder;
import com.auradot.backend.dto.SignupDto;
import com.auradot.backend.exception.ConflictException;
import com.auradot.backend.model.UserModel;
import com.auradot.backend.repository.RoleRepository;
import com.auradot.backend.repository.UserRepository;
import com.auradot.backend.service.SignupService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class SignupServiceImpl implements SignupService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public UserModel registerCustomer(SignupDto signupDto) {
        if(signupDto == null){
            throw new IllegalArgumentException("Customer signup data is invalid");
        }

        if (userRepository.existsByUserEmail(signupDto.getUser_email())) {
            throw new ConflictException("Email is already in use");
        }
        if (userRepository.existsByUserName(signupDto.getUser_name())) {
            throw new ConflictException("User name is already in use");
        }
        UserModel userModel = new UserModel();

        try{
            userModel.setUserName(signupDto.getUser_name());
            userModel.setUserEmail(signupDto.getUser_email());
            userModel.setPhoneNo(signupDto.getPhone_no());
            userModel.setRole(roleRepository.findByRoleName("USER"));

            try{
                userModel.setPassword(passwordEncoder.encodePassword(signupDto.getPassword()));
            }catch(Exception ex){
                log.info("password encoding faild");
                throw new ServiceException("Password encoding failed", ex);
            }

            UserModel savedUser = userRepository.save(userModel);
            return savedUser;

        }catch (Exception ex){
            log.info("database constraint violation");
            throw new ConflictException("Database constraint violation", ex);
        }
    }
}
