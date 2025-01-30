package com.auradot.backend.model;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.model.enums.OrderStatus;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import lombok.Data;
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderDescription;
    private Date date;
    private String address;
    private Long amount;
    private OrderStatus orderStatus;

    private Long totalAmount;
    private UUID trackingId;

   @OneToMany(fetch = FetchType.LAZY, mappedBy = "order")
   @JsonIgnore
    private List<CartItems> cartItems;

    public OrderDTO getOrderDTO() {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(this.id);
        orderDTO.setOrderDescription(this.orderDescription);
        orderDTO.setDate(this.date);
        orderDTO.setAddress(this.address);
        orderDTO.setAmount(this.amount);
        orderDTO.setOrderStatus(this.orderStatus);
        orderDTO.setTotalAmount(this.totalAmount);
        orderDTO.setTrackingId(this.trackingId);

        return orderDTO;
    }
}
