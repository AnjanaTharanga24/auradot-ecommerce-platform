package com.auradot.backend.repository;

import com.auradot.backend.model.Inventory;
import com.auradot.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {

}
