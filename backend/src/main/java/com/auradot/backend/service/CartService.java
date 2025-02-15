//package com.auradot.backend.service;
//
//import com.auradot.backend.dto.OrderDTO;
//import com.auradot.backend.dto.PlaceOrderDTO;
//import com.auradot.backend.dto.ProductInCartDTO;
//import org.springframework.http.ResponseEntity;
//
//import java.util.List;
//
//public interface CartService {
//    public ResponseEntity<?> addProductToCart(ProductInCartDTO addProductToCart);
//    public OrderDTO getCartByPendingOrders() throws Exception;
//    public OrderDTO increaseProductQuantity(ProductInCartDTO productInCartDTO) throws Exception;
//    public OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO) throws Exception;
//
//    public List<OrderDTO> getPlacedOrders();
//
//    int getCartItemCount();
//}
package com.auradot.backend.service;

import com.auradot.backend.dto.AddProductToCartDTO;
import com.auradot.backend.dto.CartDTO;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.exception.NotFoundException;

public interface CartService {
    CartDTO addProductToCart(AddProductToCartDTO dto) throws NotFoundException;
    CartDTO getCart(Long cartId) throws NotFoundException;
    OrderDTO placeOrder(PlaceOrderDTO dto) throws NotFoundException;

    CartDTO removeProductFromCart(Long cartId, Long productId) throws NotFoundException;

    int getCartProductCount(Long cartId) throws NotFoundException;
}
