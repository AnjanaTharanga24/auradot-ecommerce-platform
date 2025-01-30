package com.auradot.backend.controller;

import com.auradot.backend.controller.request.CartRequest;
import com.auradot.backend.controller.request.UpdateQuantityRequest;
import com.auradot.backend.controller.response.CartResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Cart;
import com.auradot.backend.service.BuyerService;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/items")
    public List<Cart> getAllCartItems(){
      return buyerService.getAllCartItems();
    }

    @PutMapping("/items/{item-id}")
    public Cart updateQuantity(@PathVariable("item-id")Long id , @RequestBody UpdateQuantityRequest updateQuantityRequest)throws NotFoundException {
        return buyerService.updateQuantityById(id, updateQuantityRequest);
    }
}
