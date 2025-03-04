package com.auradot.backend.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdmiApprovalDto {
    @NotNull(message = "user id is required")
    private String userId;
}
