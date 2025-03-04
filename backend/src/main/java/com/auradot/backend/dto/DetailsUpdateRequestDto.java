package com.auradot.backend.dto;

import lombok.Data;

@Data
public class DetailsUpdateRequestDto {
    private String userName;
    private String userEmail;
    private String password;
    private String phoneNo;
    private Boolean status;
}
