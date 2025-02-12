package com.auradot.backend.service.impl;

import com.auradot.backend.dto.CartItemsDTO;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.dto.ProductInCartDTO;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.CartItems;
import com.auradot.backend.model.Order;
import com.auradot.backend.model.Product;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.repository.CartItemsRepository;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.repository.ProductRepository;
import com.auradot.backend.service.CartService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

    private final OrderRepository orderRepository;
    private final CartItemsRepository cartItemsRepository;
    private final ProductRepository productRepository;

    public CartServiceImpl(OrderRepository orderRepository,
                           CartItemsRepository cartItemsRepository,
                           ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.cartItemsRepository = cartItemsRepository;
        this.productRepository = productRepository;
    }

    @Override
    public ResponseEntity<?> addProductToCart(ProductInCartDTO addProductToCart) {
        logger.info("Adding product to cart: {}", addProductToCart.getProductId());

        Order activeOrder = orderRepository.findByOrderStatus(OrderStatus.pending);
        if (activeOrder == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No active order found for the user.");
        }

        Optional<CartItems> existingCartItem = cartItemsRepository
                .findByProductIdAndOrderId(addProductToCart.getProductId(), activeOrder.getId());

        if (existingCartItem.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Product is already in the cart.");
        }

        Optional<Product> product = productRepository.findById(addProductToCart.getProductId());
        if (product.isPresent()) {
            CartItems cartItem = new CartItems();
            cartItem.setProduct(product.get());
            cartItem.setPrice(product.get().getPrice());
            cartItem.setQuantity(1L);
            cartItem.setOrder(activeOrder);

            CartItems savedCartItem = cartItemsRepository.save(cartItem);
            logger.info("Product saved to cart: {}", savedCartItem);

            activeOrder.setTotalAmount(activeOrder.getTotalAmount() + cartItem.getPrice());
            activeOrder.setAmount(activeOrder.getAmount() + cartItem.getPrice());
            activeOrder.getCartItems().add(savedCartItem);

            orderRepository.save(activeOrder);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedCartItem);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found.");
    }

    @Override
    public OrderDTO getCartByPendingOrders() throws NotFoundException {
        Order order = orderRepository.findByOrderStatus(OrderStatus.pending);
        if (order == null) {
            throw new NotFoundException("No active cart found.");
        }

        List<CartItemsDTO> cartItemsDTOList = order.getCartItems()
                .stream()
                .map(CartItems::getCartDto)
                .collect(Collectors.toList());

        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setAmount(order.getAmount());
        orderDTO.setId(order.getId());
        orderDTO.setOrderStatus(order.getOrderStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setCartItems(cartItemsDTOList);

        return orderDTO;
    }

    @Override
    public OrderDTO increaseProductQuantity(ProductInCartDTO productInCartDTO) throws NotFoundException  {
        Order order = orderRepository.findByOrderStatus(OrderStatus.pending);
        if (order == null) {
            throw new NotFoundException ("No active order found.");
        }

        Optional<CartItems> cartItemOptional = cartItemsRepository
                .findByProductIdAndOrderId(productInCartDTO.getProductId(), order.getId());

        if (cartItemOptional.isPresent()) {
            CartItems cartItem = cartItemOptional.get();
            cartItem.setQuantity(cartItem.getQuantity() + 1);
            cartItemsRepository.save(cartItem);

            order.setAmount(order.getAmount() + cartItem.getPrice());
            order.setTotalAmount(order.getTotalAmount() + cartItem.getPrice());
            orderRepository.save(order);

            return order.getOrderDTO();
        }

        throw new NotFoundException ("Product not found in cart.");
    }

    @Override
    public OrderDTO placeOrder(PlaceOrderDTO placeOrderDTO) throws NotFoundException  {
        Order order = orderRepository.findByOrderStatus(OrderStatus.pending);
        if (order == null) {
            throw new NotFoundException ("No active order to place.");
        }

        order.setOrderDescription(placeOrderDTO.getOrderDescription());
        order.setAddress(placeOrderDTO.getAddress());
        order.setDate(new Date());
        order.setOrderStatus(OrderStatus.placed);
        order.setTrackingId(UUID.randomUUID());

        orderRepository.save(order);

        Order newOrder = new Order();
        newOrder.setAmount(0L);
        newOrder.setTotalAmount(0L);
        newOrder.setOrderStatus(OrderStatus.pending);
        orderRepository.save(newOrder);

        return order.getOrderDTO();
    }

    @Override
    public int getCartItemCount() {
        return (int) cartItemsRepository.count();
    }

    public List<OrderDTO> getPlacedOrders(){
        return orderRepository.findByOrderStatusIn(List.of(OrderStatus.placed, OrderStatus.delivered, OrderStatus.shipped))
                .stream().map(Order::getOrderDTO).collect(Collectors.toList());
    }
}