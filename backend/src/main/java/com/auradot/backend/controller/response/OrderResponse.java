package com.auradot.backend.controller.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {
    private Long id;
    private String customerName;
    private String address;
    private double totalPrice;
}