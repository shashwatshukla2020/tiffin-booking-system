package com.my.tiffin.service;

import com.my.tiffin.model.Order;

import java.util.List;

public interface OrderService {

    // ================= PLACE ORDER =================
    Order placeOrder(Order order, String email);

    // ================= MY ORDERS =================
    List<Order> getMyOrders(String email);

    // ================= ALL ORDERS =================
    List<Order> getAllOrders();

    // ================= UPDATE STATUS =================
    Order updateStatus(String orderId, String status);

    // ================= CHECKOUT =================
    Order checkout(String email);
}