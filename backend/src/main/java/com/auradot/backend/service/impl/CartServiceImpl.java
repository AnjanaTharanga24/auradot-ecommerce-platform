package com.auradot.backend.service.impl;

import com.auradot.backend.dto.AddProductToCartDTO;
import com.auradot.backend.dto.CartDTO;
import com.auradot.backend.dto.OrderDTO;
import com.auradot.backend.dto.PlaceOrderDTO;
import com.auradot.backend.dto.ProductDTO;
import com.auradot.backend.exception.NotFoundException;
import com.auradot.backend.model.Cart;
import com.auradot.backend.model.Order;
import com.auradot.backend.model.Product;
import com.auradot.backend.model.enums.OrderStatus;
import com.auradot.backend.repository.CartRepository;
import com.auradot.backend.repository.OrderRepository;
import com.auradot.backend.repository.ProductRepository;
import com.auradot.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CartServiceImpl implements CartService {

    private final OrderRepository orderRepository;

    private final CartRepository cartRepository;

    private final ProductRepository productRepository;

    public CartServiceImpl(OrderRepository orderRepository,
                           ProductRepository productRepository,
                           CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.cartRepository=cartRepository;
    }

    @Override
    public CartDTO addProductToCart(AddProductToCartDTO dto) throws NotFoundException {
        Cart cart = cartRepository.findById(dto.getCartId()).orElse(new Cart());

        Product product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new NotFoundException("Product not found"));

        if (!cart.getProducts().contains(product)) {
            cart.getProducts().add(product);
        }
        Cart savedCart = cartRepository.save(cart);
        return convertToCartDTO(savedCart);
    }

    @Override
    public CartDTO getCart(Long cartId) throws NotFoundException {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));
        return convertToCartDTO(cart);
    }

    @Override
    public OrderDTO placeOrder(PlaceOrderDTO dto) throws NotFoundException {
        Cart cart = cartRepository.findById(dto.getCartId())
                .orElseThrow(() -> new NotFoundException("Cart not found"));

        Long total = cart.getProducts().stream()
                .mapToLong(Product::getPrice)
                .sum();

        Order order = new Order();
        order.setCart(cart);
        order.setDate(new Date());
        order.setAddress(dto.getAddress());
        order.setTotalAmount(total);
        order.setTrackingId(UUID.randomUUID());
        order.setOrderStatus(OrderStatus.PLACED);

        Order savedOrder = orderRepository.save(order);

        cart.getProducts().clear();
        cartRepository.save(cart);

        return convertToOrderDTO(savedOrder);
    }

    @Override
    public CartDTO removeProductFromCart(Long cartId, Long productId) throws NotFoundException {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));

        boolean removed = cart.getProducts().removeIf(product -> product.getId().equals(productId));
        if (!removed) {
            throw new NotFoundException("Product not found in cart");
        }
        Cart savedCart = cartRepository.save(cart);
        return convertToCartDTO(savedCart);
    }

    @Override
    public int getCartProductCount(Long cartId) throws NotFoundException {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new NotFoundException("Cart not found"));
        return cart.getProducts().size();
    }

    private CartDTO convertToCartDTO(Cart cart) {
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setProducts(cart.getProducts().stream().map(product -> {
            ProductDTO pDto = new ProductDTO();
            pDto.setId(product.getId());
            pDto.setName(product.getName());
            pDto.setPrice(product.getPrice());
            pDto.setDescription(product.getDescription());
            return pDto;
        }).collect(Collectors.toList()));
        return dto;
    }

    private OrderDTO convertToOrderDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setDate(order.getDate());
        dto.setAddress(order.getAddress());
        dto.setTotalAmount(order.getTotalAmount());
        dto.setTrackingId(order.getTrackingId());
        dto.setOrderStatus(order.getOrderStatus());
        dto.setCart(convertToCartDTO(order.getCart()));
        return dto;
    }
}
