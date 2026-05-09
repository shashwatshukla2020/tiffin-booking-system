package com.my.tiffin.service.impl;

import com.my.tiffin.model.Cart;
import com.my.tiffin.model.Order;
import com.my.tiffin.repository.CartRepository;
import com.my.tiffin.repository.OrderRepository;
import com.my.tiffin.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;

    // ================= CONSTRUCTOR =================
    public OrderServiceImpl(OrderRepository orderRepository,
                            CartRepository cartRepository) {
        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
    }

    // ================= DIRECT ORDER (OPTIONAL LEGACY) =================
    @Override
    public Order placeOrder(Order order, String email) {

        order.setCustomerEmail(email);
        order.setStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ================= MY ORDERS =================
    @Override
    public List<Order> getMyOrders(String email) {
        return orderRepository.findByCustomerEmail(email);
    }

    // ================= ALL ORDERS (VENDOR) =================
    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ================= UPDATE STATUS =================
    @Override
    public Order updateStatus(String orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    // ================= CHECKOUT (CART → ORDERS) =================
    @Override
    public List<Order> checkout(String email) {

        // 1. Fetch cart items
        List<Cart> cartItems = cartRepository.findByUserEmail(email);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        List<Order> orders = new ArrayList<>();

        // 2. Convert each cart item to order
        for (Cart item : cartItems) {

            Order order = new Order();

            order.setMenuId(item.getMenuId());
            order.setMenuName(item.getMenuName());
            order.setPrice(item.getPrice());
            order.setQuantity(item.getQuantity());

            order.setCustomerEmail(email);
            order.setStatus("PLACED");
            order.setCreatedAt(LocalDateTime.now());

            orders.add(orderRepository.save(order));
        }

        // 3. Clear cart after checkout
        cartRepository.deleteAll(cartItems);

        return orders;
    }
}