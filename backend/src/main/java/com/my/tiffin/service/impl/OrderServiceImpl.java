package com.my.tiffin.service.impl;

import com.my.tiffin.model.Cart;
import com.my.tiffin.model.Order;
import com.my.tiffin.model.OrderItem;
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

    // ================= PLACE ORDER =================
    @Override
    public Order placeOrder(Order order, String email) {

        order.setCustomerEmail(email);

        order.setStatus("PLACED");

        order.setCreatedAt(LocalDateTime.now());

        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ================= MY ORDERS =================
    @Override
    public List<Order> getMyOrders(String email) {

        return orderRepository.findByCustomerEmail(email);
    }

    // ================= ALL ORDERS =================
    @Override
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    // ================= UPDATE STATUS =================
    @Override
    public Order updateStatus(String orderId,
                              String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setStatus(status);

        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);
    }

    // ================= CHECKOUT =================
    @Override
    public Order checkout(String email) {

        // ================= FETCH CART =================

        List<Cart> cartItems =
                cartRepository.findByUserEmail(email);

        if (cartItems.isEmpty()) {

            throw new RuntimeException("Cart is empty");
        }

        // ================= CREATE ORDER =================

        Order order = new Order();

        order.setCustomerEmail(email);

        order.setStatus("PLACED");

        order.setCreatedAt(LocalDateTime.now());

        order.setUpdatedAt(LocalDateTime.now());

        // ================= ORDER ITEMS =================

        List<OrderItem> orderItems = new ArrayList<>();

        double grandTotal = 0;

        for (Cart item : cartItems) {

            OrderItem orderItem = new OrderItem();

            orderItem.setMenuId(item.getMenuId());

            orderItem.setMenuName(item.getMenuName());

            orderItem.setCategory(item.getCategory());

            orderItem.setImageUrl(item.getImageUrl());

            orderItem.setPrice(item.getPrice());

            orderItem.setQuantity(item.getQuantity());

            orderItem.setTotal(
                    item.getPrice() * item.getQuantity()
            );

            grandTotal += orderItem.getTotal();

            orderItems.add(orderItem);
        }

        // ================= SAVE ITEMS =================

        order.setItems(orderItems);

        order.setTotalAmount(grandTotal);

        // ================= SAVE ORDER =================

        Order savedOrder =
                orderRepository.save(order);

        // ================= CLEAR CART =================

        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }


    @Override
    public List<Order> getDeliveryOrders(String email) {
        return orderRepository.findByDeliveryBoyEmail(email);
    }

//    @Override
//    public Order assignDelivery(String orderId, String deliveryEmail) {
//
//        Order order = orderRepository.findById(orderId)
//                .orElseThrow(() -> new RuntimeException("Order not found"));
//
//        order.setDeliveryEmail(deliveryEmail);
//        order.setStatus("PACKED");
//
//        return orderRepository.save(order);
//    }

    @Override
    public Order updateDeliveryStatus(String orderId, String status) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setStatus(status);

        return orderRepository.save(order);
    }

    @Override
    public Order assignDelivery(
            String orderId,
            String deliveryEmail,
            String deliveryName
    ) {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found"));

        order.setDeliveryBoyEmail(deliveryEmail);
        order.setDeliveryBoyName(deliveryName);

        order.setStatus("PACKED");

        order.setUpdatedAt(LocalDateTime.now());

        return orderRepository.save(order);

    }
}