package com.auradot.backend.controller;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ItemResponse addItems(@RequestBody ItemRequest itemRequest) throws NotFoundException{

        return itemService.addItems(itemRequest);
    }

    @GetMapping
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/{item-id}")
    public ItemResponse getItemById(@PathVariable("item-id") Long id) throws NotFoundException {
        return itemService.getItemById(id);
    }

    @DeleteMapping("/{item-id}")
    public String deleteItemById(@PathVariable("item-id") Long id) throws NotFoundException{
        return itemService.deleteItemById(id);
    }

}
