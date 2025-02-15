package com.auradot.backend.dto;

import lombok.Data;

@Data
public class PlaceOrderDTO {

    private Long cartId;
    private String address;
}
