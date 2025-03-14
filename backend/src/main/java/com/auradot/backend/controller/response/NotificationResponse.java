package com.auradot.backend.controller.response;

import com.auradot.backend.model.enums.StockStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class NotificationResponse {
    private String itemName;
    private String description;
    private int stockQuantity;
    private int minimumStockLevel;
    private StockStatus stockStatus;
    private String imgUrl;
}
