package com.auradot.backend.service.impl;

import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.repository.ItemRepository;
import com.auradot.backend.service.BuyerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BuyerServiceImpl implements BuyerService {

    private final ItemRepository itemRepository;

    @Override
    public List<Item> findItemsByName(String name) throws NotFoundException {

        List<Item> itemList = itemRepository.findByNameContaining(name);

        if (itemList == null){
            throw new NotFoundException("items not found with name " + name);
        }

        return itemList;
    }

    @Override
    public ItemResponse getItemById(Long id) throws NotFoundException {

        Optional<Item> optionalItem = itemRepository.findById(id);

        if (!optionalItem.isPresent()){
            throw new NotFoundException("Item not found with id : " + id);
        }

        Item foundItem = optionalItem.get();

        return ItemResponse.builder()
                .id(foundItem.getId())
                .name(foundItem.getName())
                .description(foundItem.getDescription())
                .imgUrl(foundItem.getImgUrl())
                .category(foundItem.getItemCategory().getName())
                .stockQuantity(foundItem.getInventory().getStockQuantity())
                .minimumStockLevel(foundItem.getInventory().getMinimumStockLevel())
                .price(foundItem.getPrice())
                .created_at(foundItem.getInventory().getCreated_at())
                .status(foundItem.getInventory().getStockStatus())
                .build();
    }
}
