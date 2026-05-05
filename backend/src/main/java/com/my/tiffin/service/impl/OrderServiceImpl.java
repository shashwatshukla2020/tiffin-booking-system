package com.my.tiffin.service.impl;

import com.my.tiffin.model.Order;
import com.my.tiffin.repository.OrderRepository;
import com.my.tiffin.service.OrderService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository repository;

    public OrderServiceImpl(OrderRepository repository) {
        this.repository = repository;
    }

    @Override
    public Order placeOrder(Order order, String email) {

        order.setCustomerEmail(email);
        order.setStatus("PLACED");
        order.setCreatedAt(LocalDateTime.now());

        return repository.save(order);
    }

    @Override
    public List<Order> getMyOrders(String email) {
        return repository.findByCustomerEmail(email);
    }
}