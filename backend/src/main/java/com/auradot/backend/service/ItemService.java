package com.auradot.backend.service;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;

import java.util.List;

public interface ItemService {

    ItemResponse addItems(ItemRequest itemRequest);
    List<Item> getAllItems();
    ItemResponse getItemById(Long id) throws NotFoundException;
    String deleteItemById(Long id) throws NotFoundException;
    CartResponse addToCart(CartRequest cartRequest);
}
