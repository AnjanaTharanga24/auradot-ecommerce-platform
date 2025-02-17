package com.auradot.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.auradot.backend.controller.OrderController;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.service.OrderService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@ExtendWith(MockitoExtension.class)
public class OrderControllerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrderController orderController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    private OrderDTO orderDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(orderController).build();
        objectMapper = new ObjectMapper();

        orderDTO = new OrderDTO();
        orderDTO.setId(1L);
        orderDTO.setDate(new Date());
        orderDTO.setAddress("123 Test St");
        orderDTO.setTotalAmount(100L);
        orderDTO.setTrackingId(UUID.randomUUID());
        orderDTO.setOrderStatus(OrderStatus.PLACED);
    }

    @Test
    void testGetAllOrders() throws Exception {
        List<OrderDTO> orders = Arrays.asList(orderDTO);
        when(orderService.getAllOrders()).thenReturn(orders);

        mockMvc.perform(get("/api/orders"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(orderDTO.getId()));
    }

    @Test
    void testChangeOrderStatus() throws Exception {
        when(orderService.changeOrderStatus(1L, "shipped"))
                .thenReturn(orderDTO);

        mockMvc.perform(post("/api/orders/1/status/shipped"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(orderDTO.getId()))
                .andExpect(jsonPath("$.orderStatus").value("PLACED")); 
    }

    @Test
    void testGetAllPlacedOrders() throws Exception {
        List<OrderDTO> placedOrders = Arrays.asList(orderDTO);
        when(orderService.getAllPlacedOrders()).thenReturn(placedOrders);

        mockMvc.perform(get("/api/orders/placed"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(orderDTO.getId()));
    }
}
