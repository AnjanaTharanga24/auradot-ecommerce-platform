package com.auradot.backend.dto;

import com.auradot.backend.model.enums.OrderStatus;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class OrderDTO {
    private Long id;
    private Date date;
    private String address;
    private double totalAmount;
    private UUID trackingId;
    private OrderStatus orderStatus;
    private CartDTO cart;
}
