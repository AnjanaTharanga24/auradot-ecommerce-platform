package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Cart;
import com.auradot.backend.model.Item;
import com.auradot.backend.repository.CartRepository;
import com.auradot.backend.repository.ItemRepository;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ItemServiceImpl implements ItemService {

    private ItemRepository itemRepository;

    @Override
    public ItemResponse addItems(ItemRequest itemRequest) {
        Item item = new Item();
        item.setName(itemRequest.getName());
        item.setDescription(itemRequest.getDescription());
        item.setPrice(itemRequest.getPrice());

        Item savedItem = itemRepository.save(item);

        return ItemResponse.builder()
                .id(savedItem.getId())
                .name(savedItem.getName())
                .description(savedItem.getDescription())
                .price(savedItem.getPrice())
                .build();
    }

    @Override
    public List<Item> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return items;
    }

    @Override
    public ItemResponse getItemById(Long id) throws NotFoundException {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (!optionalItem.isPresent()){
            throw new NotFoundException("Item not found with id " + id);
        }

        Item foundItem = optionalItem.get();

        return ItemResponse.builder()
                .id(foundItem.getId())
                .name(foundItem.getName())
                .price(foundItem.getPrice())
                .build();
    }

    @Override
    public String deleteItemById(Long id) throws NotFoundException {
        Optional<Item> optionalItem = itemRepository.findById(id);

        if (!optionalItem.isPresent()){
            throw new NotFoundException("Item not found with id : " + id);
        }
        Item item = optionalItem.get();

        itemRepository.deleteById(id);
        return "Item deleted with id : " + id;
    }


}
