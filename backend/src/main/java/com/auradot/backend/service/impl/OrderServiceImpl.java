package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.model.Order;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setCustomerName(orderRequest.getCustomerName());
        order.setAddress(orderRequest.getAddress());
        order.setItems(orderRequest.getItems());
        order.setTotalPrice(orderRequest.getTotalPrice());

        Order savedOrder = orderRepository.save(order);

        return OrderResponse.builder()
                .id(savedOrder.getId())
                .customerName(savedOrder.getCustomerName())
                .address(savedOrder.getAddress())
                .totalPrice(savedOrder.getTotalPrice())
                .build();
    }


}
