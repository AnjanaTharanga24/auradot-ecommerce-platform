package com.auradot.backend.dto.ResponseDto;

import com.auradot.backend.model.RoleModel;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Data
@AllArgsConstructor
@Builder
public class GetUserDetailsResponse {
    private Long userId;
    private String userName;
    private String userEmail;
    private String password;
    private String phoneNo;
    private Boolean status;
    private Date createdAt;
    private Date updatedAt;
    private RoleModel role;
}
