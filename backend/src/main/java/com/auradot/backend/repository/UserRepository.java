package com.auradot.backend.repository;

import com.auradot.backend.model.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByUserEmail(String userEmail);

    boolean existsByUserEmail(String userEmail);

    UserModel findByUserName(String userName);

    boolean existsByUserName(String userName);
}
