package com.auradot.backend.service;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.model.Cart;

import java.util.List;

public interface BuyerService {
    CartResponse addToCart(CartRequest cartRequest);
    List<Cart> getAllCartItems();
}
