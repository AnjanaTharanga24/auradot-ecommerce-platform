package com.auradot.backend.service.impl;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.model.Order;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.repository.CartItemsRepository;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.repository.ProductRepository;
import com.auradot.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;

    public OrderServiceImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public OrderResponse createOrder(OrderRequest orderRequest) {
        Order order = new Order();
        order.setAmount(0L);
        order.setTotalAmount(0L);
        order.setOrderStatus(OrderStatus.pending);

        Order savedOrder = orderRepository.save(order);

        return OrderResponse.builder()
                .id(savedOrder.getId())
                .address(savedOrder.getAddress())
                .totalPrice(savedOrder.getTotalAmount())
                .build();
    }

    public List<OrderDTO> getAllPlacedOrders(){
        List<Order> orderList = orderRepository.findAllByOrderStatusIn(List.of(OrderStatus.placed, OrderStatus.delivered, OrderStatus.shipped));
        return orderList.stream().map(Order::getOrderDTO).collect(Collectors.toList());
    }

    public OrderDTO changeOrderStatus(Long orderId, String orderStatus){
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if(optionalOrder.isPresent()){
            Order order = optionalOrder.get();
            if(Objects.equals(orderStatus,"shipped")){
                order.setOrderStatus(OrderStatus.shipped);
            }else if(Objects.equals(orderStatus, "delivered")){
                order.setOrderStatus(OrderStatus.delivered);
            }
            return orderRepository.save(order).getOrderDTO();
        }
        return null;
    }


}
