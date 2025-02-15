//package com.auradot.backend.service.impl;
//
//import com.auradot.backend.controller.request.ProductRequest;
//import com.auradot.backend.controller.response.ProductResponse;
//import com.auradot.backend.model.Product;
//import com.auradot.backend.repository.ProductRepository;
//import com.auradot.backend.service.ProductService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//import java.util.Base64;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class ProductServiceImpl implements ProductService {
//
//    @Autowired
//    private ProductRepository productRepository;
//
//    public ProductResponse addProduct(ProductRequest productDTO) throws IOException {
//        Product product = new Product();
//        product.setName(productDTO.getName());
//        product.setDescription(productDTO.getDescription());
//        product.setPrice(productDTO.getPrice());
//
//        Product savedProduct = productRepository.save(product);
//        return ProductResponse.builder()
//                .id(savedProduct.getId())
//                .name(savedProduct.getName())
//                .description(savedProduct.getDescription())
//                .price(savedProduct.getPrice())
//                .build();
//    }
//
//    @Override
//    public List<ProductResponse> getAllProducts() {
//        List<Product> products = productRepository.findAll();
//        return products.stream()
//                .map(product -> ProductResponse.builder()
//                        .id(product.getId())
//                        .name(product.getName())
//                        .description(product.getDescription())
//                        .price(product.getPrice())
//                        .build())
//                .collect(Collectors.toList());
//    }
//}
package com.auradot.backend.service.impl;

import com.auradot.backend.dto.ProductDTO;
import com.auradot.backend.model.Product;
import com.auradot.backend.repository.ProductRepository;
import com.auradot.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public ProductDTO addProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setPrice(productDTO.getPrice());
        product.setDescription(productDTO.getDescription());
        Product savedProduct = productRepository.save(product);
        ProductDTO dto = new ProductDTO();
        dto.setId(savedProduct.getId());
        dto.setName(savedProduct.getName());
        dto.setPrice(savedProduct.getPrice());
        dto.setDescription(savedProduct.getDescription());
        return dto;
    }

    @Override
    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(product -> {
            ProductDTO dto = new ProductDTO();
            dto.setId(product.getId());
            dto.setName(product.getName());
            dto.setPrice(product.getPrice());
            dto.setDescription(product.getDescription());
            return dto;
        }).collect(Collectors.toList());
    }
}
