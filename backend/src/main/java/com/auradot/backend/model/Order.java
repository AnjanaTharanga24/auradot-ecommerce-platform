package com.auradot.backend.model;
import jakarta.persistence.*;
import java.util.List;
import lombok.Data;
@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String address;
    private double totalPrice;

    @ElementCollection
    private List<String> items;
}
