package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.model.Cart;
import com.auradot.backend.repository.CartRepository;
import com.auradot.backend.service.BuyerService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class BuyerServiceImpl implements BuyerService {
    private CartRepository cartRepository;

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {
        Cart cart = new Cart();
        cart.setName(cartRequest.getName());
        cart.setDescription(cartRequest.getDescription());
        cart.setCategory(cartRequest.getCategory());
        cart.setQuantity(cartRequest.getQuantity());
        cart.setPrice(cartRequest.getPrice());

        cartRepository.save(cart);

        return CartResponse.builder()
                .name(cart.getName())
                .description(cart.getDescription())
                .category(cart.getCategory())
                .quantity(cart.getQuantity())
                .price(cart.getPrice())
                .build();
    }

    @Override
    public List<Cart> getAllCartItems() {
        List<Cart> cartList = cartRepository.findAll();
        return cartList;
    }
}
