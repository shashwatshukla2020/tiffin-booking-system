package com.my.tiffin.service;

import com.my.tiffin.model.Order;

import java.util.List;

public interface OrderService {

    // Place single order (optional legacy)
    Order placeOrder(Order order, String email);

    // Customer orders
    List<Order> getMyOrders(String email);

    // Vendor orders
    List<Order> getAllOrders();

    // Update order status
    Order updateStatus(String orderId, String status);

    // ⭐ ADD THIS
    List<Order> checkout(String email);
}