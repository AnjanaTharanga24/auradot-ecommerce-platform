package com.auradot.backend.service;

import com.auradot.backend.controller.request.ItemRequest;
import com.auradot.backend.controller.response.ItemResponse;

public interface ItemService {

    ItemResponse addItems(ItemRequest itemRequest);
}
