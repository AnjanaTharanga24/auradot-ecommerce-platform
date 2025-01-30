package com.auradot.backend.service;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.model.Order;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest order);
    List<OrderDTO> getAllPlacedOrders();
    OrderDTO changeOrderStatus(Long orderId, String orderStatus);


}
