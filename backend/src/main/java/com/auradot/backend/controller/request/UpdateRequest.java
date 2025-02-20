package com.auradot.backend.controller.request;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class UpdateRequest {

    private String name;
    private String description;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
    private Float price;

}
