package com.auradot.backend.service;

import com.auradot.backend.controller.request.ProductRequest;
import com.auradot.backend.controller.response.ProductResponse;

import java.io.IOException;
import java.util.List;

public interface ProductService {
    public ProductResponse addProduct(ProductRequest productDTO) throws IOException;

    public List<ProductResponse> getAllProducts();
}
