package com.auradot.backend.service.impl;

import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.repository.ItemRepository;
import com.auradot.backend.service.BuyerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BuyerServiceImpl implements BuyerService {

    private ItemRepository itemRepository;

    @Override
    public List<Item> findItemsByName(String name) throws NotFoundException {

        List<Item> itemList = itemRepository.findByNameContaining(name);

        if (itemList == null){
            throw new NotFoundException("items not found with name " + name);
        }

        return itemList;
    }
}
