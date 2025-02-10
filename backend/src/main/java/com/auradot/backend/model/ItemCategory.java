package com.auradot.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "item_category")
@Data
public class ItemCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "category_name")
    private String name;

    @OneToMany(mappedBy = "itemCategory" , cascade = CascadeType.ALL)
    private List<Item> items;
}
