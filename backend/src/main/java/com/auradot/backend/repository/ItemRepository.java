package com.auradot.backend.repository;

import com.auradot.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item,Long> {

    List<Item> findByNameContaining(String name);
}
