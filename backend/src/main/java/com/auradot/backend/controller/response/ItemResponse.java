package com.auradot.backend.controller.response;

import com.auradot.backend.model.enums.StockStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemResponse {

    private String name;
    private String description;
    private String imgUrl;
    private String category;
    private Integer stockQuantity;
    private Integer minimumStockLevel;
    private Float price;
    private LocalDate created_at;
    private StockStatus status;
}
