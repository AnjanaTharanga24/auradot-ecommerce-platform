package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.request.UpdateQuantityRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Cart;
import com.auradot.backend.model.Item;
import com.auradot.backend.repository.CartRepository;
import com.auradot.backend.service.BuyerService;
import com.fasterxml.jackson.annotation.OptBoolean;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BuyerServiceImpl implements BuyerService {
    private CartRepository cartRepository;

    @Override
    public CartResponse addToCart(CartRequest cartRequest) {
        Cart cart = new Cart();
        cart.setName(cartRequest.getName());
        cart.setDescription(cartRequest.getDescription());
        cart.setQuantity(cartRequest.getQuantity());
        cart.setPrice(cartRequest.getPrice());

        cartRepository.save(cart);

        return CartResponse.builder()
                .name(cart.getName())
                .description(cart.getDescription())
                .quantity(cart.getQuantity())
                .price(cart.getPrice())
                .build();
    }

    @Override
    public List<Cart> getAllCartItems() {
        List<Cart> cartList = cartRepository.findAll();
        return cartList;
    }

    @Override
    public Cart updateQuantityById(Long id , UpdateQuantityRequest updateQuantityRequest) throws NotFoundException {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (!optionalCart.isPresent()){
            throw new NotFoundException("Item not found with id " + id);
        }

        Cart cartItem = optionalCart.get();

        cartItem.setQuantity(updateQuantityRequest.getQuantity());
        Cart updatedItem = cartRepository.save(cartItem);

        return updatedItem;
    }

    @Override
    public String deleteCartItemById(Long id) throws NotFoundException {
        Optional<Cart> optionalItem = cartRepository.findById(id);

        if (!optionalItem.isPresent()){
            throw new NotFoundException("item not found with id " + id);
        }

        cartRepository.deleteById(id);

        return "Item deleted with id " + id;
    }
}
