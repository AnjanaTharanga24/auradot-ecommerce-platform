package com.auradot.backend.controller;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.ItemResponse;
import com.auradot.backend.service.ItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("/api/items")
public class ItemController {

    private ItemService itemService;

    @PostMapping("/")
    public ItemResponse addItems(@RequestBody ItemRequest itemRequest){
        return itemService.addItems(itemRequest);
    }
}
