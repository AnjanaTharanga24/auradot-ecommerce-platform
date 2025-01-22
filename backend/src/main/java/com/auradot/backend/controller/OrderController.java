package com.auradot.backend.controller;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.model.Order;
import com.auradot.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public OrderResponse createOrder(@RequestBody OrderRequest order) {
        return orderService.createOrder(order);
    }
}
