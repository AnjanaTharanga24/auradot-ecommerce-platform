package com.auradot.backend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "items")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "imageUrl")
    private String imgUrl;

    @ManyToOne
    @JoinColumn(name = "category_id",nullable = true)
    @JsonManagedReference
    private ItemCategory itemCategory;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Float price;

    @OneToOne
    @JsonManagedReference
    private Inventory inventory;

}
