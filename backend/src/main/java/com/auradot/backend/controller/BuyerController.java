package com.auradot.backend.controller;

import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.service.BuyerService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/buyer/items")
@CrossOrigin("http://localhost:4200/")
public class BuyerController {

    private final BuyerService buyerService;

    @GetMapping("/search/{item-name}")
    public ResponseEntity<List<Item>>  searchItemsByName(@PathVariable("item-name") String name) throws NotFoundException{
        return ResponseEntity.ok(buyerService.findItemsByName(name));
    }

    @GetMapping("/{item-id}")
    public ItemResponse getItemById(@PathVariable("item-id") Long id)throws NotFoundException{
        return buyerService.getItemById(id);
    }
}
