package com.auradot.backend.controller.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class ItemRequest {

    private String name;
    private String description;
    private String imgUrl;
    private Long categoryId;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
    private Float price;

}
