package com.auradot.backend.controller;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.request.UpdateRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.controller.response.UpdateResponse;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Item;
import com.auradot.backend.model.ItemCategory;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin("http://localhost:4200/")
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    @PostMapping
    public ResponseEntity<String> addItems(@RequestBody ItemRequest itemRequest) throws NotFoundException{
        ItemResponse itemResponse = itemService.addItems(itemRequest);
        return ResponseEntity.ok("Item added successfully : " + itemResponse);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems(){
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{item-id}")
    public ResponseEntity<String> getItemById(@PathVariable("item-id") Long id) throws NotFoundException {
        ItemResponse itemResponse = itemService.getItemById(id);
        return ResponseEntity.ok("Item found:" + itemResponse);
    }

    @DeleteMapping("/{item-id}")
    public String deleteById(@PathVariable("item-id")Long id)throws NotFoundException{
        return itemService.deleteItemById(id);
    }

    @GetMapping("/categories")
    public List<ItemCategory> getAllItemCategories(){
        return itemService.getAllItemCategories();
    }

    @PutMapping("/{item-id}")
    public UpdateResponse updateItemById(@PathVariable("item-id") Long id , @RequestBody UpdateRequest updateRequest) throws NotFoundException{
        return itemService.updateItemById(id, updateRequest);
    }


}
