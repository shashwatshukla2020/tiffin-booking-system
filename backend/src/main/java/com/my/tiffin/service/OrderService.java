package com.my.tiffin.service;

import com.my.tiffin.model.Order;
import java.util.List;

public interface OrderService {

    Order placeOrder(Order order, String email);

    List<Order> getMyOrders(String email);

    List<Order> getAllOrders();

    Order updateStatus(String orderId, String status);
}