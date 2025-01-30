package com.auradot.backend.controller;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.model.Order;
import com.auradot.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest order) {
        OrderResponse orders = orderService.createOrder(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(orders);
    }

    @GetMapping("/adminOrders")
    public ResponseEntity<List<OrderDTO>>getAllPlacedOrders(){
        return ResponseEntity.ok(orderService.getAllPlacedOrders());
    }

    @GetMapping("/adminOrders/{orderId}/{status}")
    public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId, @PathVariable String status){
        OrderDTO orderDTO = orderService.changeOrderStatus(orderId,status);
        if(orderDTO==null){
            return new ResponseEntity<>("something happed",HttpStatus.BAD_REQUEST);

        }
        return ResponseEntity.status(HttpStatus.OK).body(orderDTO);
    }
}
