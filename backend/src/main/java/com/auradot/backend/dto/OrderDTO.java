package com.auradot.backend.dto;

import com.auradot.backend.model.CartItems;
import com.auradot.backend.model.enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class OrderDTO {

    private Long id;
    private String orderDescription;
    private Date date;
    private String address;
    private Long amount;
    private OrderStatus orderStatus;

    private Long totalAmount;
    private UUID trackingId;

    private List<CartItemsDTO> cartItems;
}
