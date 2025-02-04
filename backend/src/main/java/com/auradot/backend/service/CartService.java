package com.auradot.backend.service;

import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.dto.ProductInCartDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CartService {
    public ResponseEntity<?> addProductToCart(ProductInCartDTO addProductToCart);
    public OrderDTO getCartByID() throws Exception;
    public OrderDTO increaseProductQuantity(ProductInCartDTO productInCartDTO) throws Exception;
    public OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO) throws Exception;

    public List<OrderDTO> getPlacedOrders();

    int getCartItemCount();
}
