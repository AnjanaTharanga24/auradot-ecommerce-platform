package com.auradot.backend.repository;

import com.auradot.backend.model.Inventory;
import com.auradot.backend.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InventoryRepository extends JpaRepository<Inventory,Long> {

    Optional<Inventory> findByItem_Id(Long id);
}
