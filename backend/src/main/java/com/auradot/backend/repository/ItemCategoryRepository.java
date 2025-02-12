package com.auradot.backend.repository;

import com.auradot.backend.model.ItemCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemCategoryRepository extends JpaRepository<ItemCategory,Long> {
}
