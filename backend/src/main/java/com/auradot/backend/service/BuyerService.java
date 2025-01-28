package com.auradot.backend.service;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.response.CartResponse;

public interface BuyerService {
    CartResponse addToCart(CartRequest cartRequest);
}
