package com.auradot.backend.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.management.relation.Role;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Long userId;
    @Column(name = "user_name", nullable = false, unique = true)
    private String userName;
    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "phone_no", nullable = false)
    private String phoneNo;
    @Column(name = "status", nullable = false)
    private Boolean status = true;
    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private Date createdAt;
    @Column(name = "updated_at", nullable = true)
    private Date updatedAt;
    @ManyToOne
    @JoinColumn(name = "role_id", nullable = false)
    private RoleModel role;

}
