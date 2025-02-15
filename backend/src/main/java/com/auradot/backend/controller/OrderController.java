package com.auradot.backend.controller;

import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:4200")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> getAllOrders() {
        List<OrderDTO> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @PostMapping("/{orderId}/status/{status}")
    public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId,
                                               @PathVariable String status) {
        try {
            OrderDTO orderDTO = orderService.changeOrderStatus(orderId, status);
            return ResponseEntity.ok(orderDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(e.getMessage());
        }
    }
    @GetMapping("/placed")
    public ResponseEntity<List<OrderDTO>> getAllPlacedOrders() {
        List<OrderDTO> orders = orderService.getAllPlacedOrders();
        return ResponseEntity.ok(orders);
    }
}
