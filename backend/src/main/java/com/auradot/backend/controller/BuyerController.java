package com.auradot.backend.controller;

import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.service.BuyerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/buyer")
@CrossOrigin("http://localhost:4200/")
public class BuyerController {

    private BuyerService buyerService;

    @GetMapping("/items/{item-name}")
    public List<Item> searchItemsByName(@PathVariable("item-name") String name) throws NotFoundException{
        return buyerService.findItemsByName(name);
    }
}
