package com.auradot.backend.controller;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.service.BuyerService;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/buyer")
@CrossOrigin("http://localhost:4200/")
public class BuyerController {

    private BuyerService buyerService;

    @PostMapping("/items")
    public CartResponse addToCart(@RequestBody CartRequest cartRequest){
        return buyerService.addToCart(cartRequest);
    }
}
