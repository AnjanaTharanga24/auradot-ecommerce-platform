package com.auradot.backend.controller.request;

import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {
    private String customerName;
    private String address;
    private double totalPrice;
    private List<String> items;
}