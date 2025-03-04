package com.auradot.backend.Config.Security;


import com.auradot.backend.model.UserModel;
import com.auradot.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {

        UserModel _user = userRepository.findByUserName(userName);
        if (_user == null) {
            System.out.println("test2");
            throw new UsernameNotFoundException("User not found with username: " + userName);

        }
        GrantedAuthority authority = new SimpleGrantedAuthority(_user.getRole().getRoleName());

        return new org.springframework.security.core.userdetails.User(
                _user.getUserName(),
                _user.getPassword(),
                Collections.singletonList(authority)
        );

    }

}
