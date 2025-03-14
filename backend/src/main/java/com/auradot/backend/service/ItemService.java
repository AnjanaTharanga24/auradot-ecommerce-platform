package com.auradot.backend.service;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.request.UpdateRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.controller.response.NotificationResponse;
import com.auradot.backend.controller.response.UpdateResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.model.ItemCategory;

import java.util.List;

public interface ItemService {

    ItemResponse addItems(ItemRequest itemRequest) throws NotFoundException;
    List<Item> getAllItems();
    ItemResponse getItemById(Long id) throws NotFoundException;
    String deleteItemById(Long id) throws NotFoundException;
    List<ItemCategory> getAllItemCategories();
    UpdateResponse updateItemById(Long id, UpdateRequest updateRequest) throws NotFoundException;
    List<NotificationResponse> getNotification();
}
