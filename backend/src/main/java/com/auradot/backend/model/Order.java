package com.auradot.backend.model;

import com.auradot.backend.model.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private String address;
    private double totalAmount;
    private UUID trackingId;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    // An order is created from a cart.
    @ManyToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private Cart cart;
}
