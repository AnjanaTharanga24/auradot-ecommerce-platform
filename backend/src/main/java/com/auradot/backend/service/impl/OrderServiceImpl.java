package com.auradot.backend.service.impl;

import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Order;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public List<OrderDTO> getAllOrders() {
        logger.info("Fetching all orders from the database");
        List<Order> orders = orderRepository.findAll();
        logger.info("Total orders retrieved: {}", orders.size());
        return orders.stream().map(this::convertToOrderDTO).collect(Collectors.toList());
    }

    @Override
    public OrderDTO changeOrderStatus(Long orderId, String status) throws NotFoundException {
        logger.info("Attempting to change status of order with ID: {} to: {}", orderId, status);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new NotFoundException("Order not found"));
        if (status.equalsIgnoreCase("shipped")) {
            order.setOrderStatus(OrderStatus.SHIPPED);
        } else if (status.equalsIgnoreCase("delivered")) {
            order.setOrderStatus(OrderStatus.DELIVERED);
        }
        Order savedOrder = orderRepository.save(order);
        logger.info("Order status updated successfully for order ID: {}", orderId);
        return convertToOrderDTO(savedOrder);
    }

    @Override
    public List<OrderDTO> getAllPlacedOrders() {
        logger.info("Fetching all placed orders");
        List<Order> orders = orderRepository.findByOrderStatus(OrderStatus.PLACED);
        logger.info("Total placed orders retrieved: {}", orders.size());
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
