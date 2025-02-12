package com.auradot.backend.controller;

import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.dto.ProductInCartDTO;
import com.auradot.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    public ResponseEntity<?> addProductToCart(@RequestBody ProductInCartDTO productInCartDTO) {
        return cartService.addProductToCart(productInCartDTO);
    }

    @GetMapping("/available")
    public ResponseEntity<?> getCartPendingDetails() {
        try {
            OrderDTO orderDTO = cartService.getCartByPendingOrders();
            return ResponseEntity.status(HttpStatus.OK).body(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/addition")
    public ResponseEntity<?> increaseProductQty(@RequestBody ProductInCartDTO productInCartDTO) {
        try {
            OrderDTO orderDTO = cartService.increaseProductQuantity(productInCartDTO);
            return ResponseEntity.status(HttpStatus.OK).body(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDTO placeOrderDTO) {
        try {
            OrderDTO orderDTO = cartService.placeOrder(placeOrderDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Integer> getCartItemCount() {
        int count = cartService.getCartItemCount();
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }

    @GetMapping("/myOrders")
    public ResponseEntity<List<OrderDTO>> myPlacedOrders(){
        return ResponseEntity.ok(cartService.getPlacedOrders());
    }
}