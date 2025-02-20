package com.auradot.backend.controller.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateResponse {

    private String name;
    private String description;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
    private Float price;

}
