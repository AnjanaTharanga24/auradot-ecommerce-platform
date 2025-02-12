package com.auradot.backend.model;

import com.auradot.backend.model.enums.StockStatus;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
@Entity
@Table(name = "inventory")
@Data
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "item_id" , nullable = false)
    @JsonBackReference
    private Item item;

    @Column(name = "stock_quantity")
    private Integer stockQuantity;

    @Column(name = "category")
    private String category;

    @Column(name = "min_stock_level")
    private Integer minimumStockLevel;

    @Column(name = "purchase_price")
    private Float purchasePrice;

    @Enumerated(EnumType.STRING)
    @Column(name = "stock_status")
    private StockStatus stockStatus;

    @Column(name = "created_at")
    private LocalDate created_at;

}
