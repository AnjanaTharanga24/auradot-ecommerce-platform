package com.auradot.backend.service;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.request.UpdateQuantityRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Cart;
import com.auradot.backend.model.Item;

import java.util.List;

public interface BuyerService {
    CartResponse addToCart(CartRequest cartRequest);
    List<Cart> getAllCartItems();
    Cart updateQuantityById(Long id, UpdateQuantityRequest updateQuantityRequest) throws NotFoundException;
    String deleteCartItemById(Long id)throws NotFoundException;
    List<Item> findItemsByName(String name)throws NotFoundException;

}
