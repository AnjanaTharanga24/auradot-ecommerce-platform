package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.request.UpdateRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.controller.response.NotificationResponse;
import com.auradot.backend.controller.response.UpdateResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Inventory;
import com.auradot.backend.model.Item;
import com.auradot.backend.model.ItemCategory;
import com.auradot.backend.model.enums.StockStatus;
import com.auradot.backend.repository.InventoryRepository;
import com.auradot.backend.repository.ItemCategoryRepository;
import com.auradot.backend.repository.ItemRepository;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final ItemCategoryRepository itemCategoryRepository;
    private final InventoryRepository inventoryRepository;

    @Override
    public ItemResponse addItems(ItemRequest itemRequest) throws NotFoundException {

        Optional<ItemCategory> optionalItemCategory = itemCategoryRepository.findById(itemRequest.getCategoryId());

        if(!optionalItemCategory.isPresent()) {
            throw new NotFoundException("category not found with id " + itemRequest.getCategoryId());
        }

        ItemCategory foundCategory = optionalItemCategory.get();

        Item item = new Item();
        item.setName(itemRequest.getName());
        item.setImgUrl(itemRequest.getImgUrl());
        item.setItemCategory(foundCategory);
        item.setDescription(itemRequest.getDescription());
        item.setPrice(itemRequest.getPrice());

        Item savedItem = itemRepository.save(item);

        Inventory inventory = new Inventory();
        inventory.setItem(savedItem);
        inventory.setStockQuantity(itemRequest.getStockQuantity());
        inventory.setMinimumStockLevel(itemRequest.getMinimumStockLevel());

        if (itemRequest.getStockQuantity() > itemRequest.getMinimumStockLevel()) {
            inventory.setStockStatus(StockStatus.AVAILABLE);
        } else if (itemRequest.getStockQuantity() < itemRequest.getMinimumStockLevel() && itemRequest.getStockQuantity() >= 1) {
            inventory.setStockStatus(StockStatus.LOW_STOCK);
        } else if (itemRequest.getStockQuantity() < 1) {
            inventory.setStockStatus(StockStatus.OUT_OF_STOCK);
        }

        inventory.setCreated_at(LocalDate.now());

        Inventory savedInventory = inventoryRepository.save(inventory);

        savedItem.setInventory(savedInventory);
        savedItem = itemRepository.save(savedItem);

        return ItemResponse.builder()
                .name(savedItem.getName())
                .description(savedItem.getDescription())
                .imgUrl(savedItem.getImgUrl())
                .category(savedItem.getItemCategory().getName())
                .stockQuantity(savedInventory.getStockQuantity())
                .minimumStockLevel(savedInventory.getMinimumStockLevel())
                .price(savedItem.getPrice())
                .created_at(savedInventory.getCreated_at())
                .status(savedInventory.getStockStatus())
                .build();
    }

    @Override
    public List<Item> getAllItems() {
        List<Item> items = itemRepository.findByIsActiveTrue();
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
//                .id(foundItem.getId())
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
        item.setIsActive(false);
        itemRepository.save(item);

        return "Item delete successfully";
    }

    @Override
    public List<ItemCategory> getAllItemCategories() {
        return itemCategoryRepository.findAll();
    }

    @Override
    public UpdateResponse updateItemById(Long id, UpdateRequest updateRequest) throws NotFoundException {
        Optional<Item> optionalItem = itemRepository.findById(id);
        Optional<Inventory> optionalInventory = inventoryRepository.findByItem_Id(id);

        if (!optionalItem.isPresent() && !optionalInventory.isPresent()){
            throw new NotFoundException("Item not found with id :" + id);
        }

        Item foundItem = optionalItem.get();

        if (updateRequest.getName() != null){
            foundItem.setName(updateRequest.getName());
        }
        if (updateRequest.getDescription() != null){
            foundItem.setDescription(updateRequest.getDescription());
        }
        if(updateRequest.getPrice() != null){
            foundItem.setPrice(updateRequest.getPrice());
        }

        itemRepository.save(foundItem);

        Inventory foundInventory = optionalInventory.get();

        if(updateRequest.getStockQuantity() != null){
            foundInventory.setStockQuantity(updateRequest.getStockQuantity());
        }
        if (updateRequest.getMinimumStockLevel() != null){
            foundInventory.setMinimumStockLevel(updateRequest.getMinimumStockLevel());
        }


        if (updateRequest.getStockQuantity() > foundInventory.getMinimumStockLevel()){
            foundInventory.setStockStatus(StockStatus.AVAILABLE);
        } else if (updateRequest.getStockQuantity() < foundInventory.getMinimumStockLevel() && updateRequest.getStockQuantity() > 0) {
            foundInventory.setStockStatus(StockStatus.LOW_STOCK);
        }else {
            foundInventory.setStockStatus(StockStatus.OUT_OF_STOCK);
        }

        inventoryRepository.save(foundInventory);


        return UpdateResponse.builder()
                .name(foundItem.getName())
                .description(foundItem.getDescription())
                .stockQuantity(foundInventory.getStockQuantity())
                .minimumStockLevel(foundInventory.getMinimumStockLevel())
                .price(foundItem.getPrice())
                .build();
    }

    @Override
    public List<NotificationResponse> getNotification() {
         List<Item> activateItems = itemRepository.findByIsActiveTrue();
         List<NotificationResponse> notificationResponses = new ArrayList<>();

         for(Item item : activateItems){
             Inventory inventory = item.getInventory();
             if(inventory.getStockStatus() == StockStatus.LOW_STOCK ||
                     inventory.getStockStatus() == StockStatus.OUT_OF_STOCK){
                 notificationResponses.add(NotificationResponse.builder()
                         .itemName(item.getName())
                         .description(item.getDescription())
                         .stockQuantity(inventory.getStockQuantity())
                         .minimumStockLevel(inventory.getMinimumStockLevel())
                         .stockStatus(inventory.getStockStatus())
                                 .imgUrl(item.getImgUrl())
                         .build());
             }
         }

        return  notificationResponses;
    }


}
