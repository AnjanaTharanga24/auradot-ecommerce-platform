package com.auradot.backend.dto;

import lombok.Data;

@Data
public class AddProductToCartDTO {
    private Long cartId;
    private Long productId;
}
