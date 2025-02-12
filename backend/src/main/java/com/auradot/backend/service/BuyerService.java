package com.auradot.backend.service;

import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;

import java.util.List;

public interface BuyerService {
    List<Item> findItemsByName(String name)throws NotFoundException;

}
