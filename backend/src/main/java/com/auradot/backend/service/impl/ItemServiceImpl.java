package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.model.Item;
import com.auradot.backend.repository.ItemRepository;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private ItemRepository itemRepository;

    @Override
    public ItemResponse addItems(ItemRequest itemRequest) {
        Item item = new Item();
        item.setName(itemRequest.getName());
        item.setPrice(itemRequest.getPrice());

        Item savedItem = itemRepository.save(item);

        return ItemResponse.builder()
                .id(savedItem.getId())
                .name(savedItem.getName())
                .price(savedItem.getPrice())
                .build();
    }

    @Override
    public List<Item> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items;
    }
}
