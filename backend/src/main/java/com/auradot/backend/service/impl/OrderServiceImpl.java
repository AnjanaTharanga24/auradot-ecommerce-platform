package com.auradot.backend.service.impl;

import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Order;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.service.OrderService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream().map(this::convertToOrderDTO).collect(Collectors.toList());
    }

    @Override
    public OrderDTO changeOrderStatus(Long orderId, String status) throws NotFoundException {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        if (status.equalsIgnoreCase("shipped")) {
            order.setOrderStatus(OrderStatus.SHIPPED);
        } else if (status.equalsIgnoreCase("delivered")) {
            order.setOrderStatus(OrderStatus.DELIVERED);
        }
        Order savedOrder = orderRepository.save(order);
        return convertToOrderDTO(savedOrder);
    }

    @Override
    public List<OrderDTO> getAllPlacedOrders() {
        List<Order> orders = orderRepository.findByOrderStatus(OrderStatus.PLACED);
        return orders.stream()
                .map(this::convertToOrderDTO)
                .collect(Collectors.toList());
    }

    private OrderDTO convertToOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setDate(order.getDate());
        dto.setAddress(order.getAddress());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setTrackingId(order.getTrackingId());
        dto.setOrderStatus(order.getOrderStatus());
        return dto;
    }
}
