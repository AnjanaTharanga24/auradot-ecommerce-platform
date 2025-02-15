//package com.auradot.backend.repository;
//
//import com.auradot.backend.model.Order;
//import com.auradot.backend.model.enums.OrderStatus;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface OrderRepository extends JpaRepository<Order, Long> {
//    Order findByOrderStatus(OrderStatus orderStatus);
//
//    List<Order> findAllByOrderStatusIn(List<OrderStatus> placed);
//
//    List<Order> findByOrderStatusIn(List<OrderStatus> orderStatus);
//}
package com.auradot.backend.repository;

import com.auradot.backend.model.Order;
import com.auradot.backend.model.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByOrderStatus(OrderStatus orderStatus);
    List<Order> findAllByOrderStatus(OrderStatus orderStatus);
}
