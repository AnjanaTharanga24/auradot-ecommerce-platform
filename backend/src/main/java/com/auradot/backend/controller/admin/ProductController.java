package com.auradot.backend.controller.admin;

import com.auradot.backend.controller.request.ProductRequest;
import com.auradot.backend.controller.response.ProductResponse;
import com.auradot.backend.model.Product;
import com.auradot.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> addProduct(@RequestBody ProductRequest product) throws IOException {
        ProductResponse product1 = productService.addProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(product1);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProduct(){
        List<ProductResponse> product = productService.getAllProducts();
        return ResponseEntity.ok(product);
    }


}
