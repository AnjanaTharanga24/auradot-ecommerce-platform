package com.auradot.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @JsonBackReference
    private List<Item> items;
}
