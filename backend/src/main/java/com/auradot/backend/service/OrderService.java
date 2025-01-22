package com.auradot.backend.service;

import com.auradot.backend.controller.request.OrderRequest;
import com.auradot.backend.controller.response.OrderResponse;
import com.auradot.backend.model.Order;

public interface OrderService {
    OrderResponse createOrder(OrderRequest order);
}
