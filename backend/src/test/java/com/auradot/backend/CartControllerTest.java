package com.auradot.backend;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.auradot.backend.controller.CartController;
import com.auradot.backend.dto.AddProductToCartDTO;
import com.auradot.backend.dto.CartDTO;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.service.CartService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CartControllerTest {

    @Mock
    private CartService cartService;

    @InjectMocks
    private CartController cartController;

    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    private CartDTO cartDTO;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(cartController).build();
        objectMapper = new ObjectMapper();

        cartDTO = new CartDTO();
        cartDTO.setId(1L);
    }

    @Test
    void testAddProductToCart() throws Exception {
        AddProductToCartDTO addProductToCartDTO = new AddProductToCartDTO();
        addProductToCartDTO.setCartId(1L);
        addProductToCartDTO.setProductId(100L);

        when(cartService.addProductToCart(any(AddProductToCartDTO.class))).thenReturn(cartDTO);

        mockMvc.perform(post("/api/carts/addProduct")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addProductToCartDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(cartDTO.getId()));
    }

    @Test
    void testGetCart() throws Exception {
        when(cartService.getCart(1L)).thenReturn(cartDTO);

        mockMvc.perform(get("/api/carts/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(cartDTO.getId()));
    }

    @Test
    void testPlaceOrder() throws Exception {
        PlaceOrderDTO placeOrderDTO = new PlaceOrderDTO();
        placeOrderDTO.setCartId(1L);
        placeOrderDTO.setAddress("123 Test St");

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(1L);

        when(cartService.placeOrder(any(PlaceOrderDTO.class))).thenReturn(orderDTO);

        mockMvc.perform(post("/api/carts/placeOrder")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(placeOrderDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(orderDTO.getId()));
    }

    @Test
    void testRemoveProductFromCart() throws Exception {
        when(cartService.removeProductFromCart(1L, 100L)).thenReturn(cartDTO);

        mockMvc.perform(delete("/api/carts/1/removeProduct/100"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(cartDTO.getId()));
    }

    @Test
    void testGetCartProductCount() throws Exception {
        when(cartService.getCartProductCount(1L)).thenReturn(3);

        mockMvc.perform(get("/api/carts/1/productCount"))
                .andExpect(status().isOk())
                .andExpect(content().string("3"));
    }
}
