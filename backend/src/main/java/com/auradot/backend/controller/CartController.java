package com.auradot.backend.controller;

import com.auradot.backend.dto.AddProductToCartDTO;
import com.auradot.backend.dto.CartDTO;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/addProduct")
    public ResponseEntity<?> addProductToCart(@RequestBody AddProductToCartDTO dto) {
        try {
            CartDTO cartDTO = cartService.addProductToCart(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(cartDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<?> getCart(@PathVariable Long cartId) {
        try {
            CartDTO cartDTO = cartService.getCart(cartId);
            return ResponseEntity.ok(cartDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(e.getMessage());
        }
    }

    @PostMapping("/placeOrder")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderDTO dto) {
        try {
            OrderDTO orderDTO = cartService.placeOrder(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @DeleteMapping("/{cartId}/removeProduct/{productId}")
    public ResponseEntity<?> removeProductFromCart(@PathVariable Long cartId,
                                                   @PathVariable Long productId) {
        try {
            CartDTO updatedCart = cartService.removeProductFromCart(cartId, productId);
            return ResponseEntity.ok(updatedCart);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }

    @GetMapping("/{cartId}/productCount")
    public ResponseEntity<Integer> getCartProductCount(@PathVariable Long cartId) {
        try {
            int productCount = cartService.getCartProductCount(cartId);
            return ResponseEntity.ok(productCount);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
}
